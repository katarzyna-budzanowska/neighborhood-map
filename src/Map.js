import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Park from '@material-ui/icons/LocalFloristOutlined';
import Restaurant from '@material-ui/icons/LocalCafeOutlined';
import Monuments from '@material-ui/icons/LandscapeOutlined';

class Map extends Component {

  renderParks = () => {
    if( !this.props.places.parks ) {
      return;
    }
    const parksList = Object.values(this.props.places.parks);
    return parksList.map( park => (
      <Park
          lat={park.location.lat}
          lng={park.location.lng}
      />
    ))
  }

  renderRestaurants = () => {
    if( !this.props.places.restaurants ) {
      return;
    }
    const restaurantsList = Object.values(this.props.places.restaurants);
    return restaurantsList.map( restaurant => (
      <Restaurant
          lat={restaurant.location.lat}
          lng={restaurant.location.lng}
      />
    ))
  }

  renderMonuments = () => {
    if( !this.props.places.monuments ) {
      return;
    }
    const monumentsList = Object.values(this.props.places.monuments);
    return monumentsList.map( monument => (
      <Monuments
          lat={monument.location.lat}
          lng={monument.location.lng}
      />
    ))
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCJ_vGAhBQ14GjHXc9h7Q49dhYgDeBA66o' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          { this.renderParks() }
          { this.renderRestaurants() }
          { this.renderMonuments() }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
