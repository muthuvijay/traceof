//MongoDb connection setup
let MongoClient = require('mongodb').MongoClient;
let config = require('./config');

class Database {
    
    constructor(){
        // this.conn = null;
        // this.connectDB();
    }

    static connectDB(){
        //we use MongoDb
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.mongoDBurl, (err, db) => {
                if(err){
                    console.log("MongoDb Error: "+ err);
                    return reject(err);
                }

                return resolve(db);
            });
        });
    }

   /* getConnection(){
        return this.conn || this.connectDB().then((connectionHandler)=>{
            this.conn = connectionHandler;
            // return this.conn;
        });
    }*/
}

module.exports = Database;