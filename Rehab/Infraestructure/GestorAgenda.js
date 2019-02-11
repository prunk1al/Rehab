


const appconfig = require('../config/env');;
const config = appconfig;

var cache = {};
if(config.cache){
	const Cache = require('../db/Cache');
	cache = new Cache();
}


const repositories = require('../repository')


function GestorAgenda(){
	var self=this;
}



GestorAgenda.prototype.get = async function (data) {
    var agenda = await cache.get("Agenda " + data.nombre );
    if (!agenda){
        agenda = await repositories.AgendaRepository.get(data);
        cache.set("Agenda " + data.nombre, agenda);
    }
    return agenda;

};


GestorAgenda.prototype.create = async function (data) {
    var self = this;

    
    var agenda = await self.get(data);
    if (!agenda)
        agenda = await repositories.AgendaRepository.create(data)

    return agenda;

};

GestorAgenda.prototype.getFromDb = async function (data) {
    return await repositories.AgendaRepository.get(data)
};


GestorAgenda.prototype.getAll = async function () {
    var agendas = await cache.get("Agendas");
    if (!agendas){
        agendas = await repositories.AgendaRepository.getAll();
        cache.set("Agendas", agendas);
    }
    return agendas;
};






module.exports = new GestorAgenda();