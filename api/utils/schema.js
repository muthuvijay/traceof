//Maintain database schema for mongoDb
"use strict";
const API = require('./ApiUrls');
const Utils = require('./utils');

const saveAPI           = API.URLS.POST.STORE_LOCATION_INFO.toString();
const registerAPI       = API.URLS.POST.REGISTER_USER.toString();
const loginAPI          = API.URLS.POST.LOGIN_USER.toString();

const Schema = {};

Schema[saveAPI] = {
    payload : {
        userid      : "string",
        lat         : "string",
        lang        : "string",
        timestamp   : "string"
    },

    data : {
        status  : "string"
    }
}


//register API
Schema[registerAPI] = {
    payload: {
        userEmail   : "string",
        userName    : "string",
        userPass    : "string"
    }
}

//Login API
Schema[loginAPI] = {
    payload: {
        userEmail   : "string",
        userPass    : "string"
    }
}


Schema.check = (contract, payload) => {
    let _promise = (resolve, reject) => {

        //Size shoudl be equal
        if(Utils.size(contract) !== Utils.size(payload)){
            return reject('Schema size doesnot match');
        }

        if(Utils.size(contract) > 0){
            for(let key in contract){
                if(Object.keys(payload).indexOf(key) === -1){
                    return reject('Key in contract doesnt match the payload');
                }

                if(contract[key] === "string" && !Utils.isString(payload[key])){
                    return reject('Type Mismatch for '+ key+ ' Expected: '+contract[key]+' but provided: '+ typeof payload[key]);
                }
            }

        }else{
            return reject('Not a valid size');
        }

        return resolve();
    }
    
    return new Promise(_promise);

}

module.exports = Schema;