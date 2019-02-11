const Tratamiento = function () {
    var self = this;
    self._id = ko.observable();
    self.codigo = ko.observable();
    self.nombre = ko.observable();
    self.duracion = ko.observable();
}

Tratamiento.prototype.map=function(data){
	var self=this
	for(var key of Object.keys(self)){
		if(key in data){
			self[key](data[key])
		}
	}
}

Tratamiento.prototype.add = function(){
	var self=this;

	$.ajax({
            url: '/Tratamiento/new',
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


