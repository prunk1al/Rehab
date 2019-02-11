var TratamientoRepository = function(){
    var self=this;

}

const Tratamiento = require('../Model/Tratamiento');


TratamientoRepository.prototype.parse = function (data) {
    var self = this;
    var tratamiento = new Tratamiento();
    for (var key of Object.keys(data)) {
        if (key in tratamiento) {
            tratamiento[key] = data[key];
        }
    }

    return tratamiento;
}



TratamientoRepository.prototype.create = async function (data) {
    var self = this;
    var tratamiento = new Tratamiento();
    tratamiento.parse(data);
   
    tratamiento = await tratamiento.save();
    

    return tratamiento;

};

TratamientoRepository.prototype.get = async function (data) {
    return await Tratamiento.findOne(data);
};


TratamientoRepository.prototype.getAll= async function() {
    var tratamientos = await Tratamiento.find({});
    return tratamientos;
}

module.exports= new TratamientoRepository();
