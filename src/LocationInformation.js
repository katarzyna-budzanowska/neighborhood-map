import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Close from '@material-ui/icons/CancelTwoTone';

const styles = theme => ({
  gridListTitle: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  subheader: {
    flexGrow: '1'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class LocationInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: ''
    };
  }

  createMarkup(markup) {
    return {__html: markup};
  }

  getImages = () => {

      const KEY = '9646efb3a5f554c109aab278f89d2e24';
      const num = 10;
      const tags = this.props.tags;

      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${KEY}&tags=${tags}&tag_mode=all&per_page=${num}&page=1&format=json&nojsoncallback=1`)
        .then(res => res.json())
        .then( (result) => {
              const pictures = result.photos.photo.map( p => ( {
                img: 'http://farm' + p.farm + '.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret + '.jpg',
                title: p.title ? p.title : ''
              }));
            this.setState({
              isLoaded: true,
              pictures
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
  }

  componentDidMount() {
    this.getImages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.tags !== prevProps.tags) {
      this.getImages();
    }
  }

  render() {
    const { classes } = this.props;
    const { error, isLoaded, pictures } = this.state;
    if (error) {
      return (
        <div>
          <div>Location images have not loaded - please try again later</div>
          <div>Error: {error.message}</div>
        </div>
      );
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App-location-information">
          <GridList cellHeight={180} cols={1} classes={{root: "App-location-information-list"}}>
             {pictures.map(p => (
               <GridListTile classes={{root: "App-location-information-list-item"}} key={p.img}>
                  <a href={p.img} className="App-location-information-list-item-image" target="_blank">
                    <img src={p.img} alt={"Location picture: " + p.title} />
                  </a>
                 <GridListTileBar
                   title={p.title}
                 />
               </GridListTile>
             ))}
     </GridList>
   </div>
      );
    }
  }
}

LocationInformation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationInformation);
