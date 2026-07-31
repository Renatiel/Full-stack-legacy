const express = require('express');
const cors = require('cors');
const app = express();

// Habilita o CORS para que os testes do freeCodeCamp consigam realizar requisições
app.use(cors({ optionsSuccessStatus: 200 }));

// Habilita o suporte para obter o IP correto quando a aplicação estiver atrás de um proxy (ex: Render, Replit, Vercel)
app.enable('trust proxy');

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// ============================================================
// LÓGICA DO MICROSSERVIÇO REQUEST HEADER PARSER
// ============================================================
app.get('/api/whoami', (req, res) => {
  // 1. Obtém o endereço IP do cliente (considerando proxies ou req.ip)
  const ipaddress = req.headers['x-forwarded-for'] 
    ? req.headers['x-forwarded-for'].split(',')[0] 
    : req.ip;

  // 2. Obtém o idioma preferencial a partir do cabeçalho 'accept-language'
  const language = req.headers['accept-language'];

  // 3. Obtém as informações do navegador/sistema operacional a partir do cabeçalho 'user-agent'
  const software = req.headers['user-agent'];

  // Retorna o objeto JSON com as chaves exigidas
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// Inicialização do servidor na porta 3000 ou na definida pelo ambiente
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Sua aplicação está rodando na porta ' + listener.address().port);
});
