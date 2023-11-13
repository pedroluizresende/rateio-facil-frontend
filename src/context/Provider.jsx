import { useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';
import { decrypt, encrypt } from '../utils/crypto';
import { getInLocalStorage, setInLocalStorage } from '../utils/localStorage';
import StatusCode from './StatusCode';
import useToken from '../hooks/useToken';
import handleApiError from '../utils/errors';

function Provider({ children }) {
  const defaultUser = {
    id: null,
    name: '',
    email: '',
    username: '',
  };
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const [error, setError] = useState('');
  const [sucess, setSucess] = useState(null);

  const apiUrl = (process.env.REACT_APP_API_URL).replace(/"/g, '');

  const navigate = useNavigate();

  const { getToken } = useToken();

  const TIME_OUT = 1000;

  const login = async (username, password) => {
    setLoading(true);
    console.log({ username, password });
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      });

      const tokenApi = response.data.data.token;
      const userApi = response.data.data.user;

      setToken(tokenApi);
      setUser(userApi);

      const encryptedToken = encrypt(tokenApi);
      const encryptedId = encrypt(userApi.id);

      setInLocalStorage('id', encryptedId);

      setInLocalStorage('token', encryptedToken);

      setSucess('Login realizado com sucesso!');
      setError(null);
      navigate('/home');
    } catch (e) {
      setSucess(null);
      handleApiError(e, setError, navigate);
    }
  };

  const getUser = async () => {
    setLoading(true);

    const decryptedToken = getToken();
    const idLocalStorage = getInLocalStorage('id');
    const decryptedId = decrypt(idLocalStorage);

    if (!token) {
      setToken(decryptedToken);
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      };
      const response = await axios.get(`${apiUrl}/users/${decryptedId}`, config);
      setUser(response.data);
      setError(null);
    } catch (e) {
      localStorage.clear();
      setError('Ocorreu um erro ao buscar o usuário');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, TIME_OUT);
    }
  };

  const createUser = async (newUser) => {
    setLoading(true);
    newUser = {
      ...newUser,
      role: 'user',
    };
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setSucess(response.data.message);
      navigate(
        '/criarconta/confirmacao/mensagem',
        { state: { email: newUser.email, name: newUser.name } },
      );
    } catch (e) {
      setSucess(null);
      handleApiError(e, setError, navigate);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, TIME_OUT);
    }
  };

  const updateUser = async (updatedUser) => {
    setLoading(true);
    const decryptedToken = getToken();
    const idLocalStorage = getInLocalStorage('id');
    const decryptedId = decrypt(idLocalStorage);

    const update = {
      ...updatedUser,
      role: 'user',
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      };
      const response = await axios.put(`${apiUrl}/users/${decryptedId}`, update, config);
      setUser(response.data.data);
      setError('Usuário atualizado com sucesso!');
      navigate('/perfil');
    } catch (e) {
      if (e.response.status === StatusCode.FORBIDDEN) {
        setError('Usuário já cadastrado');
      } else {
        setError('Ocorreu um erro ao atualizar o usuário');
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, TIME_OUT);
    }
  };

  const confirmUser = async (tokenConfirm) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${tokenConfirm}`,
        },
      };
      const response = await axios.put(`${apiUrl}/users/confirmation`, {}, config);
      setSucess(response.data.message);
      setError(null);
    } catch (e) {
      setSucess(null);
      handleApiError(e, setError, navigate);
    }
  };

  const logout = () => {
    setLoading(true);
    localStorage.clear();
    navigate('/');
    setError(null);
    setSucess(null);
    setLoading(false);
  };

  const value = useMemo(() => ({
    login,
    loading,
    error,
    setLoading,
    setToken,
    user,
    setUser,
    getUser,
    setError,
    createUser,
    updateUser,
    sucess,
    logout,
    confirmUser,
  }), [loading, token, error, user, sucess]);

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
