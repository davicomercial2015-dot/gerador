import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();

const pbUrl = process.env.POCKETBASE_URL || 'https://pocketbase.conectacristo.site';
const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL || 'davicomercial2015@gmail.com';
const adminPassword = process.env.POCKETBASE_ADMIN_PASSWORD || 'VNL$9340';

export const pb = new PocketBase(pbUrl);

// Garante que o client está autenticado como admin para chamadas de sistema privilegiadas
export async function getAdminClient() {
  if (pb.authStore.isValid && pb.authStore.model && pb.authStore.model.collectionId === '_superusers') {
    return pb;
  }
  
  try {
    await pb.collection('_superusers').authWithPassword(adminEmail, adminPassword);
    console.log('Conectado como admin no PocketBase.');
  } catch (error) {
    console.error('Erro ao autenticar admin no PocketBase:', error.message || error);
  }
  return pb;
}

// Inicializa o banco de dados criando campos customizados na coleção users se necessário
async function initDb() {
  try {
    const client = await getAdminClient();
    
    // Obter a coleção de usuários
    const collection = await client.collections.getOne('users');
    const hasField = (name) => collection.fields.some(f => f.name === name);
    let updated = false;

    // No PocketBase v0.23+, a estrutura usa 'fields' em vez de 'schema'
    const fieldsList = collection.fields || collection.schema || [];

    const addField = (fieldObj) => {
      fieldsList.push(fieldObj);
      updated = true;
    };

    if (!hasField('plan')) {
      addField({
        name: 'plan',
        type: 'text',
        required: false,
        system: false,
      });
    }

    if (!hasField('credits_remaining')) {
      addField({
        name: 'credits_remaining',
        type: 'number',
        required: false,
        system: false,
      });
    }

    if (!hasField('stripe_customer_id')) {
      addField({
        name: 'stripe_customer_id',
        type: 'text',
        required: false,
        system: false,
      });
    }

    if (updated) {
      // Atualizar a coleção no servidor
      collection.fields = fieldsList;
      await client.collections.update('users', collection);
      console.log('Schema da coleção "users" atualizado com sucesso no PocketBase.');
    } else {
      console.log('Conexão estabelecida com PocketBase. Tabela "users" validada.');
    }
  } catch (error) {
    console.warn('Alerta na inicialização do schema no PocketBase (campos podem já existir ou requerer ajuste manual):', error.message || error);
  }
}

// Rodar em background para não travar a inicialização do app
initDb().catch(err => console.error('Falha ao rodar initDb:', err));
