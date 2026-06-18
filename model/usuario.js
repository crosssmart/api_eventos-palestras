const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: { type: String, required: true },
  cpf: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  criacao: { type: Date, default: Date.now },
  pronomes: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);