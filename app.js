const express = require('express');
const api = express();
api.use(express.json());
const porta = 3000;
const mongoose = require('mongoose');

//Corrigir erro do MongoDB Atlas com o node que as vezes pode dar:
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

// Configurando o dotenv para ler as variáveis de ambiente do arquivo .env
require('dotenv').config();
const URL_BD = process.env.URL_BD || '';
mongoose.connect(URL_BD);

mongoose.connection.on('connected', () => {
  console.log('API conectada ao BD!');
})
mongoose.connection.on('disconnected', () => {
  console.log('API desconectada ao BD!');
})
mongoose.connection.on('error', (erro) => {
  console.log('[ERRO] API não conectada ao BD!');
  console.log(erro);
})

// TROCAR ISSO AQUI
const produtosController = require('./controller/produto.js');
const usuarioController = require('./controller/usuario.js');
const auth = require('./middlewares/auth.js');

api.post('/usuario', usuarioController.registrarUsuario);
api.post('/logar', auth.logar);


// TROCAR ISSO AQUI
//Mostrar
api.get('/produtos', auth.autenticar, produtosController.listarProdutos);
//Adicionar
api.post('/produto', auth.autenticar, produtosController.adicionarProduto);
//Editar
api.put('/produto', auth.autenticar, produtosController.editarProduto);
//Remover
api.delete('/produto', auth.autenticar, produtosController.removerProduto);



api.listen(porta, () => {
  console.log('API rodando na porta ', porta);
})