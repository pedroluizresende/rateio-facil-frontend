import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.css';

function Checkbox({ text, id, onChange, value = undefined, checked }) {
  return (
    <label htmlFor={ id } className={ styles.checkbox }>
      <p>{ text }</p>
      <input
        value={ value }
        type="checkbox"
        id={ id }
        onChange={ onChange }
        checked={ checked }
      />
    </label>
  );
}

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  id: 'checkbox',
  value: '',
  checked: false,
};

export default Checkbox;
