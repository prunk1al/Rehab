function SolicitudVM() {
	var self = this;
	self.solicitudModal=ko.observable();
	self.solicitudes=ko.observableArray();
	self.tratamientos=ko.observableArray();

	self.init();
}

SolicitudVM.prototype.getAll = function(){
	var self=this;
	$.get('/Solicitud/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Solicitud();
				t.map(response[i]);
				self.solicitudes.push(t)
				//t=null;
			}
		})
}

SolicitudVM.prototype.init = function(){
	var self=this;
	self.getAll();
	self.getAllTratamientos();

}

SolicitudVM.prototype.showModal=function(){
	var self=this;

	var t=new Solicitud()
	self.solicitudModal(t);
	//self.solicituds.push(self.nuevoSolicitud);
	
	$("#modal").modal('show');
}

SolicitudVM.prototype.getAllTratamientos=function(){
	var self=this;
	$.get('/Tratamiento/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Tratamiento();
				t.map(response[i]);
				self.tratamientos.push(t)
			}
		})
}

ko.applyBindings( new SolicitudVM());




