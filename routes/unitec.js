const express = require("express");
const router = express.Router();
const db = require("../db");
const mongoose = require("mongoose");
const { Subject } = require("../modules/unitec_model");
const { ObjectID } = require("mongodb");

// const Unitec = mongoose.model("unitec", SchemaUntec);

router.get("/", (req, res) => {
  Subject.find({})
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/save", (req, res) => {
  try {
    const element = req.body;
    console.log(element);
    const subject = new Subject({
      Modulo: element.Modulo,
      Faltas: element.Faltas,
      Anio: element.Anio,
      Seccion: element._RegistroClases__Seccion,
      HoraInicio: element._RegistroClases__horaInicio,
      ExamenI: element._RegistroClases__examenI,
      ExamenII: element._RegistroClases__examenII,
      ExamenIII: element._RegistroClases__examenIII,
      Acumulacion: element._RegistroClases__Acumulacion,
      Reposicion: element._RegistroClases__repos,
      Nota: element._RegistroClases__nota,
      Estado: element._RegistroClases__Estado,
      NameClass: element.NombreClase,
      lstSemana: element.lstSemana,
      Cookies: element.cookies,
    });

    subject
      .save()
      .then((resp) => {
        console.log(resp);
        res.send("Saved");
      })
      .catch((error) => {
        console.log(error);
        res.send("Error");
      });
  } catch (error) {}
});

router.put("/update", (req, res) => {
  try {
    
  } catch (error) {
    res.send("There were a problem in the put method", error);
  }
});

module.exports = router;
