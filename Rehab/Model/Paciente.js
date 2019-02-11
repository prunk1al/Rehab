const appconfig = require('../config/env');;
const config = appconfig;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Paciente = new Schema({
    nhc: Number,
    nasi: Number,
    nombre: String,
    apellidos: String,
    solicitudes: [{ type: Schema.Types.ObjectId, ref: 'Solicitudes' }]
});


Paciente.methods.parse = function(data){
    var self=this;
     for (var key of Object.keys(data)) {
        if (key in self) {
            self[key] = data[key];
        }
    }
}

module.exports = mongoose.model('Paciente', Paciente);
