const Solicitud = function () {
    var self = this;
    self._id = ko.observable();
    self.duracion = ko.observable();
    self.urgencia = ko.observable();
    self.paciente = new Paciente();
    self.tratamientos=ko.observableArray();
    self.fecha = ko.observable();
    
    
    ko.computed(function(){
        if((self.paciente.nhc() && self.paciente.nhc().length>6 )){
            self.paciente.get();
        }
    })

}

Solicitud.prototype.map=function(data){
	var self=this
	for(var key of Object.keys(self)){
		if(key in data){
		    switch (key) {
		        case 'paciente':
		            self.paciente.map(data[key]);
		            break;
		        
		        default:
		            self[key](data[key])
		    }
			
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
                $("#modal").modal('hide');
                
            },
            error: function(data){
                console.log(data);
            }
        });

}

