import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './TakePhoto.module.css';
import Button from './Button';
import Form from './Form';
import InputImage from './InputImage';
import useUpload from '../hooks/useUpLoad';

function TakePhoto({ setTakePhoto }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const { handleUpload, imageUrl } = useUpload();

  useEffect(() => {
    if (selectedImage) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedImage]);

  // const startCamera = async () => {
  //   try {
  //     const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

  //     setStream(mediaStream);
  //   } catch (error) {}
  // };

  // const stopCamera = () => {
  //   if (stream) {
  //     stream.getTracks().forEach((track) => track.stop());
  //     setStream(null);
  //   }
  // };

  // const handleCaptureClick = () => {
  //   startCamera();
  // };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const selectedImageUrl = URL.createObjectURL(file);
      setSelectedImage(selectedImageUrl);
    }
  };

  const handleSubmit = (e) => {
    handleUpload(e);
    setTakePhoto(false);
  };

  return (
    <main className={ styles.container }>
      <Form onSubmit={ handleSubmit }>
        <InputImage
          handleFileInputChange={ handleFileInputChange }
        />

        {
          imageUrl.length === 0 && selectedImage && (
            <img src={ selectedImage } alt="Imagem" width="200px" />
          )
        }
        {
          imageUrl && <img src={ imageUrl } alt="Imagem" width="200px" />
        }

        <Button type="submit" disabled={ isDisabled }>
          Enviar
        </Button>
        <Button type="reset" onClick={ () => setTakePhoto(false) }>
          cancelar
        </Button>
      </Form>
    </main>
  );
}

TakePhoto.propTypes = {
  setTakePhoto: PropTypes.func.isRequired,
};

export default TakePhoto;
