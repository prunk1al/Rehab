global.config = require('../config/env');

var express = require('express');
var router = express.Router();


var Solicitud = require("../Model/Solicitud");

var bodyParser = require('body-parser');
router.use(bodyParser.json())


router.get('/Solicitud/getAll', async (req, res, next) => {
  var solicitud = new Solicitud();
  await solicitud.getAll();
  res.send(solicitud)
});


router.get('/Solicitud/getUnasigned', async (req, res, next) => {
  var solicitud = new Solicitud();
  await solicitud.getUnasigned();
  res.send(solicitud)
});



router.get('/Solicitud/:id', async (req, res, next) => {
  var solicitud = new Solicitud();
  await solicitud.getData(req.params.id);
  res.send(solicitud)
});



router.post('/Solicitud/new', async (req, res, next) => {
  try{
  var solicitud = new Solicitud();
  solicitud.map(req.body)
  console.log(req.body)
  await solicitud.create();
  res.send(solicitud)
  }
  catch(err){
    res.status(500).send(err.message); 
  }
});



router.post('/Solicitud/update', async (req, res, next) => {
  var solicitud = new Solicitud();
  await solicitud.update(req.params);
  res.send(solicitud)
});



module.exports=router