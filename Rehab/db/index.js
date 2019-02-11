const config = require("../config/env")
var db;
switch (config.dbType) {
    case 'mongo':
        db=require("./mongo")
        break;
    
    default:
        // code
}

module.exports=db;