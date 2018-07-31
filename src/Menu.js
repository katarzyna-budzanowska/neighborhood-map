import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

class Menu extends Component {

  render() {
    return (
        <Paper classes={{root: this.props.className}} />
    );
  }
}

export default Menu;
