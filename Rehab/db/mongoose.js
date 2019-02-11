let mongoose = require('mongoose');

const config = require('../config/env');


class Database {
  constructor() {
    this._connect()
  }

_connect() {
     mongoose.connect(config.dbLocation)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
disconnect(){
        mongoose.disconnect();
    }
}

module.exports = new Database()