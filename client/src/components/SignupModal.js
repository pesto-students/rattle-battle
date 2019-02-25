import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormDialog from './FormDialog';
import useSignupForm from '../customHooks/useSignupForm';
import RequiredFormTextField from './RequiredFormTextField';

import UserContext from '../utils/user-context';

const SignupModal = ({ closeModal, show }) => {
  const { login: callbackForSignupSuccess } = useContext(UserContext);

  const {
    emailState,
    usernameState,
    passwordState,
    repeatPasswordState,
    handleSubmit,
    formError,
  } = useSignupForm(callbackForSignupSuccess);

  return (
    <FormDialog title="Sign Up" show={show} closeModal={closeModal} handleSubmit={handleSubmit}>
      <Typography color="error">{formError}</Typography>
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
  closeModal: PropTypes.func.isRequired,
};

export default SignupModal;
