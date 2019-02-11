const Agenda = function () {
    var self = this;
    self._id = ko.observable();
    self.nombre = ko.observable();
    self.id = ko.observable();
    self.personal = ko.observableArray();
}

Agenda.prototype.map=function(data){
	var self=this
	for(var key of Object.keys(self)){
		if(key in data){
			self[key](data[key])
		}
	}
}

Agenda.prototype.add = function(){
	var self=this;

	$.ajax({
            url: '/Agenda/new',
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

Agenda.prototype.get = function(){
	var self=this;

	$.ajax({
            url: '/Agenda/get',
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


