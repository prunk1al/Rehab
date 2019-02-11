


const appconfig = require('../config/env');;
const config = appconfig;

var cache = {};
if(config.cache){
	const Cache = require('../db/Cache');
	cache = new Cache();
}


const repositories = require('../repository')


function GestorPersonal(){
	var self=this;
}



GestorPersonal.prototype.get = async function (data) {
    var personal = await cache.get("Personal " + data.codpers );
    if (!personal){
        personal = await repositories.PersonalRepository.get(data);
        cache.set("Personal " + data.codpers, personal);
    }
    return personal;

};


GestorPersonal.prototype.create = async function (data) {
    var self = this;

    
    var personal = await self.get(data);
    if (!personal)
        personal = await repositories.PersonalRepository.create(data)

    return personal;

};

GestorPersonal.prototype.getFromDb = async function (data) {
    return await repositories.PersonalRepository.get(data)
    //return await db.get(data);

};


GestorPersonal.prototype.getAll = async function () {
    var personals = await cache.get("Personals");
    if (!personals){
        personals = await repositories.PersonalRepository.getAll();
        cache.set("Personals", personals);
    }
    return personals;
};






module.exports = new GestorPersonal();