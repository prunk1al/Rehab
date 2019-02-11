function BuzonVM() {
	var self = this;

	self.nuevoBuzon=ko.observable();
	self.buzones=ko.observableArray();
	self.pacientes = ko.observableArray() //pendiente de pasar al modal vinculado por tratamiento

	self.init();
}

BuzonVM.prototype.getAll = function(){
	var self=this;
	$.get('/Buzon/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Buzon();
				t.map(response[i]);
				self.buzones.push(t)
				//t=null;
			}
		})
}

BuzonVM.prototype.init = function(){
	var self=this;
	self.getAll();
	self.getAllPacientes()
}

BuzonVM.prototype.showModal=function(){
	var self=this;

	var t=new Buzon()
	self.nuevoBuzon(t);

	$("#modal").modal('show');
}

BuzonVM.prototype.getAllPacientes=function(){
	var self=this;
	$.get('/Paciente/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Paciente();
				t.map(response[i]);
				self.pacientes.push(t)
			}
		})
}

ko.applyBindings( new BuzonVM());




