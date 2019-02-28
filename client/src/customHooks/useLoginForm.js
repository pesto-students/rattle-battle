import { useState } from 'react';
import useFormTextField from './useFormTextField';
import useCheckBox from './useCheckBox';
import { loginAPI } from '../utils/auth-api';
import handleSuccess from './handleFormSuccess';
import handleErrors from './handleFormErrors';

export default (successCallback) => {
  const initialState = { error: false, errorMsg: '', value: '' };

  const [emailState, setEmailError] = useFormTextField(initialState);
  const [passwordState, setPasswordError] = useFormTextField(initialState);
  const [rememberMeState] = useCheckBox(true);
  const [formError, setFormError] = useState('');

  const setError = {
    email: setEmailError,
    password: setPasswordError,
    form: setFormError,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { value: email } = emailState;
    const { value: password } = passwordState;

    const user = { email, password };

    return loginAPI(user)
      .then(handleSuccess)
      .then(successCallback)
      .catch(err => handleErrors(err, setError));
  };

  return {
    emailState,
    passwordState,
    rememberMeState,
    handleSubmit,
    formError,
  };
};
