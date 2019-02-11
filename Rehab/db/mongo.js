//function Mongo(){
//    var self=this;
//    self.config = require('../config/env');
//}

//Mongo.prototype.insert = async function (data) {
//    var self = this;
//    var client = await self.getClient()
//    const db = client.db(self.config.dbName);
//    var type = data.constructor.name;

//    let r = await db.collection(type).insertOne(data);
//    client.close();
//};


//Mongo.prototype.get = async function (data) {
//    var self = this;
//    var client = await self.getClient();
//    const db = client.db(self.config.dbName);
//    var type = data.constructor.name;
//    Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
//    let r = await db.collection(type).findOne(data);
//    client.close();
//    return r;
//};



//Mongo.prototype.getClient = async function(){
//   var self=this;
// //   var MongoClient = require('mongodb').MongoClient;
	
//	//const client = new MongoClient(self.config.dbLocation);
// //   await client.connect();
// //   console.log("Connected correctly to server");
	
//    mongoose.connect('mongodb://' + process.env.IP + ':27017/myproject');
//    var db = mongoose.connection;
//    var client = await db.once('open'); 



//    return client;
//    // Insert a single document
    
//}

const mongoose = require("mongoose");
class Mongo {
    constructor() {
        this._connect();
    }
    _connect() {
        //mongoose.connect('mongodb://192.168.0.178:27017/myproject')
        var uri = 'mongodb://' + process.env.IP + ':27017/myproject';
        //mongoose.createConnection(uri, { poolSize: 2 })
        mongoose.connect(uri)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error');
            })
        
        // When the mongodb server goes down, mongoose emits a 'disconnected' event
        mongoose.connection.on('disconnected', () => { console.log('-> lost connection');  mongoose.connect(uri);});
        // The driver tries to automatically reconnect by default, so when the
        // server starts the driver will reconnect and emit a 'reconnect' event.
        mongoose.connection.on('reconnect', () => { console.log('-> reconnected'); });
        
        // Mongoose will also emit a 'connected' event along with 'reconnect'. These
        // events are interchangeable.
        mongoose.connection.on('connected', () => { console.log('-> connected'); })
    
    }
}


module.exports= new Mongo();