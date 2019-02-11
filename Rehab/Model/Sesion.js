const appconfig = require('../config/env');;
const config = appconfig;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Sesion = new Schema({
    fecha: Date,
    solicitud: { type: Schema.Types.ObjectId, ref: 'Solicitud' },
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
    tratamiento: { type: Schema.Types.ObjectId, ref: 'Tratamiento' },
   
});


Sesion.methods.parse = function(data){
    var self=this;
     for (var key of Object.keys(data)) {
        if (key in self) {
            self[key] = data[key];
        }
    }
}

module.exports = mongoose.model('Sesion', Sesion)