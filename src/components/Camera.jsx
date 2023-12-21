import React, { useEffect, useRef, useState } from 'react';
import { TbCameraFilled } from 'react-icons/tb';
import PropTypes from 'prop-types';
import { BiArrowBack } from 'react-icons/bi';
import { MdCameraswitch } from 'react-icons/md';
import styles from './Camera.module.css';

function Camera({ setOpenCamera, setCurrentImage }) {
  const videoRef = useRef(null);
  const [switchCamera, setSwitchCamera] = useState(true);

  const getVideo = () => {
    const video = videoRef.current;

    if (video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 2160 },
        height: { ideal: 3840 },
        facingMode: switchCamera ? 'user' : 'environment',
      },
    })
      .then((stream) => {
        video.srcObject = stream;

        // Adicionar listener para garantir que o vídeo está totalmente carregado
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });

      // Ou use 'canplaythrough' em vez de 'loadedmetadata' se preferir
      })
      .catch((err) => {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          console.error('O usuário negou a permissão para a câmera.');
        } else {
          console.error('Erro ao acessar a câmera:', err);
        }
      });
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const { videoWidth, videoHeight } = video;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Espelhar a imagem se a câmera estiver no modo 'user'
    if (switchCamera) {
      context.translate(videoWidth, 0);
      context.scale(-1, 1);
    }

    context.drawImage(video, 0, 0, videoWidth, videoHeight);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'foto.png', { type: 'image/png' });
      setCurrentImage(file);
    }, 'image/png');

    setOpenCamera(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef, switchCamera]);

  return (
    <div className={ styles.container }>
      <BiArrowBack className={ styles.backBtn } onClick={ () => setOpenCamera(false) } />
      <video
        className={ styles.camera }
        ref={ videoRef }
        style={ { transform: switchCamera ? 'scaleX(-1)' : 'none' } }
      />
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
