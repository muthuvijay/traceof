//HTTP for API calls

import React, { Component } from 'react';
import {
  fetch
} from 'react-native';

import API from './url';


export default class HTTP extends Component{

    constructor(){}

    get(){
        return fetch(API.LOGIN)

    }

    post(url,params){
        return fetch(API.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        })
    }



}