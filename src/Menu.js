import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

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
  };

  handleChange = event => {
    this.setState({ locationType: event.target.value });
    this.props.onChange( event.target.value );
  };

  render() {
    const { classes } = this.props;

    return (
        <Paper classes={{root: this.props.className}} >
          <FormControl className={classes.formControl}>
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

        </Paper>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
