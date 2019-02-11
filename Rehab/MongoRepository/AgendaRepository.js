var AgendaRepository = function(){
    var self=this;

}

const Agenda = require('../Model/Agenda');


AgendaRepository.prototype.parse = function (data) {
    var self = this;
    var agenda = new Agenda();
    for (var key of Object.keys(data)) {
        if (key in agenda) {
            agenda[key] = data[key];
        }
    }

    return agenda;
}



AgendaRepository.prototype.create = async function (data) {
    var self = this;
    var agenda = new Agenda();
    agenda.parse(data);

    agenda = await agenda.save();


    return agenda;

};

AgendaRepository.prototype.get = async function (data) {
    return await Agenda.findOne(data).populate('personal');
};


AgendaRepository.prototype.getAll= async function() {
    var agendas = await Agenda.find({}).populate('personal');
    return agendas;
}

module.exports= new AgendaRepository();
