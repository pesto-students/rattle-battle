import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const AuthButtons = ({ toggleModal }) => (
  <Fragment>
    <Button color="inherit" onClick={() => toggleModal('showSignupModal')}>
      Signup
    </Button>
    <Button color="inherit" onClick={() => toggleModal('showLoginModal')}>
      Login
    </Button>
  </Fragment>
);

AuthButtons.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default AuthButtons;
