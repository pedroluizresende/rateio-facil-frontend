import React from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

function Form({ onSubmit, children }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={ styles.form } onSubmit={ handleSubmit }>
      {children}
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;
