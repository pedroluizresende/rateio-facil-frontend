import { useEffect, useRef, useState } from 'react';
import { TbCameraFilled } from 'react-icons/tb';
import PropTypes from 'prop-types';
import { BiArrowBack } from 'react-icons/bi';
import styles from './Camera.module.css';

function Camera({ setOpenCamera, setCurrentImage }) {
  const videoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: { width: 1080, height: 1920 },
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
  }, [videoRef]);
  return (
    <div className={ styles.container }>
      <BiArrowBack className={ styles.backBtn } onClick={ () => setOpenCamera(false) } />
      <video className={ styles.camera } ref={ videoRef }>
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
      </section>
    </div>
  );
}

Camera.propTypes = {
  setOpenCamera: PropTypes.func.isRequired,
  setCurrentImage: PropTypes.func.isRequired,
};

export default Camera;
