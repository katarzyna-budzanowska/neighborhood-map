import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {

  renderParks = ( map, maps ) => {
    if( !this.props.places.parks ) {
      return;
    }
    const parksList = Object.values(this.props.places.parks);
    return parksList.map( park => (
      new maps.Marker({
        position: park.location,
        map,
        title: park.name
      })
    ))
  }

  renderRestaurants = ( map, maps ) => {
    if( !this.props.places.restaurants ) {
      return;
    }
    const restaurantsList = Object.values(this.props.places.restaurants);
    return restaurantsList.map( restaurant => (
      new maps.Marker({
        position: restaurant.location,
        map,
        title: restaurant.name
      })
    ))
  }

  renderMonuments = ( map, maps ) => {
    if( !this.props.places.monuments ) {
      return;
    }
    const monumentsList = Object.values(this.props.places.monuments);
    return monumentsList.map( monument => (
        new maps.Marker({
          position: monument.location,
          map,
          title: monument.name
        })
    ))
  }

  renderMarkers = ( map, maps ) => {
    this.renderParks( map, maps );
    this.renderMonuments( map, maps );
    this.renderRestaurants( map, maps );
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC9TGshWjOkzBKIVk00Ud6VVHb_Ffkrm3I' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
