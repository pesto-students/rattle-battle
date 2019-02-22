import { useState } from 'react';

export default (initialState) => {
  const [state, setState] = useState({ ...initialState });

  const handleInputChange = (event) => {
    setState({ ...initialState, value: event.target.value });
  };

  const setError = (errorMsg) => {
    setState({
      ...state,
      error: true,
      errorMsg,
    });
  };

  return [
    {
      error: state.error,
      helperText: state.errorMsg,
      value: state.value,
      onChange: handleInputChange,
    },
    setError,
  ];
};
