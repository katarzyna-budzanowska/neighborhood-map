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

class Menu extends Component {
  state = {
    locationType: '',
    singleSelected: false,
    selection: null,
  };

  places = () => {
    const placesByType = Object.values( this.props.selected );
    const places = [];
    for ( var type of placesByType ) {
      places.push(...Object.values(type));
    }
    return places;
  }

  handleChange = event => {
    this.setState({ locationType: event.target.value, singleSelected: false });
    this.props.selectType( event.target.value );
  };

  selectLocation = event => {
    const selection = {
      type: event.target.dataset.type,
      id: event.target.dataset.id
    };
    this.setState( { singleSelected: true, selection, locationType: 'none' } );
    this.props.singleSelect( selection );
  }

  isLocationSelected = location => {
    if( ! this.state.singleSelected) {
      return '';
    }
    if( this.state.selection.type === location.type &&
      this.state.selection.id === location.id ) {
      return ' App-menu-places-card-selected';
    }
    return ' App-menu-places-card-not-selected'
  }

  render() {

    return (
        <Paper classes={{root: this.props.className}} >
          <FormControl className="App-menu-selector" >
            <NativeSelect
              value={this.state.locationType}
              onChange={this.handleChange}
              input={<Input name="place" id="place-native-helper" />}
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
            const _class = "App-menu-places-card" + this.isLocationSelected(place);
             return (
               <div className={_class}
                data-id={place.id}
                data-type={place.type}
                onClick={this.selectLocation}
                key={place.id}
               >
                 <PlaceCard place={ place } />
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
