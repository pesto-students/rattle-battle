import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Leaderboard from './Leaderboard';

const styles = theme => ({
  button: { margin: theme.spacing.unit },
  rightIcon: { marginLeft: theme.spacing.unit },
});

const Home = ({ classes }) => (
  <React.Fragment>
    <Grid container direction="row" justify="center" alignItems="center">
      <Button className={classes.button} variant="contained" color="primary" size="large">
        Play
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
      <Button className={classes.button} variant="contained" color="secondary" size="large">
        Find a Friend
      </Button>
    </Grid>
    <Leaderboard />
  </React.Fragment>
);

Home.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Home);
