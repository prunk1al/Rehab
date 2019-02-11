const Solicitud = function () {
    var self = this;
    self._id = ko.observable();
    self.duracion = ko.observable();
    self.urgencia = ko.observable();
    self.paciente = ko.observable();
    self.tratamientos=ko.observableArray();
    self.fecha = ko.observable();

}

Solicitud.prototype.map=function(data){
	var self=this
	for(var key of Object.keys(self)){
		if(key in data){
			self[key](data[key])
		}
	}
}

Solicitud.prototype.add = function(){
	var self=this;

	$.ajax({
            url: '/Solicitud/new',
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

