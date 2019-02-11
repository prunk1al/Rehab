var SolicitudRepository = function(){
    var self=this;
    //self.db=require("../db");
    
}

const Solicitud = require('../Model/Solicitud');


SolicitudRepository.prototype.parse = function (data) {
    var self = this;
    var solicitud = new Solicitud();
    for (var key of Object.keys(data)) {
        if (key in solicitud) {
            solicitud[key] = data[key];
        }
    }

    return solicitud;
}



SolicitudRepository.prototype.create = async function (data) {
    var self = this;
    var solicitud = new Solicitud();
    solicitud.parse(data);
   
    solicitud = await solicitud.save();
    

    return solicitud;

};

SolicitudRepository.prototype.get = async function (data) {
    return await Solicitud.findOne(data).populate('paciente');
};


SolicitudRepository.prototype.getAll= async function() {
    var solicituds = await Solicitud.find({}).populate('paciente');
    return solicituds;
}

module.exports= new SolicitudRepository();
