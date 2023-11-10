import CryptoJS from 'crypto-js';

const SECRET_KEY = 's3nha s3cr3ta';

export const encrypt = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  return ciphertext;
};

export const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};
