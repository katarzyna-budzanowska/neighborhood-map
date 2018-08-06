import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css'
import Map from './Map';
import Menu from './Menu';
import locations from './locations.json';
import Drawer from '@material-ui/core/Drawer';
import LocationInformation from './LocationInformation';

class App extends Component {
  state = {
    locations: locations,
    selectedLocations: locations,
    singleSelected: false,
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

  handleChange = locations => {
    this.clearAllMarkers();
    this.setState({singleSelected:false})
    if( locations === '' ){
      this.showAllMarkers();
    } else {
      this.showMarkers( this.state.markers[locations] );
    }
  };

  toggleDrawer = ( state ) => () => {
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
    this.setState({location, singleSelected:true});
    this.panMapToLocation(location);
    this.toggleDrawer(true)();
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
            places={ locations }
            getMapData={ this.getMapData }
            drawerOpened={this.state.drawer}
          />
          <Drawer
            variant="persistent"
            anchor="right"
            open={this.state.drawer}
            onClose={this.toggleDrawer(false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
              >
                <div style={{ width: '25vw' }}>
                  { this.state.singleSelected &&
                    <LocationInformation tags={this.state.location.tags}/>
                  }
                </div>
              </div>
            </Drawer>
        </div>
      </div>
    );
  }
}

export default App;
