

const appconfig = require('../config/env');;
const config = appconfig;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Solicitud = new Schema({
    
    duracion: Number,
    urgencia: Boolean,
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
    fecha: Date,
    tratamientos: [{ type: Schema.Types.ObjectId, ref: 'Tratamiento' }]
});

Solicitud.methods.parse = function(data){
    var self=this;
     for (var key of Object.keys(data)) {
        if (key in self) {
            self[key] = data[key];
        }
    }
}


module.exports = mongoose.model('Solicitud', Solicitud)