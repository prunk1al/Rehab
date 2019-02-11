const appconfig = require('../config/env');;
const config = appconfig;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Buzon = new Schema({
    nombre: String,
    id: String,
    Solicitudes: [{ type: Schema.Types.ObjectId, ref: 'Solicitud' }],
    Tratamientos: [{ type: Schema.Types.ObjectId, ref: 'Tratamiento' }]
});


Buzon.methods.parse = function(data){
    var self=this;
     for (var key of Object.keys(data)) {
        if (key in self) {
            self[key] = data[key];
        }
    }
}

function autoPopulateSubs(next) {
  this.populate('Solicitudes');
  next();
}

Buzon
  .pre('findOne', autoPopulateSubs)
  .pre('find', autoPopulateSubs);


module.exports = mongoose.model('Buzon', Buzon);
