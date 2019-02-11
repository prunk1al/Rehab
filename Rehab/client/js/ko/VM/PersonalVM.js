function PersonalVM() {
	var self = this;

	self.nuevoPersonal=ko.observable();
	self.personales=ko.observableArray();

	self.init();
}

PersonalVM.prototype.getAll = function(){
	var self=this;
	$.get('/Personal/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Personal();
				t.map(response[i]);
				self.personales.push(t)
				//t=null;
			}
		})
}

PersonalVM.prototype.init = function(){
	var self=this;
	self.getAll();
}

PersonalVM.prototype.showModal=function(){
	var self=this;

	var t=new Personal()
	self.nuevoPersonal(t);

	$("#modal").modal('show');
}

ko.applyBindings( new PersonalVM());




