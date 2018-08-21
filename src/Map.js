import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {

  renderParks = ( map, maps ) => {
    if( !this.props.places.parks ) {
      return;
    }

    const markers = {};
    for ( var key in this.props.places.parks ) {
      const parks = this.props.places.parks[key];
      markers[key] = new maps.Marker({
        position: parks.location,
        map,
        title: parks.name
      })
    }
    return markers;
  }

  markerClicked = ( event ) => {
    console.log( event );
  }

  renderRestaurants = ( map, maps ) => {
    if( !this.props.places.restaurants ) {
      return;
    }
    const markers = {};
    for ( var key in this.props.places.restaurants ) {
      const restaurant = this.props.places.restaurants[key];
      markers[key] = new maps.Marker({
        position: restaurant.location,
        map,
        title: restaurant.name
      })
    }
    return markers;
  }

  renderMonuments = ( map, maps ) => {
    if( !this.props.places.monuments ) {
      return;
    }
    const markers = {};
    for ( var key in this.props.places.monuments ) {
      const monument = this.props.places.monuments[key];
      markers[key] = new maps.Marker({
        position: monument.location,
        map,
        title: monument.name
      })
    }
    return markers;
  }

  markerClicked = ( type, id ) => ( ) => {
    this.props.markerClicked( type, id );
  }

  addClicEventsToMarkers = ( markers, maps ) => {
    for( var type in markers ) {
      for( var id in markers[type] ) {
        maps.event.addListener(
            markers[type][id],
            "click",
            this.markerClicked(type, id)
        );
      }
    }
  }

  renderMarkers = ( map, maps ) => {
    const markers = {};
    markers.parks = this.renderParks( map, maps );
    markers.monuments = this.renderMonuments( map, maps );
    markers.restaurants = this.renderRestaurants( map, maps );
    this.addClicEventsToMarkers( markers, maps );
    this.props.getMapData(markers, map, maps);
  }

  render() {
    const {center, zoom, drawerOpened} = this.props;
    const _class = drawerOpened ? 'App-map-small' : 'App-map';
    return (
      // Important! Always set the container height explicitly
      <div className={_class} tabIndex="-1">
        <GoogleMapReact
          tabIndex="-1"
          bootstrapURLKeys={{ key: 'AIzaSyC9TGshWjOkzBKIVk00Ud6VVHb_Ffkrm3I' }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
