import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCJ_vGAhBQ14GjHXc9h7Q49dhYgDeBA66o' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
