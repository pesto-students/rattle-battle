import useFormTextField from './useFormTextField';

export default (done) => {
  const initialState = { error: false, errorMsg: '', value: '' };

  const [emailState] = useFormTextField(initialState);
  const [passwordState] = useFormTextField(initialState);
  const [usernameState] = useFormTextField(initialState);
  const [repeatPasswordState, setRepeatPasswordError] = useFormTextField(initialState);

  const runFormValidation = (formData) => {
    const { password, repeatPassword } = formData;
    let validationFail = false;
    if (password !== repeatPassword) {
      setRepeatPasswordError('Passwords do not match');
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
      return;
    }

    const user = {
      email,
      username,
      password,
    };

    // eslint-disable-next-line
    console.log(user);
    done();
  };

  return {
    emailState,
    passwordState,
    usernameState,
    repeatPasswordState,
    handleSubmit,
  };
};
