import { useEffect, useRef, useState } from 'react';
import { TbCameraFilled } from 'react-icons/tb';
import PropTypes from 'prop-types';
import { BiArrowBack } from 'react-icons/bi';
import { MdCameraswitch } from 'react-icons/md';
import styles from './Camera.module.css';

function Camera({ setOpenCamera, setCurrentImage }) {
  const videoRef = useRef(null);
  const [switchCamera, setSwitchCamera] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 2160,
        height: 3840,
        facingMode: switchCamera ? 'user' : 'environment',
      },

    })
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'foto.png', { type: 'image/png' });
      setCurrentImage(file);
    }, 'image/png');

    setOpenCamera(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef.current]);

  return (
    <div className={ styles.container }>
      <BiArrowBack className={ styles.backBtn } onClick={ () => setOpenCamera(false) } />
      <video
        className={ styles.camera }
        ref={ videoRef }
      >
        <track kind="captions" />
      </video>
      <section className={ styles.buttons }>
        <button
          type="button"
          onClick={ takePhoto }
          aria-label="Tirar Foto"
          className={ styles.snapBtn }
        >
          <TbCameraFilled />
        </button>
        <button
          type="button"
          onClick={ () => setSwitchCamera(!switchCamera) }
          aria-label="Trocar Câmera"
          className={ styles.switchBtn }
        >
          <MdCameraswitch />
        </button>
      </section>
    </div>
  );
}

Camera.propTypes = {
  setOpenCamera: PropTypes.func.isRequired,
  setCurrentImage: PropTypes.func.isRequired,
};

export default Camera;
