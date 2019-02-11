var   redis     = require('redis');
var bluebird = require("bluebird");
bluebird.promisifyAll(redis);

module.exports = Cache;
function Cache(){
    var self=this;
    

     /* Values are hard-coded for this example, it's usually best to bring these in via file or environment variable for production */
    self.client    = redis.createClient({
        port      : 6379,               // replace with your port
        //host: '192.168.0.178',        // replace with your hostanme or IP address
        host: process.env.IP ,
    });

}

Cache.prototype.set = function(key,value) {
    var self=this;
    self.client.set(key,JSON.stringify(value),'EX',10)
};

Cache.prototype.get = async function(key) {
    var self=this;
    var data = await self.client.getAsync(key);
    data = JSON.parse(data);
    
    return data;
};



