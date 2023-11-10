import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import styles from './BackButton.module.css';

function BackButton() {
  function handleClick() {
    window.history.back();
  }

  return (
    <button className={ styles.backButton } onClick={ handleClick }>
      <BiArrowBack />
    </button>
  );
}

export default BackButton;
