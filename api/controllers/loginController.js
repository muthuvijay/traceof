//Login controller
"use strict";
const Router = require('../utils/router');
const Config = require('../utils/config');
const BaseController = require('./baseController');

class LoginController extends BaseController{
    constructor(props){
        super(props);
        this.db = Router.getDatabase();
    }

    isValidUser(){
        if(this.db){
            return new Promise((resolve, reject) => {
                this.db.queryOne(Config.Collection.USER, {userEmail:this.props.userEmail, userPass:this.props.userPass}).then((data) => {
                    if(data){
                        resolve(data);
                    }else{
                        resolve(false);
                    }
                });
            })
            
        }
    }

    //@override
    exec(props){
        
        let _p = (resolve,reject) => {
            this.props = props;
            let obj = {
                proceed : false //I have the values required, dont proceed
            }
            this.isValidUser().then((value) => {
                if(value === false){
                    reject("User not found!");
                }else{
                    obj.data = value;
                    resolve(obj);
                }
                
            });
        }
        
        return new Promise(_p);
    }
}

module.exports = new LoginController;