function TratamientoVM() {
	var self = this;

	self.nuevoTratamiento=ko.observable();
	self.tratamientos=ko.observableArray();

	self.init();
}

TratamientoVM.prototype.getAll = function(){
	var self=this;
	$.get('/Tratamiento/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Tratamiento();
				t.map(response[i]);
				self.tratamientos.push(t)
				//t=null;
			}
		})
}

TratamientoVM.prototype.init = function(){
	var self=this;
	self.getAll();
}

TratamientoVM.prototype.showModal=function(){
	var self=this;

	var t=new Tratamiento()
	self.nuevoTratamiento(t);
	//self.tratamientos.push(self.nuevoTratamiento);
	
	$("#modal").modal('show');
}

ko.applyBindings( new TratamientoVM());




