import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';

const CheckBoxWithLabel = ({ label, ...otherProps }) => (
  <FormControlLabel label={label} control={<Checkbox {...otherProps} />} />
);

CheckBoxWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CheckBoxWithLabel;
