const appconfig = require('../config/env');;
const config = appconfig;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TratamientoModel = new Schema({
    nombre: String,
    codigo: String,
    duracion: Number
});

const Tratamiento = new mongoose.model('Tratamiento', TratamientoModel);

Tratamiento.prototype.parse = function(data){
    var self=this;
     for (var key of Object.keys(data)) {
        if (key in self) {
            self[key] = data[key];
        }
    }
}


module.exports = Tratamiento;
