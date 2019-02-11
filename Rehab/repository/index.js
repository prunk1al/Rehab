
const config = require("../config/env")
var directory;
switch (config.dbType) {
    case 'mongo':
        directory="../MongoRepository/"
        break;
    
    default:
        // code
}
var repository = {};


var normalizedPath = require("path").join(__dirname, directory ); 
require("fs").readdirSync(normalizedPath).forEach(function(file) { 
    var instance =  require(directory + file); 
    repository[instance.constructor.name] = instance;
});


module.exports=repository;
