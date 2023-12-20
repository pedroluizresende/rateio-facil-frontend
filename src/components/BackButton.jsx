import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import PropTypes from 'prop-types';
import styles from './BackButton.module.css';

function BackButton({ onClick }) {
  return (
    <button className={ styles.backButton } onClick={ onClick }>
      <BiArrowBack />
    </button>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func,
};

BackButton.defaultProps = {
  onClick: () => {
    window.history.back();
  },
};

export default BackButton;
