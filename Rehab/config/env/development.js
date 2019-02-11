
const con={
    env: 'development',
    dbType: 'mongo',
    //dbLocation: 'mongodb://' + process.env.IP + ':27017/myproject',
    dbLocation: 'mongodb://192.168.0.178:27017/myproject',
    dbName: 'myproject',
    cache: 'redis',
    cacheLocation: {
                    port: 6379,               // replace with your port
                    host: '192.168.0.178',        // replace with your hostanme or IP address
                    // host: process.env.IP,
                    }
};

module.exports=con