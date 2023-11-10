import React from 'react';
import styles from './CustomSpinner.module.css';

function CustomSpinner() {
  return (
    <div className={ styles.container }>
      <div className={ styles.spinner } role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default CustomSpinner;
