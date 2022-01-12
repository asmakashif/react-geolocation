import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import {GOOGLE_API_KEY} from './config';

const GOOGLE_API_KEY = `AIzaSyBOlxbM2_cHw9F2LtlBPHEv6ZccvjNdS14`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
  }

  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
    }else{
      alert("Geolocation is not supported by this browser");
    }
  }

  getCoordinates(position){
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.reverseGeocodeCoordinates();
  }

  reverseGeocodeCoordinates(){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=${'AIzaSyBOlxbM2_cHw9F2LtlBPHEv6ZccvjNdS14'}`)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => this.setState({
      userAddress: data.results[0].formatted_address
      // userAddress: data.results[0].address_components[2].long_name
    }))
    .catch(error => alert(error))
  }

  componentDidMount() {
    this.reverseGeocodeCoordinates();
  }

  handleLocationError(error){
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert(  "User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert(  "Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert( "The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert(  "An unknown error occurred.")
        break;
        default:
        alert(  "An unknown error occurred.")
    }
  }

  render(){
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h2>React Geolocation Example</h2>
        <button onClick={this.getLocation}>Get Coordinates</button>
        <h4>HTML5 Coordinates</h4>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <h4>Reverse Geocoding</h4>
        <p>Address: {this.state.userAddress}</p>
        {
          this.state.latitude && this.state.longitude ?
          <img src={`https://maps.googleapis.com/maps/api/staticmap?center=
          ${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&key=${GOOGLE_API_KEY}`} alt="" />
          :
          null
        }
      </div>
    );
  }
}

export default App;
