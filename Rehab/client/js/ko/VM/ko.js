var events = [
                {
                    title: 'MyEvent1',
                    start: new moment().add(2, 'days'),
                    description: 'This is a cool event',
                    color: '#5f6dd0'
                },
                {
                    title: 'MyEvent2',
                    start: new moment().add(1, 'days'),
                    description: 'This is a cool event',
                    color: '#af6dd0'
                }
            ];
            
            

var Event = function(){
    var self=this;
    self.title=ko.observable();
    self.start=ko.observable();
    self.end=ko.observable();
    self.description=ko.observable();

    self.startMoment=ko.computed(function(){
        if(self.start())
            return self.start().format("DD/MM/YYYY hh:mm:ss ");
    });
    self.endMoment=ko.computed(function(){
        if(self.end())
            return self.end().format("DD/MM/YYYY hh:mm:ss ");
    });


    self.overlap=false;
}


Event.prototype.map=function(data){
    var self=this
    for(var key of Object.keys(self)){
        if(key in data){
            self[key](data[key])
        }
    }
}

Event.prototype.save=function(){
    var self=this;


    var event = JSON.parse(ko.toJSON(self))
    console.log(event)
    $('#fisio1').fullCalendar('renderEvent',event)
}


function ViewModel(){
    var self=this;
    self.eventModal=ko.observable(new Event());

    //self.eventArray=ko.observableArray();
    self.buzones = ko.observableArray();
    self.buzon = ko.observable();


    

    var getBuzones = function(){
        $.get('/Buzon/getAll')
		.done(function(response){
			for(var i in response){
				var t = new Buzon();
				t.map(response[i]);
				self.buzones.push(t)
			}
		})
    }
    
    ko.computed(function(){
        if(self.buzon()){
            self.buzon().getByID();
        }
    })


    var init = function(){
        /*for(var i in events){
            var e=new Event();
            e.map(events[i]);
            self.eventArray.push(e);
        }
        */
        getBuzones()
        initCalendar();
    }
    
    var initCalendar = function(){

        $('#fisio1').fullCalendar({
                // put your options and callbacks here
                themeSystem: 'bootstrap3',
                defaultView: 'agendaWeek',
                weekends: false, // will hide Saturdays and Sundays
                firstDay:1, 
                allDaySlot: false,
                slotLabelFormat: 'HH:mm',
                slotDuration:'00:20:00',
                minTime:'08:00:00',
                maxTime:'24:00:00',
                name: 'fisio 1',

                droppable: true,
                 drop: function( date, jsEvent, ui, resourceId ) {
                    console.log("Dropped on " + date.format());
                  },

                eventSources: [
                    {

                        events: events,
                    }
                    
                ],

                eventReceive : function(event){
                    console.log(event);
                },

                eventClick:function( event, jsEvent, view ) {
                    console.log(event); 
                },
                dayClick: function (date, jsEvent, view) {
                    
                    var x = new moment(date.format());
                    var y = new moment(date.add(20,'m').format());
                    self.eventModal().start(x);

                    self.eventModal().end(y)
                   
                    $("#modal").modal('show');
                   
                }

            })


                
    }

    init();

}

ko.bindingHandlers.draggable = {
   init: function(element) {
       $(element).draggable({
          revert: true,      // immediately snap back to original position
          revertDuration: 0  //
        });
   }
};

var viewModel=new ViewModel();

ko.applyBindings( viewModel );






