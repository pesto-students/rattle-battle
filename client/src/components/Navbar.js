import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Rattle Battle
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
