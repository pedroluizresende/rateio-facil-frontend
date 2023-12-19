import { useContext, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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

  return { handleUpload, imageUrl, progress };
}

export default useUpload;
