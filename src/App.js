import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Map from './Map';
import Menu from './Menu';
import locations from './locations.json';

class App extends Component {
  state = {
    locations: locations,
    selectedLocations: locations,
  };

  handleChange = _locations => {
    if( _locations === '' ){
      this.setState({ selectedLocations: locations });
    } else {
      this.setState({ selectedLocations: { [_locations]: locations[_locations]} });
    }
  };

  handleSingeSelect = e => {
    console.log( e );
  };

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
            places = { this.state.selectedLocations }
          />
          <Map
            center={{
              lat: 51.108017,
              lng: 17.038506
            }}
            zoom={13}
            places = { this.state.selectedLocations }
          />
        </div>
      </div>
    );
  }
}

export default App;
