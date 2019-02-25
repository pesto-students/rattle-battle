import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AuthButtons from './AuthButtons';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
});

const Navbar = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.grow}>
          Rattle Battle
        </Typography>
        <AuthButtons />
      </Toolbar>
    </AppBar>
  </div>
);

Navbar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    grow: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Navbar);
