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

exports.editarUsuario = async (req, res) => {
  const usuario = req.body;
  if (!usuario.cpf) {
    return res.send({ msg: "[ERRO]: Informe o CPF do usuário!" });
  }

  try {
    const usuarioEditado = await Usuario.findOneAndUpdate(
      { cpf: usuario.cpf },
      {
        nome: usuario.nome, email: usuario.email, senha: await bcrypt.hash(usuario.senha, 10),
        pronomes: usuario.pronomes
      }
    );

    if (usuarioEditado == null) {
      res.send({ msg: '[AVISO]: Usuario não existe no BD!' });
    } else {
      res.send({ msg: '[SUCESSO]: Usuario editado do BD!' });
    }

  } catch (erro) {
    console.log(erro);
    res.send({ msg: "[ERRO]: Erro ao atualizar usuário!" });
  }
}

exports.deletarUsuario = async (req, res) => {
  const usuario = req.body;
  if (!usuario.cpf) {
    return res.send({ msg: "[ERRO]: Informe o CPF do usuário!" });
  }

  try {
    const usuarioRemovido = await Usuario.findOneAndDelete({ cpf: usuario.cpf });

    if (usuarioRemovido == null) {
      res.send({ msg: '[AVISO]: Usuario não existe no BD!' });
    } else {
      res.send({ msg: '[SUCESSO]: Usuario removido do BD!' });
    }

  } catch (erro) {
    console.log(erro);
    res.send({ msg: "[ERRO]: Erro ao remover usuário!" });
  }
}