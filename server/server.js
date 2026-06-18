import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db.js';
import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_fallback';

const mpClient = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

app.use(cors());
app.use(express.json());

// Middleware para verificar token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token ausente' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Rotas de Autenticação
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const rs = await db.execute({
      sql: 'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      args: [email, password_hash]
    });

    // O Turso/LibSQL retorna o lastInsertRowid como um BigInt. Convertê-lo para Number.
    const lastId = Number(rs.lastInsertRowid);

    const token = jwt.sign({ id: lastId, email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: lastId, email, plan: 'free', credits_remaining: 0 } });
    
  } catch (error) {
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const rs = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    const user = rs.rows[0];
    if (!user) return res.status(401).json({ error: 'Email ou senha incorretos' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(401).json({ error: 'Email ou senha incorretos' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        plan: user.plan,
        credits_remaining: user.credits_remaining
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no banco de dados' });
  }
});

// Consultar cota atual
app.get('/api/quota', authenticateToken, async (req, res) => {
  try {
    const rs = await db.execute({
      sql: 'SELECT plan, credits_remaining FROM users WHERE id = ?',
      args: [req.user.id]
    });

    const user = rs.rows[0];
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    
    res.json({
      plan: user.plan,
      credits_remaining: user.credits_remaining,
      hasQuota: user.credits_remaining > 0 || user.plan !== 'free'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao consultar saldo' });
  }
});

// Consumir 1 crédito de cota
app.post('/api/consume-quota', authenticateToken, async (req, res) => {
  try {
    const rs = await db.execute({
      sql: 'SELECT plan, credits_remaining FROM users WHERE id = ?',
      args: [req.user.id]
    });

    const user = rs.rows[0];
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (user.credits_remaining <= 0 && user.plan === 'free') {
      return res.status(403).json({ error: 'Cota gratuita esgotada' });
    }

    await db.execute({
      sql: 'UPDATE users SET credits_remaining = credits_remaining - 1 WHERE id = ? AND credits_remaining > 0',
      args: [req.user.id]
    });

    res.json({ success: true, credits_remaining: user.credits_remaining - 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao debitar cota' });
  }
});

// Criar sessão de checkout (Mercado Pago)
app.post('/api/create-checkout-session', authenticateToken, async (req, res) => {
  const { planId } = req.body;
  
  let unit_price = 0;
  let credits = 0;
  let title = '';
  
  if (planId === 'plan_iniciante') { unit_price = 9.90; credits = 20; title = 'Plano Starter - 20 Gerações'; }
  else if (planId === 'plan_pro') { unit_price = 14.90; credits = 50; title = 'Plano Professional - 50 Gerações'; }
  else if (planId === 'plan_agencia') { unit_price = 19.90; credits = 100; title = 'Plano Scale - 100 Gerações'; }

  if (unit_price === 0) {
    return res.status(400).json({ error: 'Plano inválido' });
  }

  try {
    const preference = new Preference(mpClient);
    
    const response = await preference.create({
      body: {
        items: [
          {
            title: title,
            quantity: 1,
            unit_price: unit_price
          }
        ],
        // O external_reference é crucial para sabermos de quem é o pagamento no Webhook
        external_reference: JSON.stringify({ userId: req.user.id, planId, credits }),
        back_urls: {
          success: 'https://depoofast.netlify.app/editor',
          failure: 'https://depoofast.netlify.app/',
          pending: 'https://depoofast.netlify.app/'
        },
        auto_return: 'approved',
      }
    });

    res.json({ 
      url: response.init_point, // Link oficial de pagamento do MP
      message: "Redirecionando para o Mercado Pago..."
    });
  } catch (error) {
    console.error('Erro ao gerar preferência:', error);
    res.status(500).json({ error: 'Erro ao criar sessão de checkout: ' + (error.message || error.toString()) });
  }
});

app.post('/api/create-pix-payment', authenticateToken, async (req, res) => {
  const { planId } = req.body;
  
  let unit_price = 0;
  let credits = 0;
  let title = '';
  
  if (planId === 'plan_iniciante') { unit_price = 9.90; credits = 20; title = 'Plano Starter - 20 Gerações'; }
  else if (planId === 'plan_pro') { unit_price = 14.90; credits = 50; title = 'Plano Professional - 50 Gerações'; }
  else if (planId === 'plan_agencia') { unit_price = 19.90; credits = 100; title = 'Plano Scale - 100 Gerações'; }

  if (unit_price === 0) {
    return res.status(400).json({ error: 'Plano inválido' });
  }

  try {
    const payment = new Payment(mpClient);
    
    const response = await payment.create({
      body: {
        transaction_amount: unit_price,
        description: title,
        payment_method_id: 'pix',
        payer: {
          email: req.user.email
        },
        external_reference: JSON.stringify({ userId: req.user.id, planId, credits })
      }
    });

    res.json({ 
      qr_code_base64: response.point_of_interaction.transaction_data.qr_code_base64,
      qr_code: response.point_of_interaction.transaction_data.qr_code
    });
  } catch (error) {
    console.error('Erro ao gerar pix:', error);
    res.status(500).json({ error: 'Erro ao gerar pagamento pix: ' + (error.message || error.toString()) });
  }
});

// Webhook para receber notificação de pagamento do Mercado Pago
app.post('/api/webhooks/mercadopago', async (req, res) => {
  const { action, data } = req.body;
  
  // Respondemos 200 imediatamente para o MP não ficar enviando repetidamente
  res.status(200).send('OK');

  if (action === 'payment.created' || action === 'payment.updated') {
    try {
      // Usar fetch para buscar os dados do pagamento direto da API do MP
      const paymentId = data.id;
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      
      const payment = await paymentResponse.json();

      if (payment.status === 'approved') {
        // Extrai as informações que mandamos no external_reference
        const { userId, planId, credits } = JSON.parse(payment.external_reference);
        
        // Atualiza a tabela do usuário
        await db.execute({
          sql: 'UPDATE users SET plan = ?, credits_remaining = credits_remaining + ? WHERE id = ?',
          args: [planId, credits, userId]
        });
        
        console.log(`Sucesso: Créditos liberados para o usuário ${userId}`);
      }
    } catch (error) {
      console.error('Erro ao processar Webhook MP:', error);
    }
  }
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port} com Turso`);
});
