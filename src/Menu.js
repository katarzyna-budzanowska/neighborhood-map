import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Divider from '@material-ui/core/Divider';
import PlaceCard from './PlaceCard';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


/*
  Component responsible for presenting application menu panel.
*/
class Menu extends Component {
  state = {
    singleSelected: false,
    selection: {},
    focus: ""
  };

  /*
    Helper function that convers places object to list.
  */
  places = () => {
    const placesByType = Object.values( this.props.selected );
    const places = [];
    for ( var type of placesByType ) {
      places.push(...Object.values(type));
    }
    return places;
  }

  /*
    Locations type selector was used.
  */
  handleChange = event => {
    this.setState({ singleSelected: false });
    this.props.selectType( event.target.value );
  };

  /*
    Selection was made.
  */
  selectLocation = event => {
    const selection = {
      type: event.target.dataset.type,
      id: event.target.dataset.id
    };
    this.setState( { selection } );
    this.props.singleSelect( selection );
  }

  /*
    Enter clicked on focused location.
  */
  selectLocationKey = event => {
    if(event.key !== 'Enter'){
      return;
    }
    const selection = {
      type: event.target.dataset.type,
      id: event.target.dataset.id
    };
    this.setState( { selection } );
    this.props.singleSelect( selection );
  }

  /*
    Check if location is selected.
  */
  isLocationSelected = location => {
    if( ! this.props.singleSelected) {
      return '';
    }
    if( this.props.selection.type === location.type &&
      this.props.selection.id === location.id ) {
      return ' App-menu-places-card-selected';
    }
    return ' App-menu-places-card-not-selected'
  }

  /*
    Check if location has focus. Used for focus higlight.
    Probably would be better with pure css like in other component.
  */
  hasFocus = id => {
    if( this.state.focus === id ) {
      return ' App-menu-places-card-has-focus';
    }
    return "";
  }

  /*
    Set information about which item is selected ( has focus ) in state.
  */
  onFocus = ( id ) => () => {
    this.setState( { focus: id } );
  }

  render() {

    return (
        <Paper classes={{root: this.props.className}} >
          <FormControl className="App-menu-selector" >
            <NativeSelect
              aria-label="Select location category"
              value={this.props.locationType}
              onChange={this.handleChange}
              input={<Input alt="Select locations category" name="place" id="place-native-helper"/>}
              tabIndex={"-1" /* -1 removes focus on enclosing component*/}
            >
              <option value="">All</option>
              <option value='none'>None</option>
              <option value='restaurants'>Restaurants</option>
              <option value='parks'>Parks</option>
              <option value='monuments'>Monuments</option>
            </NativeSelect>
            <FormHelperText>Choose place you want to visit</FormHelperText>
          </FormControl>
        <Divider />
        <div className="App-menu-places">
          { this.props.selected && this.places().map( ( place, key ) => {
            const _class = "App-menu-places-card" + this.isLocationSelected(place) + this.hasFocus( place.id );
             return (
               <div className={_class}
                data-id={place.id}
                data-type={place.type}
                onClick={this.selectLocation}
                onKeyDown={this.selectLocationKey}
                onFocus={this.onFocus(place.id)}
                key={place.id}
                tabIndex="0"
               >
                 <PlaceCard place={ place } aria-label="Select location, is selectable."/>
               </div>
             );})}
        </div>
        </Paper>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
