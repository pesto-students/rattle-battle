import { useState } from 'react';
import useFormTextField from './useFormTextField';
import { signupAPI } from '../utils/auth-api';
import handleErrors from './handleFormErrors';
import handleSuccess from './handleFormSuccess';

export default (callbackForSignupSuccess) => {
  const initialState = { error: false, errorMsg: '', value: '' };

  const [emailState, setEmailError] = useFormTextField(initialState);
  const [passwordState, setPasswordError] = useFormTextField(initialState);
  const [usernameState, setUsernameError] = useFormTextField(initialState);
  const [repeatPasswordState, setRepeatPasswordError] = useFormTextField(initialState);
  const [formError, setFormError] = useState('');

  const setError = {
    password: setPasswordError,
    username: setUsernameError,
    email: setEmailError,
    repeatPassword: setRepeatPasswordError,
    form: setFormError,
  };

  const runFormValidation = (formData) => {
    const { password, repeatPassword } = formData;
    let validationFail = false;
    if (password !== repeatPassword) {
      setError.repeatPassword('Passwords do not match');
      validationFail = true;
    }

    return validationFail;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { value: password } = passwordState;
    const { value: repeatPassword } = repeatPasswordState;
    const { value: username } = usernameState;
    const { value: email } = emailState;

    const formData = {
      email,
      username,
      password,
      repeatPassword,
    };

    const validationFail = runFormValidation(formData);

    if (validationFail) {
      return null;
    }

    const user = {
      email,
      username,
      password,
    };

    return signupAPI(user)
      .then(handleSuccess)
      .then(callbackForSignupSuccess)
      .catch(err => handleErrors(err, setError));
  };

  return {
    emailState,
    passwordState,
    usernameState,
    repeatPasswordState,
    handleSubmit,
    formError,
  };
};
