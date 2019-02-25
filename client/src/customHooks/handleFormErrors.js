const handleErrors = (err, setError) => {
  /**
   * Sometimes the server sends an array of errors and sometimes it sends a string.
   * We've got to handle all cases!
   */
  const { errors } = err;
  if (Array.isArray(errors)) {
    errors.forEach((error) => {
      setError[error.param](error.msg);
    });
  } else if (typeof errors === 'string') {
    setError.form(errors);
  } else {
    // just in case
    setError.form("Something wen't wrong. Please contact the developer.");
    console.log(err); // eslint-disable-line no-console
  }
};

export default handleErrors;
