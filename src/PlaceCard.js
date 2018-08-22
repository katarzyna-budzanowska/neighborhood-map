import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  card: {
    maxWidth: 345,
    pointerEvents: "none"
  },
  media: {
    height: '160px',
  },
};

/*
  This component presents single location in the menu.
*/
function PlaceCard(props) {
  const { classes, place } = props;
  return (
      <Card className={classes.card}>
          <CardMedia
              className={classes.media}
              classes={{root: "App-place-card"}}
              image={place.titleImg}
              title="Place image"
              alt={"Place image of " + place.name }
          />
          <h2 className="App-placecard-title">
            {place.name}
          </h2>
      </Card>
  );
}

PlaceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceCard);
