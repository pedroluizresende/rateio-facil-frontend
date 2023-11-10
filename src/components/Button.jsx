import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ children, type, onClick,
  disabled = false }) {
  return (
    <button
      onClick={ onClick }
      className={ type === 'reset' ? styles.buttonRed : styles.button }
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
