import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const RequiredFormTextField = props => <TextField required margin="dense" fullWidth {...props} />;

RequiredFormTextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default RequiredFormTextField;
