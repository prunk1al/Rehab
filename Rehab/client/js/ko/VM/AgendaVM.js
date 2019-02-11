function AgendaVM() {
	var self = this;

	self.nuevoAgenda=ko.observable();
	self.agendas=ko.observableArray();
	self.profesionales = ko.observableArray();

	self.init();
}

AgendaVM.prototype.getAll = function(){
	var self=this;
	$.get('/Agenda/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Agenda();
				t.map(response[i]);
				self.agendas.push(t)
				//t=null;
			}
		})
}

AgendaVM.prototype.init = function(){
	var self=this;
	self.getAll();
	self.getAllProfesionales();
}

AgendaVM.prototype.showModal=function(){
	var self=this;

	var t=new Agenda()
	self.nuevoAgenda(t);

	$("#modal").modal('show');
}

AgendaVM.prototype.getAllProfesionales=function(){
	var self=this;
	$.get('/Personal/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Personal();
				t.map(response[i]);
				self.profesionales.push(t)
			}
		})
}


ko.applyBindings( new AgendaVM());




