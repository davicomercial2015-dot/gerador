import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { pb, getAdminClient } from './db.js';
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
    const client = await getAdminClient();
    
    // Cadastrar usuário no PocketBase
    const record = await client.collection('users').create({
      email,
      password,
      passwordConfirm: password,
      plan: 'free',
      credits_remaining: 0,
      emailVisibility: true
    });

    const token = jwt.sign({ id: record.id, email: record.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: record.id, email: record.email, plan: 'free', credits_remaining: 0 } });
    
  } catch (error) {
    if (error.status === 400 || (error.message && error.message.includes('unique'))) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }
    console.error('Erro no cadastro do PocketBase:', error.message || error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await getAdminClient();
    
    // Autenticar com a senha do usuário
    const authData = await client.collection('users').authWithPassword(email, password);
    const user = authData.record;

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        plan: user.plan || 'free',
        credits_remaining: user.credits_remaining || 0
      }
    });
  } catch (error) {
    console.error('Erro no login do PocketBase:', error.message || error);
    res.status(401).json({ error: 'Email ou senha incorretos' });
  }
});

// Consultar cota atual
app.get('/api/quota', authenticateToken, async (req, res) => {
  try {
    const client = await getAdminClient();
    const user = await client.collection('users').getOne(req.user.id);
    
    const credits = user.credits_remaining || 0;
    const plan = user.plan || 'free';

    res.json({
      plan,
      credits_remaining: credits,
      hasQuota: credits > 0 || plan !== 'free'
    });
  } catch (error) {
    console.error('Erro ao buscar cota no PocketBase:', error.message || error);
    res.status(500).json({ error: 'Erro ao consultar saldo' });
  }
});

// Consumir 1 crédito de cota
app.post('/api/consume-quota', authenticateToken, async (req, res) => {
  try {
    const client = await getAdminClient();
    const user = await client.collection('users').getOne(req.user.id);
    
    const credits = user.credits_remaining || 0;
    const plan = user.plan || 'free';

    if (credits <= 0 && plan === 'free') {
      return res.status(403).json({ error: 'Cota gratuita esgotada' });
    }

    const newCredits = Math.max(0, credits - 1);

    await client.collection('users').update(req.user.id, {
      credits_remaining: newCredits
    });

    res.json({ success: true, credits_remaining: newCredits });
  } catch (error) {
    console.error('Erro ao consumir cota no PocketBase:', error.message || error);
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
      url: response.init_point,
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
        external_reference: JSON.stringify({ userId: req.user.id, planId, credits }),
        notification_url: 'https://gerador-api-b4fq.onrender.com/api/webhooks/mercadopago'
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
  const { action, type, data } = req.body;
  
  res.status(200).send('OK');

  const eventType = action || type;

  if (eventType === 'payment.created' || eventType === 'payment.updated' || eventType === 'payment') {
    try {
      const paymentId = data.id;
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      
      const payment = await paymentResponse.json();

      if (payment.status === 'approved') {
        const { userId, planId, credits } = JSON.parse(payment.external_reference);
        
        const client = await getAdminClient();
        
        // Obter os créditos atuais do usuário
        const user = await client.collection('users').getOne(userId);
        const currentCredits = user.credits_remaining || 0;
        
        // Atualizar plano e créditos no PocketBase
        await client.collection('users').update(userId, {
          plan: planId,
          credits_remaining: currentCredits + credits
        });
        
        console.log(`Sucesso: Créditos liberados para o usuário ${userId}`);
      }
    } catch (error) {
      console.error('Erro ao processar Webhook MP no PocketBase:', error.message || error);
    }
  }
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port} com PocketBase`);
});
