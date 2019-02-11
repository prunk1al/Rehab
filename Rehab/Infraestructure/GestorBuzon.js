


const appconfig = require('../config/env');;
const config = appconfig;

var cache = {};
if(config.cache){
	const Cache = require('../db/Cache');
	cache = new Cache();
}


const repositories = require('../repository')


function GestorBuzon(){
	var self=this;
}



GestorBuzon.prototype.get = async function (data) {
    var buzon = await cache.get("Buzon " + data.nombre );
    if (!buzon){
        buzon = await repositories.BuzonRepository.get(data);
        cache.set("Buzon " + data.nombre, buzon);
    }
    return buzon;

};


GestorBuzon.prototype.create = async function (data) {
    var self = this;

    
    var buzon = await self.get(data);
    if (!buzon)
        buzon = await repositories.BuzonRepository.create(data)

    return buzon;

};

GestorBuzon.prototype.getFromDb = async function (data) {
    return await repositories.BuzonRepository.get(data)
    //return await db.get(data);

};


GestorBuzon.prototype.getAll = async function () {
    var buzones = await cache.get("Buzones");
    if (!buzones){
        buzones = await repositories.BuzonRepository.getAll();
        cache.set("Buzones", buzones);
    }
    return buzones;
};






module.exports = new GestorBuzon();