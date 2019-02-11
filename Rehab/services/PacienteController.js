global.config = require('../config/env');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json())


var Paciente = require("../Model/Paciente");


router.get('/Paciente', async (req, res, next) => {
  var paciente = new Paciente();
  await paciente.getData(2000002);
  res.send(paciente)
});

router.post('/Paciente', async (req, res, next) => {
  var paciente = new Paciente();
  paciente.map(req.body);
  await paciente.get(paciente.nhc);
  res.send(paciente)
});

router.post('/Paciente/getData', async (req, res, next) => {
  var paciente = new Paciente();
  paciente.map(req.body);
  paciente.init()
  
  res.send(await paciente.getData())
});

router.get('/Paciente/new', async (req, res, next) => {
  var paciente = new Paciente();
  await paciente.getData(2000002);
  res.send(paciente)
});


router.post('/Paciente/validate', async (req, res, next) => {
  var paciente = new Paciente();
  
  res.send(await paciente.checkIfExists(req.body));
});



module.exports=router