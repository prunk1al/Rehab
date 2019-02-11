//global.config = require('./config/env');

var express = require('express');
var router = express.Router();
const path = require('path');
const db = require('./db')




var app = express();

const paciente = require("./Controller/PacienteController");
const solicitud = require("./Controller/SolicitudController");
const tratamiento = require("./Controller/TratamientoController");

router.use('/', express.static(__dirname + '/client'));


var normalizedPath = require("path").join(__dirname, './Controller/' ); 
require("fs").readdirSync(normalizedPath).forEach(function(file) { 
    var instance =  require('./Controller/' + file); 
    router.use(instance);
});

//router.use(paciente);
//router.use(solicitud);
//router.use(tratamiento);

app.use(router);


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
   console.log('Example app listening on port 3000!');
  console.log("Hello World;")
  console.log(process.version);
  console.log(process.env.PORT || 3000)
  console.log(process.env.IP || "0.0.0.0")

});   

