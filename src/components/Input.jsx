import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

function Input({
  placeholder, type = 'text',
  value, onChange, name = '',
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
      />
      {
        type === 'password' && (
          !showPassword ? <AiFillEyeInvisible
            onClick={ toggleShowPassword }
          /> : <AiFillEye onClick={ toggleShowPassword } />
        )
      }
    </div>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
