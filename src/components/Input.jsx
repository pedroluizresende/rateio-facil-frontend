import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

function Input({
  placeholder,
  type = 'text',
  value,
  onChange,
  name,
  inputRef,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && !showPassword ? 'password' : 'text';

  return (
    <div className={ styles.inputContainer }>
      <input
        className={ styles.input }
        placeholder={ placeholder }
        type={ inputType }
        value={ value }
        onChange={ onChange }
        name={ name }
        accept={ type === 'file' ? 'image/*' : '' }
        ref={ inputRef }
      />
      {type === 'password' && (
        <div className={ styles.eyeIconContainer }>
          {showPassword ? (
            <AiFillEye onClick={ toggleShowPassword } />
          ) : (
            <AiFillEyeInvisible onClick={ toggleShowPassword } />
          )}
        </div>
      )}
    </div>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Input.defaultProps = {
  type: 'text',
  name: '',
  inputRef: () => {},
};

export default Input;
