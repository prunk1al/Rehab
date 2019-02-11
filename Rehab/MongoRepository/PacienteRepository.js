var PacienteRepository = function(){
    var self=this;
    //self.db=require("../db");
    
}

const Paciente = require('../Model/Paciente');


PacienteRepository.prototype.parse = function (data) {
    var self = this;
    var paciente = new Paciente();
    for (var key of Object.keys(data)) {
        if (key in paciente) {
            paciente[key] = data[key];
        }
    }

    return paciente;
}



PacienteRepository.prototype.create = async function (data) {
    var self = this;

    var paciente = new Paciente();
    paciente.parse(data);
   
    paciente = await paciente.save();

    return paciente;

};

PacienteRepository.prototype.save= async function(paciente) {
    return await paciente.save();
}

PacienteRepository.prototype.get = async function (data) {
    return await Paciente.findOne(data);
};

PacienteRepository.prototype.getAll = async function () {
    return await Paciente.find({});
};


module.exports= new PacienteRepository();
