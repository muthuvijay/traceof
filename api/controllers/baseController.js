//Base Controller
"use strict";
class BaseController{

    constructor(props){
        this.props = props;
    }

    exec(){
        throw "Implement this in the controller"
    }
}

module.exports =  BaseController;