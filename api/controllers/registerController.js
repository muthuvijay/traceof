//Register controller
const Router = require('../utils/router');
const Config = require('../utils/config');

class RegisterController{
    constructor(){
        this.password = null;
        this.db = Router.getDatabase();
    }

    createPassword(){
        return Math.ceil(Math.random() * 10000).toString();
    }

    isValidUser(){
        if(this.db){
            return new Promise((resolve, reject) => {
                this.db.queryOne(Config.Collection.USER, {userEmail:this.props.userEmail}).then((data) => {
                    if(data){
                        resolve(true);
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
            this.isValidUser().then((value) => {
                if(value === true){
                    reject('User already exists!');
                }else{
                    this.props.userPass = this.createPassword();
                    resolve(this.props);
                }
                
            });
        }
        
        return new Promise(_p);
    }
}

module.exports = new RegisterController;