import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Map from './Map';
import Menu from './Menu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <div className="App-body">
          <Menu className="App-menu"/>
          <Map
            center={{
              lat: 51.108017,
              lng: 17.038506
            }}
            zoom={10}
          />
        </div>
      </div>
    );
  }
}

export default App;
