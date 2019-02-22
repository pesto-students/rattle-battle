import React from 'react';
import PropTypes from 'prop-types';
import FormDialog from './FormDialog';
import useSignupForm from '../customHooks/useSignupForm';
import RequiredFormTextField from './RequiredFormTextField';

const SignupModal = ({ toggleModal, show }) => {
  const closeSignupModal = () => toggleModal('showSignupModal');

  const {
    emailState,
    usernameState,
    passwordState,
    repeatPasswordState,
    handleSubmit,
  } = useSignupForm(closeSignupModal);

  return (
    <FormDialog
      title="Sign Up"
      show={show}
      closeModal={closeSignupModal}
      handleSubmit={handleSubmit}
    >
      <RequiredFormTextField name="email" type="email" label="Email" autoFocus {...emailState} />
      <RequiredFormTextField name="username" type="text" label="Username" {...usernameState} />
      <RequiredFormTextField name="password" type="password" label="Password" {...passwordState} />
      <RequiredFormTextField
        name="repeat-password"
        type="password"
        label="Repeat Password"
        {...repeatPasswordState}
      />
    </FormDialog>
  );
};

SignupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default SignupModal;
