

const appconfig = require('../config/env');;
const config = appconfig;

var cache = {};
if(config.cache){
	const Cache = require('../db/Cache');
	cache = new Cache();
}


const repositories = require('../repository')

const SolicitudRepository = repositories.SolicitudRepository;
const GestorPaciente = require('./GestorPaciente');


function GestorSolicitud(){
	var self=this;

}


GestorSolicitud.prototype.create = async function(data){
	var self=this;

    var paciente = await GestorPaciente.getData(data.paciente);

    if (!paciente) {
		throw(Error("El paciente no existe")) ;
	}
	
    delete data.paciente;
   
    var solicitud = await self.getData(data)
    if (!solicitud) {
        data.paciente = paciente.id
        //var solicitud = self.parse(data);
        //solicitud.paciente = paciente.id;
        data.fecha = Date.now();
        solicitud = await SolicitudRepository.create(data)

        
        paciente.solicitudes.push(solicitud.id);
        GestorPaciente.save(paciente);
    }

    solicitud.populate('paciente');
    console.log(solicitud);

    return solicitud;
	
}

GestorSolicitud.prototype.getFromDb = async function (data) {
    return await SolicitudRepository.get(data);

};


GestorSolicitud.prototype.getAll = async function () {
    return await SolicitudRepository.getAll();


};





GestorSolicitud.prototype.getData = async function (key) {
    var self = this;
    var data = await self.getDataFromCache(key);
    if (!data) {
        data = await self.getDataFromSource(key);

    }

    //if(data)
    //	self.map(data);
    return data;

};


GestorSolicitud.prototype.getDataFromSource = async function(key){
	var self=this;
	//await self.new(data)
    var data = await self.getFromDb(data);

	if(cache){
		cache.set('solicitud '+key,data);
	}
	
	return data
	
}


GestorSolicitud.prototype.getDataFromCache= async function(key){
	var self=this;
	var data=null;
	if(config.cache){
		data=await cache.get("solicitud " +key)
		if(data)
			console.log("data form cache")
	}

	return data;
}



module.exports = new GestorSolicitud();
