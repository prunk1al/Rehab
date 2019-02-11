global.config = require('../config/env');

var express = require('express');
var router = express.Router();


const GestorAgenda = require("../Infraestructure/GestorAgenda");

var bodyParser = require('body-parser');
router.use(bodyParser.json())


router.get('/Agenda/getAll', async (req, res, next) => {
    var response = await GestorAgenda.getAll();
    res.send(response);
});


router.get('/Agenda/getUnasigned', async (req, res, next) => {
  var agenda = new Agenda();
  await agenda.getUnasigned();
    res.send(agenda);
});



router.get('/Agenda/:id', async (req, res, next) => {
    var agenda = await GestorAgenda.getData({ _id: req.params.id });
    res.send(agenda);
});



router.post('/Agenda/new', async (req, res, next) => {
  try{
  //var agenda = new Gesto();
  //agenda.map(req.body)
  console.log(req.body)
  var response = await GestorAgenda.create(req.body);
      res.send(response);
  }
  catch(err){
    console.log(err.message);
    res.status(500).send(err.message); 
  }
});



router.post('/Agenda/update', async (req, res, next) => {
  var agenda = new Agenda();
  await agenda.update(req.params);
    res.send(agenda);
});



module.exports=router