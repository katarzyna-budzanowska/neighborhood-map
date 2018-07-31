import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <Map
          center={{
            lat: 51.108017,
            lng: 17.038506
          }}
          zoom={10}
        />
      </div>
    );
  }
}

export default App;
