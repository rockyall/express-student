const mongoose = require("mongoose");

const SchemaSubject = new mongoose.Schema({
  Modulo: { type: Number, required: true },
  Faltas: { type: Number, required: true },
  Anio: { type: Number, required: true },
  Seccion: { type: String, minlength: 3, maxlength: 25, required: true },
  HoraInicio: { type: String, minlength: 5, maxlength: 25, require: true },
  ExamenI: { type: String, minlength: 5, maxlength: 25, required: true },
  ExamenII: { type: String, minlength: 5, maxlength: 25, required: true },
  ExamenIII: { type: String, minlength: 5, maxlength: 25, required: true },
  Acumulacion: { type: String, minlength: 5, maxlength: 25, required: true },
  Reposicion: { type: String, required: true },
  Nota: { type: String, required: true },
  Estado: { type: String, minlength: 5, maxlenght: 255, required: true },
  NameClass: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  lstSemana: [
    {
      Semana: {
        type: Number,
        required: true,
      },
      Recursos: { type: Array, required: true },
      Actividades: { type: Array, required: true },
    },
  ],
  Cookies: [],
});

const Subject = mongoose.model("Subjects", SchemaSubject);
const Subject_log = mongoose.model("Subjects_log", SchemaSubject);

module.exports = { Subject };
