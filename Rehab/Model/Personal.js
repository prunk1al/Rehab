const appconfig = require('../config/env');;
const config = appconfig;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Personal = new Schema({
    nombre: String,
    apellidos: String,
    codpers: Number,
    id: String,
});


Personal.methods.parse = function(data){
    var self=this;
     for (var key of Object.keys(data)) {
        if (key in self) {
            self[key] = data[key];
        }
    }
}

module.exports = mongoose.model('Personal', Personal);
