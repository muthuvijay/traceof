/**
 * User Login
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  Dimensions,
  View
} from 'react-native';


export default class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email : 'muthuvijay@gmail.com',
        pass  : '8746'
      }

  }

  onLogin() {
    //Login functionality    
    console.warn(this.state.email);
  }

  onTextChange(type, text){
    this.setState({type: text});
    // console.warn(this.state.email);
  }


  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title_text}>User Login</Text>
          <TextInput 
            style={styles.input}
            placeholder="Email Address"
            onChangeText = {(text) => {this.onTextChange('email', text)}}
            value={this.state.email}
          />
          <TextInput 
            style={styles.input}
            placeholder="Password"
            onChangeText = {(text) => {this.onTextChange('pass', text)}}
            value={this.state.pass}
          />
          <Button
            title="Login here"
            style={styles.submit_button}
            onPress={this.onLogin.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems : "center",
    flexDirection : "column",
    justifyContent : "center",
  },
  input: {
    width: 300,
    height: 50
  },
  submit_button:{
    marginTop: 200
  },
  title_text:{
    fontSize: 20
  }
});

module.exports = Login;
