const Usuario = require('../model/usuario.js');
const bcrypt = require('bcrypt');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    res.send(usuarios);
  } catch (erro) {
    console.log(erro);
    console.log("[ERRO] Deu erro na API!");
  }
}

exports.registrarUsuario = async (req, res) => {
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const senha = req.body.senha;
  const pronomes = req.body.pronomes;

  if (!nome || !cpf || !email || !senha || !pronomes) {
    return res.send({ msg: '[ERRO]: Informar dados corretamente!' });
  }

  try {
    const usuarioJahExiste = await Usuario.findOne({ email: email });
    if (usuarioJahExiste) {
      return res.send({ msg: '[ERRO]: Já existe um usuário com esse email!' });
    }

    const senhaEncriptada = await bcrypt.hash(senha, 10);

    const novoUsuario = {
      nome: nome,
      cpf: cpf,
      email: email,
      senha: senhaEncriptada,
      pronomes: pronomes
    }

    await Usuario.create(novoUsuario);
    res.send('[SUCESSO]: Usuario criado com sucesso!');

  } catch (erro) {
    console.log(erro);
    res.send({ msg: '[ERRO]: Erro ao cadastrar usuario', detalhes: erro });
  }
}

// Falta edit e remover;~conferir com o rogerio NAO ESQUECER 

exports.editarUsuario = async (req, res) => {
  const id = req.params.id;

  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const senha = req.body.senha;
  const pronomes = req.body.pronomes;

  if (!id) {
    return res.send({ msg: "[ERRO]: Informe o ID do usuário!" });
  }

  try {

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.send({ msg: "[ERRO]: Usuário não encontrado!" });
    }

    if (nome) {
      usuario.nome = nome;
    }

    if (cpf) {
      usuario.cpf = cpf;
    }

    if (email) {
      usuario.email = email;
    }

    if (pronomes) {
      usuario.pronomes = pronomes;
    }

    if (senha) {
      usuario.senha = await bcrypt.hash(senha, 10);
    }

    await usuario.save();

    res.send("[SUCESSO]: Usuário atualizado com sucesso!");

  } catch (erro) {
    console.log(erro);
    res.send({ msg: "[ERRO]: Erro ao atualizar usuário!" });
  }
}


exports.deletarUsuario = async (req, res) => {

  const id = req.params.id;

  if (!id) {
    return res.send({ msg: "[ERRO]: Informe o ID do usuário!" });
  }

  try {

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.send({ msg: "[ERRO]: Usuário não encontrado!" });
    }

    await usuario.deleteOne();

    res.send("[SUCESSO]: Usuário removido com sucesso!");

  } catch (erro) {
    console.log(erro);
    res.send({ msg: "[ERRO]: Erro ao remover usuário!" });
  }
}