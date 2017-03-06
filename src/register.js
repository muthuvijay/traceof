/**
 * User registration
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

const { width, height } = Dimensions.get('window');


export default class Registration extends Component {

  constructor(props) {
        super(props);  
  }

  componentWillMount() {
        
        
    }


  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title_text}>User Registration</Text>
          <TextInput 
            style={styles.input}
            placeholder="Email Address"
          />
          <TextInput 
            style={styles.input}
            placeholder="Username"
          />
          <Button
            title="Submit"
            style={styles.submit_button} />
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
    height: 100
  },
  submit_button:{
    marginTop: 200
  },
  title_text:{
    fontSize: 20
  }
});

module.exports = Registration;
