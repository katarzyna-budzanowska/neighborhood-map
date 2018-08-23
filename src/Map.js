import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

/*
  Handles map presentation
*/
class Map extends Component {

  constructor(props) {
    super(props);
  // Don't call this.setState() here!
    this.state = { authStatus: true, mapLoaded: true };

    // bind global function to this
    window.gm_authFailure = this.authFailure;

  }

    authFailure = () => {
      this.setState( { authStatus: false } );
    }
  /*
    Render parks markers.
  */
  renderParks = (map, maps) => {
    if (!this.props.places.parks) {
      return;
    }

    const markers = {};
    for (var key in this.props.places.parks) {
      const parks = this.props.places.parks[key];
      markers[key] = new maps.Marker({position: parks.location, map, title: parks.name})
    }
    return markers;
  }

  /*
    Render restaurants markers.
  */
  renderRestaurants = (map, maps) => {
    if (!this.props.places.restaurants) {
      return;
    }
    const markers = {};
    for (var key in this.props.places.restaurants) {
      const restaurant = this.props.places.restaurants[key];
      markers[key] = new maps.Marker({position: restaurant.location, map, title: restaurant.name})
    }
    return markers;
  }

  /*
    Render monuments markers.
  */
  renderMonuments = (map, maps) => {
    if (!this.props.places.monuments) {
      return;
    }
    const markers = {};
    for (var key in this.props.places.monuments) {
      const monument = this.props.places.monuments[key];
      markers[key] = new maps.Marker({position: monument.location, map, title: monument.name})
    }
    return markers;
  }

  /*
    Marker on map was clicked.
  */
  markerClicked = (type, id) => () => {
    this.props.markerClicked(type, id);
  }

  /*
    Support mouse interactions
  */
  addClicEventsToMarkers = (markers, maps) => {
    for (var type in markers) {
      for (var id in markers[type]) {
        maps.event.addListener(markers[type][id], "click", this.markerClicked(type, id));
      }
    }
  }

  /*
    Put markers on map
  */
  renderMarkers = (map, maps) => {
    const markers = {};
    markers.parks = this.renderParks(map, maps);
    markers.monuments = this.renderMonuments(map, maps);
    markers.restaurants = this.renderRestaurants(map, maps);
    this.addClicEventsToMarkers(markers, maps);
    this.props.getMapData(markers, map, maps);
  }

  /*
    Check if map was correctly loaded, set error state so rest of application can display status information.
  */
  mapLoaded = ({map, maps}) => {
    if( map === null || maps === null ) {
      this.setState({ mapLoaded: false })
      return
    }
    this.renderMarkers(map, maps);
  }

  render() {
    const {center, zoom, drawerOpened} = this.props;
    const _class = drawerOpened
      ? 'App-map-small'
      : 'App-map';

    const { authStatus, mapLoaded } = this.state;
    const showMap = authStatus && mapLoaded;
    return (
    // Important! Always set the container height explicitly
    <div className={_class} role="application">
      { ! authStatus &&
        <div>
          Google maps authentication failed. Please check if key is correct or generate a new one in Google API admin panel and reload the page.
        </div> }
      { ! mapLoaded &&
        <div>
          Google maps where not loaded. This maybe caused by connection issues or Google Maps service is down. Please try again later.
        </div>
      }
      { showMap && <GoogleMapReact bootstrapURLKeys={{
          key: 'AIzaSyC9TGshWjOkzBKIVk00Ud6VVHb_Ffkrm3I'
        }} defaultCenter={center} defaultZoom={zoom} yesIWantToUseGoogleMapApiInternals={true} onGoogleApiLoaded={this.mapLoaded}></GoogleMapReact> }
    </div>);
  }
}

export default Map;
