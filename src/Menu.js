import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
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
    singleLocation: null,
  };

  places = () => {
    const placesByType = Object.values( this.props.places );
    const places = [];
    for ( var type of placesByType ) {
      places.push(...Object.values(type));
    }
    return places;
  }

  handleChange = event => {
    this.setState({ locationType: event.target.value });
    this.props.onChange( event.target.value );
  };

  selectLocation = event => {
    const selection = {
      singleSelected: true,
      singleLocation: event.target };
    this.setState( selection );
    this.props.singleSelect( selection );
  }

  render() {

    return (
        <Paper classes={{root: this.props.className}} >
          <FormControl className="App-menu-selector" >
            <InputLabel htmlFor="place-native-helper">Place</InputLabel>
            <NativeSelect
              value={this.state.locationType}
              onChange={this.handleChange}
              input={<Input name="place" id="place-native-helper" />}
            >
              <option value="" />
              <option value='restaurants'>Restaurants</option>
              <option value='parks'>Parks</option>
              <option value='monuments'>Monuments</option>
            </NativeSelect>
            <FormHelperText>Choose place you want to visit</FormHelperText>
          </FormControl>
        <Divider />
        <div className="App-menu-places">
          { this.places().map( ( place, key ) =>
             ( <div
                onClick={this.selectLocation}
                key={place.id}
                id={place.id}
               >
                 <PlaceCard place={ place }/>
              </div>))}
        </div>
        </Paper>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
