import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import './loaderComponent.css';

const LoaderComponent = (props) => {
  const { height, width, message } = props;
  return (
    <div className="Loader-container">
      <Loader
        type="Puff"
        color="#00BFFF"
        height={height}
        width={width}
      />
      <p>{message}</p>
    </div>
  );
};

LoaderComponent.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  message: PropTypes.string.isRequired,
};

export default LoaderComponent;
