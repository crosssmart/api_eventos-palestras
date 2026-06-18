const Eventos = require('../model/eventos.js');

exports.listarEventos = async (req, res) => {
  try {
    const eventos = await Eventos.find({});
    res.send(eventos);
  } catch (erro) {
    console.log(erro);
    console.log("[ERRO] Deu erro na API!");

  }
}

// FALTA CONFIGURAR!

exports.adicionarProduto = async (req, res) => {
  const novoEvento = req.body;

  if (!novoEvento.nome || !novoEvento.palestrante) {
    res.send('[ERRO]: Informar nome e palestrante!');
  } else {
    try {
      const evento = await Eventos.create(novoEvento);
      res.send({ msg: '[SUCESSO]: evento cadastrado!', detalhes: evento });
    } catch (erro) {
      console.log(erro);
      res.send({ msg: '[ERRO]: no cadastro de produto', detalhes: erro });
    }
  }
}

exports.removerProduto = async (req, res) => {
  const produto = req.body;
  if (!produto.nome) {
    return res.send({ msg: '[ERRO]: informar nome!' });
  }

  try {
    const produtoRemovido = await Produtos.findOneAndDelete({ nome: produto.nome });

    if (produtoRemovido == null) {
      res.send({ msg: '[AVISO]: Produto não existe no BD!' });
    } else {
      res.send({ msg: '[SUCESSO]: Produto removido do BD!' });
    }

  } catch (erro) {
    console.log(erro);
    res.send({ msg: '[ERRO]: Remover produto!', detalhes: erro });
  }
}

exports.editarProduto = async (req, res) => {
  const produto = req.body;
  if (!produto.nome || !produto.preco) {
    return res.send({ msg: '[ERRO]: informar nome e preço!' });
  }

  try {
    const produtoEditado = await Produtos.findOneAndUpdate(
      { nome: produto.nome },
      { preco: produto.preco }
    );

    if (produtoEditado == null) {
      res.send({ msg: '[AVISO]: Produto não existe no BD!' });
    } else {
      res.send({ msg: '[SUCESSO]: Produto editado do BD!' });
    }

  } catch (erro) {
    console.log(erro);
    res.send({ msg: '[ERRO]: Remover produto!', detalhes: erro });
  }
}