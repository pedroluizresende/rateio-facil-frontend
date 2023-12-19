import PropTypes from 'prop-types';
import styles from './InputImage.module.css';

function InputImage({
  handleFileInputChange,
  text,
}) {
  return (
    <label htmlFor="inputImage" className={ styles.button }>
      {text}
      <input
        id="inputImage"
        className={ styles.inputImage }
        type="file"
        accept="image/*"
        onChange={ handleFileInputChange }
      />
    </label>
  );
}

InputImage.propTypes = {
  handleFileInputChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default InputImage;
