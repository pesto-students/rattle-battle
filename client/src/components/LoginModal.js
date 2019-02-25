import React from 'react';
import PropTypes from 'prop-types';
import FormDialog from './FormDialog';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import useLoginForm from '../customHooks/useLoginForm';
import RequiredFormTextField from './RequiredFormTextField';

const LoginModal = ({ closeModal, show }) => {
  const {
    emailState, passwordState, rememberMeState, handleSubmit,
  } = useLoginForm(closeModal);

  return (
    <FormDialog title="Login" show={show} closeModal={closeModal} handleSubmit={handleSubmit}>
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
