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

  

exports.adicionarEvento = async (req, res) => {
  const novoEvento = req.body;

  if (!novoEvento.nome || !novoEvento.id) {
    res.send('[ERRO]: Informar nome e ID!');
  } else {
    try {
      const evento = await Eventos.create(novoEvento);
      res.send({ msg: '[SUCESSO]: evento cadastrado!', detalhes: evento });
    } catch (erro) {
      console.log(erro);
      res.send({ msg: '[ERRO]: no cadastro de evento', detalhes: erro });
    }
  }
}

exports.removerEvento = async (req, res) => {
  const evento = req.body;
  if (!evento.nome) {
    return res.send({ msg: '[ERRO]: informar nome!' });
  }

  try {
    const eventoRemovido = await Eventos.findOneAndDelete({ nome: evento.nome });

    if (eventoRemovido == null) {
      res.send({ msg: '[AVISO]: Evento não existe no BD!' });
    } else {
      res.send({ msg: '[SUCESSO]: Evento removido do BD!' });
    }

  } catch (erro) {
    console.log(erro);
    res.send({ msg: '[ERRO]: Remover evento!', detalhes: erro });
  }
}

exports.editarEvento = async (req, res) => {
  const evento = req.body;
  if (!evento.nome || !evento.id) {
    return res.send({ msg: '[ERRO]: informar nome e ID!' });
  }

  try {
    const eventoEditado = await Eventos.findOneAndUpdate(
      { nome: evento.nome },
      { id: evento.id }
    );

    if (eventoEditado == null) {
      res.send({ msg: '[AVISO]: Evento não existe no BD!' });
    } else {
      res.send({ msg: '[SUCESSO]: Evento editado do BD!' });
    }

  } catch (erro) {
    console.log(erro);
    res.send({ msg: '[ERRO]: Editar evento!', detalhes: erro });
  }
}