const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventosSchema = new Schema({
  nome: { type: String, required: true, unique: true },
  palestrante: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  tema: { type: String, required: true },
  tema: { type: Number, required: true },
  tema: { type: Number, required: true }
})

module.exports = mongoose.model('Eventos', eventosSchema);