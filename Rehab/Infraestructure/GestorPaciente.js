


const appconfig = require('../config/env');;
const config = appconfig;

var cache = {};
if(config.cache){
	const Cache = require('../db/Cache');
	cache = new Cache();
}

//const Paciente = require('../Model/Paciente');
const repositories = require('../repository')


function GestorPaciente(){
	var self=this;

}



GestorPaciente.prototype.getData = async function () {
    var self = this;
    var data = await self.getDataFromCache();
    if (!data) {
        data = await self.getDataFromSource();
    }
    return data;
};




GestorPaciente.prototype.getDataFromSource = async function(){
	var self=this;
	//await self.new(data)
    var data = await self.getFromDb();

	if(data)
		cache.set("Paciente" + self.nhc ,data)
	
	return data
	
}


GestorPaciente.prototype.getDataFromCache= async function(){
	var self=this;
	var data=null;
	if(config.cache){
		data=await cache.get("Paciente" + self.nhc);
		if(data)
			console.log("data form cache");
	}

	return data;
};




GestorPaciente.prototype.create = async function (data) {
    var self = this;

    var paciente = await self.getData(data);
    if (!paciente)
        paciente = await repositories.PacienteRepository.create(data)

    return paciente;

};

GestorPaciente.prototype.save = async function(paciente){
    return await repositories.PacienteRepository.save(paciente)
}

GestorPaciente.prototype.getFromDb = async function (data) {
    return await repositories.PacienteRepository.get(data);
};

GestorPaciente.prototype.getAll = async function () {
    var pacientes = await cache.get("Pacientes");
    if (!pacientes){
        pacientes = await repositories.PacienteRepository.getAll();
        cache.set("Pacientes", pacientes);
    }
    return pacientes;
};




module.exports = new GestorPaciente();