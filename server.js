const express = require('express');
const path = require('path');
const app = express();

// Serve os arquivos estáticos da pasta build
app.use(express.static(path.join(__dirname, 'build')));

// Rota para servir o index.html para qualquer rota não especificada
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Porta em que o servidor irá rodar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
