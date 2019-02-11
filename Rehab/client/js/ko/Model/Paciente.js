const Paciente = function () {
    var self = this;
    self._id = ko.observable();
    self.nhc = ko.observable();
    self.nasi = ko.observable();
    self.apellidos = ko.observable();
    self.nombre = ko.observable();
    self.solicitudes = ko.observableArray();
}

Paciente.prototype.map=function(data){
	var self=this
	for(var key of Object.keys(self)){
		if(key in data){
			self[key](data[key])
		}
	}
}

Paciente.prototype.add = function(){
	var self=this;

	$.ajax({
            url: '/Paciente/new',
            type: 'POST',
            data: ko.toJSON(self),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                self.map(data);
                $("#modal").modal('hide');
            },
            error: function(data){
                console.log(data);
            }
        });

}

Paciente.prototype.get = function(){
	var self=this;

	$.ajax({
            url: '/Paciente/get',
            type: 'POST',
            data: ko.toJSON(self),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                self.map(data);
            },
            error: function(data){
                console.log(data);
            }
        });

}



