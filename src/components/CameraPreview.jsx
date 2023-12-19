import PropTypes from 'prop-types';
import { MdMotionPhotosOn } from 'react-icons/md';
import styles from './CameraPreview.module.css';

function CameraPreview({
  inputRef,
  setSelectedImage,
  stopCamera,
}) {
  const handleTakePhoto = (e) => {
    e.preventDefault();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = inputRef.current.videoWidth;
    canvas.height = inputRef.current.videoHeight;

    context.drawImage(inputRef.current, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL('image/png');
    setSelectedImage(imageUrl);
    stopCamera();
  };

  return (
    <div className={ styles.container }>
      <video
        autoPlay
        playsInline
        className={ styles.cameraPreview }
        ref={ (video) => {
          if (video) {
            inputRef.current = video;
          }
        } }
      >
        <track kind="captions" srcLang="pt-br" label="Portuguese" />
      </video>
      <button
        onClick={ handleTakePhoto }
        className={ styles.tahePhotoBtn }
        aria-label="Tirar Foto"
      >
        <MdMotionPhotosOn />

      </button>
    </div>
  );
}

CameraPreview.propTypes = {
  inputRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  setSelectedImage: PropTypes.func.isRequired,
  stopCamera: PropTypes.func.isRequired,
};

export default CameraPreview;
