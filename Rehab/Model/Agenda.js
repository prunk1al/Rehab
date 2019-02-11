const appconfig = require('../config/env');;
const config = appconfig;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Agenda = new Schema({
    nombre: String,
    id: String,
    personal: [{ type: Schema.Types.ObjectId, ref: 'Personal' }]
});


Agenda.methods.parse = function(data){
    var self=this;
     for (var key of Object.keys(data)) {
        if (key in self) {
            self[key] = data[key];
        }
    }
}

module.exports = mongoose.model('Agenda', Agenda);
