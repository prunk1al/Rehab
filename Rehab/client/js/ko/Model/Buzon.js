const Buzon = function () {
    var self = this;
    self._id = ko.observable();
    self.nombre = ko.observable();
    self.id = ko.observable();
    self.solicitudes = ko.observableArray();
    self.tratamientos = ko.observableArray();
}

Buzon.prototype.map=function(data){
	var self=this
	for(var key of Object.keys(self)){
		if(key in data){
			switch (key) {
		        case 'solicitudes':
		            for(var i in data.solicitudes){
		                var solicitud = new Solicitud();
		                solicitud.map(data.solicitudes[i]);
		                self.solicitudes.push(solicitud);
		            }
		            
		            break;
		        case 'tratamientos':
		            for(var i in data.tratamientos){
		                var tratamiento = new Tratamiento();
		                tratamiento.map(data.tratamientos[i]);
		                self.tratamientos.push(tratamiento);
		            }
		            
		            break;
		        
		        default:
		            self[key](data[key])
		    }
			
			
		}
	}
}

Buzon.prototype.add = function(){
	var self=this;

	$.ajax({
            url: '/Buzon/new',
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

Buzon.prototype.get = function(){
	var self=this;

	$.ajax({
            url: '/Buzon/get',
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


Buzon.prototype.getByID = function(){
	var self=this;

	$.ajax({
            url: '/Buzon/'+self._id(),
            type: 'GET',
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





