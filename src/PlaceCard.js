import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
    pointerEvents: "none"
  },
  media: {
    height: '100px',
    paddingTop: '0',
    paddingBottom: '0',
  },
  title: {
    paddingTop: '4px',
    paddingBottom: '4px',
  }
};

function PlaceCard(props) {
  const { classes, place } = props;
  return (
      <Card className={classes.card}>
        <CardMedia
            className={classes.media}
            image={place.titleImg}
            title="Place image"
          />
          <CardContent className={classes.title}>
          <Typography variant="headline" component="h2">
            {place.name}
          </Typography>
        </CardContent>
      </Card>
  );
}

PlaceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceCard);
