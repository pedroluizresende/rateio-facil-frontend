import { useContext, useState } from 'react';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebase';
import Context from '../context/Context';
import BillContext from '../context/BillContext';

function useUpload() {
  const [imageUrl, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const { user } = useContext(Context);
  const { addImg } = useContext(BillContext);

  const TIME_OUT = 1000;

  const handleUpload = (file) => {
    if (file) {
      const storageRef = ref(storage, `images/${user.username}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressTask = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressTask);
        },
        (error) => {
          alert(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageUrl(downloadURL);

            setTimeout(async () => {
              await addImg(downloadURL);
            }, TIME_OUT);
          } catch (error) {
            alert(error);
          }
        },
      );
    }
  };

  const deleteImage = async (url) => {
    const imageRef = ref(storage, url);

    try {
      await deleteObject(imageRef);
      console.log('Imagem deletada com sucesso!');
      setImageUrl('');
    } catch (error) {
      console.log('Erro ao deletar imagem!', error);
    }
  };

  return { handleUpload, imageUrl, progress, deleteImage };
}

export default useUpload;
