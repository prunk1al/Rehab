global.config = require('../config/env');

var express = require('express');
var router = express.Router();


const GestorSolicitud = require("../Infraestructure/GestorSolicitud");

var bodyParser = require('body-parser');
router.use(bodyParser.json())


router.get('/Solicitud/getAll', async (req, res, next) => {
    var response = await GestorSolicitud.getAll();
    res.send(response);
});


router.get('/Solicitud/getUnasigned', async (req, res, next) => {
  var solicitud = new Solicitud();
  await solicitud.getUnasigned();
    res.send(solicitud);
});



router.get('/Solicitud/:id', async (req, res, next) => {
    var solicitud = await GestorSolicitud.getData({ _id: req.params.id });
    res.send(solicitud);
});



router.post('/Solicitud/new', async (req, res, next) => {
  try{
  //var solicitud = new Gesto();
  //solicitud.map(req.body)
  console.log(req.body)
  var response = await GestorSolicitud.create(req.body);
      res.send(response);
  }
  catch(err){
    console.log(err.message);
    res.status(500).send(err.message); 
  }
});



router.post('/Solicitud/update', async (req, res, next) => {
  var solicitud = new Solicitud();
  await solicitud.update(req.params);
    res.send(solicitud);
});



module.exports=router