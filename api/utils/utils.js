//utils
"use strict";
const utils = {

    isString : (str) => { return typeof str === 'string'},
    isNumber : (no) => { return typeof no === 'Number'},
    size     : (obj) => { return Object.keys(obj).length;}

}

module.exports = utils;