function PacienteVM() {
	var self = this;

	self.nuevoPaciente=ko.observable();
	self.pacientes=ko.observableArray();

	self.init();
}

PacienteVM.prototype.getAll = function(){
	var self=this;
	$.get('/Paciente/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Paciente();
				t.map(response[i]);
				self.pacientes.push(t)
				//t=null;
			}
		})
}

PacienteVM.prototype.init = function(){
	var self=this;
	self.getAll();
}

PacienteVM.prototype.showModal=function(){
	var self=this;

	var t=new Paciente()
	self.nuevoPaciente(t);

	$("#modal").modal('show');
}

ko.applyBindings( new PacienteVM());




