import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SignupModal from './SignupModal';
import AuthButtons from './AuthButtons';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
});

class Navbar extends Component {
  state = { showLoginModal: false, showSignupModal: false };

  toggleModal = modalName => this.setState(prevState => ({
    [modalName]: !prevState[modalName],
  }));

  render() {
    const { classes, loggedInUser } = this.props;
    const { showSignupModal } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Rattle Battle
            </Typography>

            {loggedInUser ? (
              <Typography variant="subheading" color="inherit">
                {`Hi, ${loggedInUser.username}`}
              </Typography>
            ) : (
              <AuthButtons toggleModal={this.toggleModal} />
            )}
          </Toolbar>
        </AppBar>
        <SignupModal show={showSignupModal} toggleModal={this.toggleModal} />
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    grow: PropTypes.string.isRequired,
  }).isRequired,

  loggedInUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

Navbar.defaultProps = {
  loggedInUser: null,
};

export default withStyles(styles)(Navbar);
