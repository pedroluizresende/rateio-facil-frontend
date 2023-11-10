import { useNavigate } from 'react-router-dom';
import { getInLocalStorage } from '../utils/localStorage';
import { decrypt } from '../utils/crypto';

function useToken() {
  const navigate = useNavigate();

  const getToken = () => {
    const token = getInLocalStorage('token');
    if (!token) {
      navigate('/');
    }
    return decrypt(token);
  };

  return { getToken };
}

export default useToken;
