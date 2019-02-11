global.config = require('../config/env');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json())


const GestorPaciente = require("../Infraestructure/GestorPaciente");



router.post('/Paciente/get', async (req, res, next) => {
    var paciente = await GestorPaciente.getData(req.body);
    res.send(paciente);
});

router.get('/Paciente/getAll', async (req, res, next) => {
    var paciente = await GestorPaciente.getAll();
    res.send(paciente);
});


router.post('/Paciente/new', async (req, res, next) => {
    try {
        console.log(req.body)
        var response = await GestorPaciente.create(req.body);
        res.send(response);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});


router.post('/Paciente/validate', async (req, res, next) => {
  var paciente = new Paciente();
  
  res.send(await paciente.checkIfExists(req.body));
});



module.exports=router