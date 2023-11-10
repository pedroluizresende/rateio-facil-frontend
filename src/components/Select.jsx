import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import styles from './Select.module.css';

function Select({ options, name, onChange }) {
  const { user } = useContext(Context);

  return (
    <select
      className={ styles.select }
      name={ name }
      onChange={ onChange }
      defaultValue={ user.username }
    >
      {user && (
        <option
          key={ user.name }
          value={ user.name }
          defaultValue
        >
          {`${user.name}(eu)`}
        </option>
      )}
      {options.map((option, index) => (
        <option key={ index } value={ option }>{option}</option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
