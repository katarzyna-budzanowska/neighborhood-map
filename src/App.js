import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css'
import Map from './Map';
import Menu from './Menu';
import locations from './locations.json';
import LocationsInformation from './LocationsInformation';

class App extends Component {
  state = {
    locations: locations,
    selectedLocations: locations,
    singleSelected: false,
    selection: {},
    locationType: '',
    location: null,
    markers: {},
    map: null,
    maps: null,
    drawer: false,
  };

  clearAllMarkers = () => {
    for( var key in this.state.markers ) {
      for( var location in this.state.markers[key] ) {
        this.state.markers[key][location].setMap(null);
      }
    }
  }

  showAllMarkers = () => {
    for( var key in this.state.markers ) {
      for( var location in this.state.markers[key] ) {
        this.state.markers[key][location].setMap(this.state.map);
      }
    }
  }

  showMarker = ( marker ) => {
    marker.setMap(this.state.map);
  }

  dropMarker = ( marker ) => {
    marker.setAnimation(this.state.maps.Animation.BOUNCE)
  }

  showMarkers = ( markers ) => {
    for( var marker in markers ){
      this.showMarker( markers[marker] );
    }
  }

  setSelected = ( _locations ) => {
    this.setState({selectedLocations: {[_locations]: this.state.locations[_locations]}});
  }

  setAllLocations = () => {
    this.setState({selectedLocations: locations});
  }

  setNoLocations = () => {
    this.setState({selectedLocations: {}});
  }

  handleChange = ( _locations ) => {
    this.clearAllMarkers();
    this.toggleDrawer(false)();
    this.setState({singleSelected:false, locationType: _locations})
    if( _locations === '' ){
      this.showAllMarkers();
      this.setAllLocations();
    } else if ( _locations === 'none') {
      this.setNoLocations();
    }
    else {
      this.showMarkers( this.state.markers[_locations] );
      this.setSelected( _locations );
    }
  }

  toggleDrawer = ( state ) => () => {
    this.setState({
      drawer: state,
    });
    setTimeout(() => {
      this.state.maps.event.trigger(this.state.map,'resize');
    }, 1000);
  };

  toggleDrawerKey = ( state ) => ( event ) => {

    if(event.key !== 'Enter' && event.key !== 'Escape'){
      return;
    }

    this.setState({
      drawer: state,
    });
    setTimeout(() => {
      this.state.maps.event.trigger(this.state.map,'resize');
    }, 1000);
  };

  panMapToLocation = ( location ) => {
    const latLng = new this.state.maps.LatLng(location.location.lat, location.location.lng);
    this.state.map.panTo(latLng);
  }

  handleSingeSelect = selection => {
    this.clearAllMarkers();
    const id = selection.id;
    const type = selection.type;
    const marker = this.state.markers[type][id];
    this.showMarker(marker);
    this.dropMarker(marker);
    const location = locations[type][id];
    this.setState({
      location,
      singleSelected:true,
      locationType: 'none',
      selection });
    this.toggleDrawer(true)();
    this.panMapToLocation(location);
  };

  markerClicked = ( type, id ) => {
    this.handleSingeSelect( {type, id} );
  }

  getMapData = ( markers, map, maps ) => {
    this.setState({ markers, map, maps });
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <div className="App-body">
          <Menu
            className="App-menu"
            locationType={this.state.locationType}
            selectType={this.handleChange}
            selection={this.state.selection}
            singleSelected={this.state.singleSelected}
            singleSelect={ this.handleSingeSelect }
            places = { this.state.selectedLocations }
            selected = { this.state.selectedLocations }
          />
          <Map
            center={{
              lat: 51.108017,
              lng: 17.038506
            }}
            zoom={13}
            places={ locations }
            getMapData={ this.getMapData }
            drawerOpened={this.state.drawer}
            markerClicked={this.markerClicked}
            tabIndex="-1"
          />
          <LocationsInformation
            opened={this.state.drawer}
            toggleDrawer={this.toggleDrawer}
            toggleDrawerKey={this.toggleDrawerKey}
            location={this.state.location}
          />
        </div>
      </div>
    );
  }
}

export default App;
