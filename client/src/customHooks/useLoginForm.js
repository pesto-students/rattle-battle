import useFormTextField from './useFormTextField';
import useCheckBox from './useCheckBox';

export default (done) => {
  const initialState = { error: false, errorMsg: '', value: '' };

  const [emailState] = useFormTextField(initialState);
  const [passwordState] = useFormTextField(initialState);
  const [rememberMeState] = useCheckBox(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { value: email } = emailState;
    const { value: password } = passwordState;
    const { checked: rememberMe } = rememberMeState;

    //  eslint-disable-next-line
    console.log({
      email,
      password,
      rememberMe,
    });

    done();
  };

  return {
    emailState,
    passwordState,
    rememberMeState,
    handleSubmit,
  };
};
