import React, { Component } from "react";

export default class LocationDemo extends Component {
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
        navigator.geolocation.getCurrentPosition(function(position) {
            this.state({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        });
    }
    componentDidMount() {
        this.getLocation();
    }

  render() {
    return (
      <div className="row">{this.state.latitude}</div>
            
            
    );
  }
}