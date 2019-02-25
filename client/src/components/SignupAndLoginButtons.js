import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

class SignupAndLoginButtons extends Component {
  state = { showLoginModal: false, showSignupModal: false };

  toggleModal = modalName => this.setState(prevState => ({ [modalName]: !prevState[modalName] }));

  toggleSignupModal = () => this.toggleModal('showSignupModal');

  toggleLoginModal = () => this.toggleModal('showLoginModal');

  render() {
    const { showLoginModal, showSignupModal } = this.state;
    return (
      <Fragment>
        <Button color="inherit" onClick={this.toggleSignupModal} data-test="signup">
          Signup
        </Button>
        <Button color="inherit" onClick={this.toggleLoginModal} data-test="login">
          Login
        </Button>
        <SignupModal show={showSignupModal} closeModal={this.toggleSignupModal} />
        <LoginModal show={showLoginModal} closeModal={this.toggleLoginModal} />
      </Fragment>
    );
  }
}

export default SignupAndLoginButtons;
