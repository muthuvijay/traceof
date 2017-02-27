//MongoDb connection setup
let MongoClient = require('mongodb').MongoClient;
let config = require('./config');

class Database {
    
    constructor(){
        this.conn = null;
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
                this.conn = db;
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

    static insert(collection,payload){
        // console.log(this.conn);
        return new Promise((resolve, reject) => {
            this.conn.collection(collection).insert(payload, (err, result) => {
                if(err) {
                    console.log(err);
                    return reject(err);
                }

                console.log('Inserted '+JSON.stringify(payload)+' to '+collection+' database');

                return resolve(result);
            },
            (err) => {
                return reject(err);
            });
        });
    }
}

module.exports = Database;