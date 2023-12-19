import PropTypes from 'prop-types';

function InputImage({
  handleFileInputChange,
}) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={ handleFileInputChange }
    />
  );
}

InputImage.propTypes = {
  handleFileInputChange: PropTypes.func.isRequired,
};

export default InputImage;
