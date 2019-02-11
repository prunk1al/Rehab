


const appconfig = require('../config/env');;
const config = appconfig;

var cache = {};
if(config.cache){
	const Cache = require('../db/Cache');
	cache = new Cache();
}

//const Tratamiento = require('../Model/Tratamiento');

const repositories = require('../repository')


function GestorTratamiento(){
	var self=this;
}



GestorTratamiento.prototype.getData = async function (data) {
    var self = this;
    var data = await self.getDataFromCache(data);
    if (!data) {
        data = await self.getDataFromSource(data);
    }

   
    return data;

};


GestorTratamiento.prototype.create = async function (data) {
    var self = this;

    
    var tratamiento = await self.getData(data);
    if (!tratamiento)
        tratamiento = await repositories.TratamientoRepository.create(data)

    return tratamiento;

};

GestorTratamiento.prototype.getFromDb = async function (data) {
    return await repositories.TratamientoRepository.get(data)
    //return await db.get(data);

};


GestorTratamiento.prototype.getAll = async function () {
    var tratamientos = await cache.get("Tratamientos");
    if (!tratamientos){
        tratamientos = await repositories.TratamientoRepository.getAll();
        cache.set("Tratamientos", tratamientos);
    }
    return tratamientos;
};



GestorTratamiento.prototype.getDataFromSource = async function(){
	var self=this;
	//await self.new(data)
    var data = await self.getFromDb();

	if(data)
		cache.set("Tratamiento" + self.nhc ,data)
	
	return data
	
}


GestorTratamiento.prototype.getDataFromCache= async function(){
	var self=this;
	var data=null;
	if(config.cache){
		data=await cache.get("Tratamiento" + self.nhc);
		if(data)
			console.log("data form cache");
	}

	return data;
};




module.exports = new GestorTratamiento();