var BuzonRepository = function(){
    var self=this;

}

const Buzon = require('../Model/Buzon');


BuzonRepository.prototype.parse = function (data) {
    var self = this;
    var buzon = new Buzon();
    for (var key of Object.keys(data)) {
        if (key in buzon) {
            buzon[key] = data[key];
        }
    }

    return buzon;
}



BuzonRepository.prototype.create = async function (data) {
    var self = this;
    var buzon = new Buzon();
    buzon.parse(data);

    buzon = await buzon.save();


    return buzon;

};

BuzonRepository.prototype.get = async function (data) {
    return await Buzon.findOne(data).populate('solicitudes').populate('tratamientos');
};

BuzonRepository.prototype.addSolicitud = async function (data) {
    var self = this;
    var buzon = self.get(data.buzon);
    
    buzon.solicitudes.push(data.solicitud);

    buzon = await buzon.save();

    return buzon.populate('solicitudes').populate('tratamientos');;
    
    
};


BuzonRepository.prototype.addTratamientos = async function (data) {
    return await Buzon.findOne(data).populate('solicitudes').populate('tratamientos');
};

BuzonRepository.prototype.dropSolicitud = async function (data) {
    return await Buzon.findOne(data).populate('solicitudes').populate('tratamientos');
};


BuzonRepository.prototype.dropTratamientos = async function (data) {
    return await Buzon.findOne(data).populate('solicitudes').populate('tratamientos');
};



BuzonRepository.prototype.getAll= async function() {
    var buzons = await Buzon.find({});
    return buzons;
}

module.exports= new BuzonRepository();
