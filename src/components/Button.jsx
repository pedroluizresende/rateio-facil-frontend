import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ children, type = 'button', onClick, disabled = false }) {
  const buttonClassName = type === 'reset' ? styles.buttonRed : styles.button;

  return (
    <button
      onClick={ onClick }
      className={ buttonClassName }
      type={ type }
      disabled={ disabled }
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  disabled: false,
};

export default Button;
