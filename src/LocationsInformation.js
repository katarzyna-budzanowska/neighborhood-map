import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import LocationInformation from './LocationInformation';
import Close from '@material-ui/icons/CancelTwoTone';

/*
  Handles location presentation. When single location is selected a drawer is opened.
  Drawer presents a list of location related images. Depending on screen size drawer
  is opened either on right side or from bottom.
*/
class LocationsInformation extends Component {
  state = {
    focus: null
  };

  hasFocus = id => {
    if (this.state.focus === id) {
      return ' App-menu-places-location-card-has-focus';
    }
    return "";
  }

  onFocus = (id) => () => {
    this.setState({focus: id});
  }

  render() {
    const {toggleDrawer, toggleDrawerKey, opened, location} = this.props;
    return (<div>
      <div className="App-drawer-small">
        <Drawer variant="persistent" anchor="bottom" open={opened} onClose={toggleDrawer(false)}>
          <div tabIndex={0} role="button" onClick={toggleDrawer(false)} onKeyDown={toggleDrawerKey(false)}>
            <div>
              <div >
                Location Pictures
                <Close className="App-close-drawer"/>
                <div className="App-flickr-attribution">Pictures search powered by Flickr</div>
              </div>
              {opened && <LocationInformation tabIndex="0" tags={location.tags} onFocus={this.onFocus(location.id)}/>}
            </div>
          </div>
        </Drawer>
      </div>
      <div className="App-drawer-big">
        <Drawer variant="persistent" anchor="right" open={opened} onClose={toggleDrawer(false)}>
          <div tabIndex={0} role="button" onClick={toggleDrawer(false)} onKeyDown={toggleDrawerKey(false)}>
            <div style={{
                width: '25vw'
              }}>
              <div >
                Location Pictures
                <Close aria-label="Close" className="App-close-drawer"/>
                <div className="App-flickr-attribution">Pictures search powered by Flickr</div>
              </div>
              {opened && <LocationInformation tabIndex="0" tags={location.tags} name={location.name} onFocus={this.onFocus(location.id)}/>}
            </div>
          </div>
        </Drawer>
      </div>
    </div>);
  }
}

export default LocationsInformation;
