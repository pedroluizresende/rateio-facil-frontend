// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJ_d4weAMvgEzNu1WbSfE4DiOG7wFE66A',
  authDomain: 'rateio-facil-uploads.firebaseapp.com',
  projectId: 'rateio-facil-uploads',
  storageBucket: 'rateio-facil-uploads.appspot.com',
  messagingSenderId: '438785028187',
  appId: '1:438785028187:web:612dd65e8c46710547cf7e',
  measurementId: 'G-3BW2VEHBTZ',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
