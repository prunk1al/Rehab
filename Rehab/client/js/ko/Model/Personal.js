const Personal = function () {
    var self = this;
    self._id = ko.observable();
    self.codpers = ko.observable();
    self.nombre = ko.observable();
    self.apellidos = ko.observable();
    self.id = ko.observable();
}

Personal.prototype.map=function(data){
	var self=this
	for(var key of Object.keys(self)){
		if(key in data){
			self[key](data[key])
		}
	}
}

Personal.prototype.add = function(){
	var self=this;

	$.ajax({
            url: '/Personal/new',
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

Personal.prototype.get = function(){
	var self=this;

	$.ajax({
            url: '/Personal/get',
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


