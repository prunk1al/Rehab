const appconfig = require('../config/env');;
const config = appconfig;

var cache = {};
if (config.cache) {
    const Cache = require('../db/Cache');
    cache = new Cache();
}

const Paciente = require('../Model/Sesion');

function GestorSesion= new Object();


GestorSesion.prototype.create = async function (data) {
    var self = this;

    var paciente = await GestorPaciente.getData(data.paciente);

    if (!paciente) {
        throw (Error("El paciente no existe"));
    }

    var solicitud = await GestorPaciente.getData(data.solicitud);

    if (!solicitud) {
        throw (Error("La solicitud no existe"));
    }

    delete data.paciente;
    delete data.solicitud;

    var doc = await Solicitud.findOne(data);
    if (!doc) {
        var solicitud = self.parse(data);
        solicitud.paciente = paciente.id;
        solicitud.fecha = Date.now();
        doc = await solicitud.save();


    }

    //doc.populate('paciente');
    console.log(doc);

    return doc;

}

GestorSesion.prototype.getFromDb = async function (data) {
    return await Sesion.find(data);

};