"use strict";
//MongoDb connection setup
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

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

    static queryOne(collection, dataToFind){
        return new Promise((resolve, reject) => {
            this.conn.collection(collection).findOne(dataToFind).then((data) => {
                resolve(data && data._id ? data : null);
            },
            (err) => {
                reject(err);
            });
            
        });
    }

    static query(collection, dataToFind){
        return new Promise((resolve, reject) => {
            let cursor = this.conn.collection(collection).find(dataToFind);
            let data = [];
            cursor.each((err, rec) =>{
                data.push(rec);
            })
            resolve(data);
            
        });
    }
}

module.exports = Database;