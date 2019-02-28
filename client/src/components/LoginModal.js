import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormDialog from './FormDialog';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import useLoginForm from '../customHooks/useLoginForm';
import RequiredFormTextField from './RequiredFormTextField';
import UserContext from '../utils/user-context';

const LoginModal = ({ closeModal, show }) => {
  const { login: loginSuccessCallback } = useContext(UserContext);
  const {
    emailState, passwordState, rememberMeState, handleSubmit, formError,
  } = useLoginForm(
    loginSuccessCallback,
  );

  return (
    <FormDialog title="Login" show={show} closeModal={closeModal} handleSubmit={handleSubmit}>
      <Typography color="error" data-test="form-error">
        {formError}
      </Typography>
      <RequiredFormTextField name="email" type="email" label="Email" autoFocus {...emailState} />
      <RequiredFormTextField name="password" type="password" label="Password" {...passwordState} />
      <CheckBoxWithLabel label="Remember Me" name="remember-me" {...rememberMeState} />
    </FormDialog>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default LoginModal;
