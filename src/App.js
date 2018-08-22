import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css'
import Map from './Map';
import Menu from './Menu';
import locations from './locations.json';
import LocationsInformation from './LocationsInformation';

class App extends Component {
  state = {
    locations: locations, // hardcoded locations
    selectedLocations: locations, // subset of currently selected locations
    singleSelected: false, // is one location selected
    selection: null, // which location is selected
    locationType: '', // type of locations from the locations type selector
    location: null, // selected location with map id, used for panning
    markers: {}, // markers on map
    map: null, // map handler
    maps: null, // maps api
    drawer: false, // is drawer (location information panel) opened
  };

  /*
    Hide all markers on map.
  */
  clearAllMarkers = () => {
    for (var key in this.state.markers) {
      for (var location in this.state.markers[key]) {
        this.state.markers[key][location].setMap(null);
      }
    }
  }

  /*
    Show all markers on map.
  */
  showAllMarkers = () => {
    for (var key in this.state.markers) {
      for (var location in this.state.markers[key]) {
        this.state.markers[key][location].setMap(this.state.map);
      }
    }
  }

  /*
    Show single marker on map
  */
  showMarker = (marker) => {
    marker.setMap(this.state.map);
  }

  /*
    Animate marker on map
    This improves visual indication
  */
  dropMarker = (marker) => {
    marker.setAnimation(this.state.maps.Animation.BOUNCE)
  }

  /*
    Show set of showMarkers on map
  */
  showMarkers = (markers) => {
    for (var marker in markers) {
      this.showMarker(markers[marker]);
    }
  }

  /*
    Which type of locations are selected
  */
  setSelected = (_locations) => {
    this.setState({
      selectedLocations: {
        [_locations]: this.state.locations[_locations]
      }
    });
  }

  /*
    Set all locations type as selected, reset locations selector state.
  */
  setAllLocations = () => {
    this.setState({selectedLocations: locations});
  }

  /*
    Make locations type selection empty - used when single location is selected.
  */
  setNoLocations = () => {
    this.setState({selectedLocations: {}});
  }

  /*
    Locations selection type selection was changed
  */
  handleChange = (_locations) => {
    this.clearAllMarkers();
    this.toggleDrawer(false)();
    this.setState({singleSelected: false, locationType: _locations})
    if (_locations === '') {
      this.showAllMarkers();
      this.setAllLocations();
    } else if (_locations === 'none') {
      this.setNoLocations();
    } else {
      this.showMarkers(this.state.markers[_locations]);
      this.setSelected(_locations);
    }
  }

  /*
    Open/close location information panel ( used with mose actions )
  */
  toggleDrawer = (state) => () => {
    this.setState({drawer: state});
    setTimeout(() => {
      this.state.maps.event.trigger(this.state.map, 'resize');
    }, 1000);
  };

  /*
    Open/close location information panel ( used with keyboard actions )
  */
  toggleDrawerKey = (state) => (event) => {

    if (event.key !== 'Enter' && event.key !== 'Escape') {
      return;
    }

    this.setState({drawer: state});
    setTimeout(() => {
      this.state.maps.event.trigger(this.state.map, 'resize');
    }, 1000);
  };

  /*
    Pan map to selected location. This centers map on single selected location.
  */
  panMapToLocation = (location) => {
    const latLng = new this.state.maps.LatLng(location.location.lat, location.location.lng);
    this.state.map.panTo(latLng);
  }

  /*
    Single location was selected.
  */
  handleSingeSelect = selection => {
    this.clearAllMarkers();
    const id = selection.id;
    const type = selection.type;
    const marker = this.state.markers[type][id];
    this.showMarker(marker);
    this.dropMarker(marker);
    const location = locations[type][id];
    this.setState({location, singleSelected: true, locationType: 'none', selection});
    this.toggleDrawer(true)();
    this.panMapToLocation(location);
  };

  /*
    Marker on map was clicked
  */
  markerClicked = (type, id) => {
    this.handleSingeSelect({type, id});
  }

  /*
    Save map information: handler, api, markers.
  */
  getMapData = (markers, map, maps) => {
    this.setState({markers, map, maps});
  }

  render() {
    return (<div className="App">
      <CssBaseline/>
      <header className="App-header">
        <h1 className="App-title">Neighborhood Map ( powered by Flickr )</h1>
      </header>
      <div className="App-body">
        <Menu className="App-menu" locationType={this.state.locationType} selectType={this.handleChange} selection={this.state.selection} singleSelected={this.state.singleSelected} singleSelect={this.handleSingeSelect} places={this.state.selectedLocations} selected={this.state.selectedLocations}/>
        <Map center={{
            lat: 51.108017,
            lng: 17.038506
          }} zoom={13} places={locations} getMapData={this.getMapData} drawerOpened={this.state.drawer} markerClicked={this.markerClicked} tabIndex="-1"/>
        <LocationsInformation opened={this.state.drawer} toggleDrawer={this.toggleDrawer} toggleDrawerKey={this.toggleDrawerKey} location={this.state.location}/>
      </div>
    </div>);
  }
}

export default App;
