import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css'
import Map from './Map';
import Menu from './Menu';
import locations from './locations.json';

class App extends Component {
  state = {
    locations: locations,
    selectedLocations: locations,
    markers: {},
    map: null,
    maps: null,
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

  showMarkers = ( markers ) => {
    for( var marker in markers ){
      this.showMarker( markers[marker] );
    }
  }

  handleChange = locations => {
    this.clearAllMarkers();
    if( locations === '' ){
      this.showAllMarkers();
    } else {
      this.showMarkers( this.state.markers[locations] );
    }
  };

  handleSingeSelect = selection => {
    this.clearAllMarkers();
    const id = selection.id;
    const type = selection.type;
    const marker = this.state.markers[type][id];
    this.showMarker(marker);
  };

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
            onChange={ this.handleChange }
            singleSelect={ this.handleSingeSelect }
            places = { locations }
            selected = { this.state.selectedLocations }
          />
          <Map
            center={{
              lat: 51.108017,
              lng: 17.038506
            }}
            zoom={13}
            places = { locations }
            getMapData = { this.getMapData }
          />
        </div>
      </div>
    );
  }
}

export default App;
