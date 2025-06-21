export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Método não permitido');
  }

  // Captura dados enviados como application/x-www-form-urlencoded
  const body = await new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
  });

  const params = new URLSearchParams(body);
  const dados = Object.fromEntries(params);

  console.log('🔔 Webhook recebido da PerfectPay:', dados);

  // Exemplo: ação com base no status
  if (dados.status === 'aprovado') {
    console.log(`✅ Pagamento aprovado para ${dados.email}`);
    // Aqui você pode: salvar no banco, enviar e-mail, liberar acesso, etc.
  }

  res.status(200).send('OK');
}
