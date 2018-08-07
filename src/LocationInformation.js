import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
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
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className={classes.root}>
     <GridList cellHeight={180} cols={1} className={classes.gridList}>
       <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
         <ListSubheader component="div">Location Pictures</ListSubheader>
       </GridListTile>
       {pictures.map(p => (
         <GridListTile key={p.img}>
            <a href={p.img} target="_blank">
              <img src={p.img} alt={p.title} />
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
