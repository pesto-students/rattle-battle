import React from 'react';
import PropTypes from 'prop-types';
import FormDialog from './FormDialog';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import useLoginForm from '../customHooks/useLoginForm';
import RequiredFormTextField from './RequiredFormTextField';

const LoginModal = ({ toggleModal, show }) => {
  const closeLoginModal = () => toggleModal('showLoginModal');

  const {
    emailState, passwordState, rememberMeState, handleSubmit,
  } = useLoginForm(
    closeLoginModal,
  );

  return (
    <FormDialog title="Login" show={show} closeModal={closeLoginModal} handleSubmit={handleSubmit}>
      <RequiredFormTextField name="email" type="email" label="Email" autoFocus {...emailState} />
      <RequiredFormTextField name="password" type="password" label="Password" {...passwordState} />
      <CheckBoxWithLabel label="Remember Me" name="remember-me" {...rememberMeState} />
    </FormDialog>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default LoginModal;
