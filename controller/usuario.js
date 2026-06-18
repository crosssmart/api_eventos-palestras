const Usuario = require('../model/usuario.js');
const bcrypt = require('bcrypt');

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