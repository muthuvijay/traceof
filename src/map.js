/**
 * Map tracker
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';

import MapView from 'react-native-maps';
import flagImg from '../assets/flag-blue.png';

// import Geolocation, { getState } from './Geolocation';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUTE_DELTA = 0.018;
const LONGITUTE_DELTA = LATITUTE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const LATITUTE = 122.567;
const LONGITUTE = -34.45;


export default class MapTracker extends Component {
  
  //getInitialProps(){

    //   this.watchID = navigator.geolocation.watchPosition((position) => {
    //    console.log(position);
    //    let region = {
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude,
    //           latitudeDelta: this.LATITUTE_DELTA,
    //           longitudeDelta: this.LONGITUTE_DELTA,
    //         }
    //   this.setState({currentRegion: region});

    // })
    // }
  //}
  constructor(props) {
        super(props);  
        this.watchId = null;
        this.state = {
            currentRegion : {
                latitude: LATITUTE,
                longitude: LONGITUTE,
                latitudeDelta: LATITUTE_DELTA,
                longitudeDelta: LONGITUTE_DELTA
            },
            coordinates : {
              latitude: LATITUTE,
              longitude: LONGITUTE
            }
        }

    }

    componentWillMount() {
        
        let location = navigator.geolocation;

        if(!!location){
            location.getCurrentPosition(
                (position)=>{
                    console.log(JSON.stringify(position));
                    let region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUTE_DELTA,
                        longitudeDelta: LONGITUTE_DELTA
                    }
                    console.log("vijay region" + JSON.stringify(region));
                    this.setState({currentRegion : region});
                    this.setCoordinates(region.latitude, region.longitude);
                },
                (error) => {
                  console.log("vijay error" + JSON.stringify(error));
                    console.log(error);
                },
                {enableHighAccuracy: false, timeout: 20000}
            );
        }
    }

    setCoordinates(lat,lang){
        this.setState({coordinates:{latitude: lat, longitude: lang}});
    }

  render() {
    return (
      <View style={styles.container}>
          <MapView
              style={styles.map}
              region={this.state.currentRegion}
              loadingEnabled
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
            >
             <MapView.Marker
                coordinate = {this.state.coordinates}
                title="Here you are"
              />
            </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

module.exports = MapTracker;
