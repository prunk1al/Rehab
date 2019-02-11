var PersonalRepository = function(){
    var self=this;

}

const Personal = require('../Model/Personal');


PersonalRepository.prototype.parse = function (data) {
    var self = this;
    var personal = new Personal();
    for (var key of Object.keys(data)) {
        if (key in personal) {
            personal[key] = data[key];
        }
    }

    return personal;
}



PersonalRepository.prototype.create = async function (data) {
    var self = this;
    var personal = new Personal();
    personal.parse(data);

    personal = await personal.save();


    return personal;

};

PersonalRepository.prototype.get = async function (data) {
    return await Personal.findOne(data);
};


PersonalRepository.prototype.getAll= async function() {
    var personals = await Personal.find({});
    return personals;
}

module.exports= new PersonalRepository();
