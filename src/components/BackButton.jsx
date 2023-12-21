import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import PropTypes from 'prop-types';
import styles from './BackButton.module.css';

function BackButton({ onClick }) {
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };

  return (
    <button className={ styles.backButton } onClick={ handleButtonClick }>
      <BiArrowBack />
    </button>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func,
};

BackButton.defaultProps = {
  onClick: null,
};

export default BackButton;
