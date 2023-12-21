import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './TakePhoto.module.css';
import Button from './Button';
import Form from './Form';
import InputImage from './InputImage';
import useUpload from '../hooks/useUpLoad';
import Camera from './Camera';

function TakePhoto({ setTakePhoto }) {
  const [nameImage, setNameImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openCamera, setOpenCamera] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const { handleUpload, imageUrl } = useUpload();

  useEffect(() => {
    if (selectedImage) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedImage]);

  const transformFile = (file) => {
    if (file) {
      const selectedImageUrl = URL.createObjectURL(file);
      setSelectedImage(selectedImageUrl);
      setNameImage(file.name);
      setCurrentImage(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    transformFile(file);
  };

  const handleSubmit = () => {
    handleUpload(currentImage);
    setTakePhoto(false);
  };

  useEffect(() => {
    transformFile(currentImage);
  }, [currentImage]);

  return (
    <main className={ styles.container }>
      <Form onSubmit={ handleSubmit }>
        <InputImage
          handleFileInputChange={ handleFileInputChange }
          text={ selectedImage ? 'Alterar imagem' : 'Adicionar imagem' }
        />

        <Button type="button" onClick={ () => setOpenCamera(true) }>Tirar Foto </Button>

        {
          openCamera && (
            <Camera
              setOpenCamera={ setOpenCamera }
              setCurrentImage={ setCurrentImage }
            />
          )
        }

        {

          imageUrl.length === 0 && selectedImage
          && (
            <div className={ styles.imagePreview }>
              <img src={ selectedImage } alt="Imagem" width="200px" />
              <p>{nameImage}</p>
            </div>
          )
        }

        <section className={ styles.buttons }>
          <Button type="submit" disabled={ isDisabled }>
            Enviar
          </Button>
          <Button type="reset" onClick={ () => setTakePhoto(false) }>
            cancelar
          </Button>
        </section>
      </Form>
    </main>
  );
}

TakePhoto.propTypes = {
  setTakePhoto: PropTypes.func.isRequired,
};

export default TakePhoto;
