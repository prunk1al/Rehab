global.config = require('../config/env');

var express = require('express');
var router = express.Router();


const GestorBuzon = require("../Infraestructure/GestorBuzon");

var bodyParser = require('body-parser');
router.use(bodyParser.json())


router.get('/Buzon/getAll', async (req, res, next) => {
    var response = await GestorBuzon.getAll();
    res.send(response);
});


router.get('/Buzon/:id', async (req, res, next) => {
    var buzon = await GestorBuzon.get({ _id: req.params.id });
    res.send(buzon);
});


router.post('/Buzon/new', async (req, res, next) => {
  try{
      var response = await GestorBuzon.create(req.body);
      res.send(response);
  }
  catch(err){
    console.log(err.message);
    res.status(500).send(err.message); 
  }
});

router.post('/Buzon/addSolicitud', async (req, res, next) => {
  try{
      var response = await GestorBuzon.addSolicitud(req.body);
      res.send(response);
  }
  catch(err){
    console.log(err.message);
    res.status(500).send(err.message); 
  }
});





module.exports=router