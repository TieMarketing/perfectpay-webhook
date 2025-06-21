import getRawBody from 'raw-body';

// Desativa o bodyParser padrão do Next.js para receber o corpo "cru"
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Método não permitido');
  }

  try {
    // Lê o corpo da requisição como buffer
    const rawBody = await getRawBody(req);
    
    // Converte o buffer para string e parseia como x-www-form-urlencoded
    const params = new URLSearchParams(rawBody.toString());
    const dados = Object.fromEntries(params);

    // Log para visualização no console da Vercel
    console.log('🔔 Webhook recebido da PerfectPay:', dados);

    // Exemplo de ação com base no status
    if (dados.status === 'aprovado') {
      console.log(`✅ Pagamento aprovado para ${dados.email}`);
      // Aqui você pode liberar produto, enviar e-mail, etc.
    }

    return res.status(200).send('OK');
  } catch (error) {
    console.error('Erro ao processar o webhook:', error);
    return res.status(500).send('Erro interno');
  }
}
