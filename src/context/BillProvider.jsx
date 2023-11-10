import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getInLocalStorage } from '../utils/localStorage';
import { decrypt } from '../utils/crypto';
import BillContext from './BillContext';
import useToken from '../hooks/useToken';
import apiRequest from '../utils/api';
import handleApiError from '../utils/errors';

function BillProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState(null);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [allBills, setAllBills] = useState([]);
  const [calculation, setCalculation] = useState({});
  const [sucess, setSucess] = useState(null);

  const TIME_OUT = 1000;

  const { getToken } = useToken();

  const navigate = useNavigate();
  const apiUrl = (process.env.REACT_APP_API_URL).replace(/"/g, '');

  const setLoadingTrue = () => {
    setTimeout(() => {
      setLoading(false);
    }, TIME_OUT);
  };

  const fetchWithToken = async (url, method = 'get', data = null) => {
    const decryptedToken = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    };
    try {
      const response = await apiRequest(url, method, data, config);
      return response.data;
    } catch (e) {
      handleApiError(e, setError, navigate);
      setSucess(null);
    } finally {
      setLoadingTrue();
    }
  };

  const openBill = async (establishment) => {
    setLoading(true);
    const id = getInLocalStorage('id');
    const decryptedId = decrypt(id);
    const data = await fetchWithToken(
      `${apiUrl}/users/${decryptedId}/bills`,
      'post',

      { establishment },
    );
    const billFromApi = data.data;
    setBill(billFromApi);
    navigate(`${decryptedId}/bill/${billFromApi.id}`);
  };

  const getBill = async (billId) => {
    setLoading(true);
    const id = getInLocalStorage('id');
    const decryptedId = decrypt(id);
    const billFromApi = await fetchWithToken(
      `${apiUrl}/users/${decryptedId}/bills/${billId}`,
      'get',
    );
    setBill(billFromApi);
    setError(null);
  };

  const getOrders = async (billId) => {
    setLoading(true);
    const ordersFromApi = await fetchWithToken(
      `${apiUrl}/bills/${billId}/items`,
      'get',
    );
    setOrders(ordersFromApi);
    setError(null);
  };

  const addOrder = async (billId, order) => {
    setLoading(true);

    console.log('-------------------------------------------');
    console.log('addOrder: ', billId);
    await fetchWithToken(`${apiUrl}/bills/${billId}/items`, 'post', order);
    setError(null);
    sucess('Pedido adicionado com sucesso!');
  };

  const getAllBill = async () => {
    setLoading(true);
    const id = getInLocalStorage('id');
    const decryptedId = decrypt(id);
    try {
      const data = await fetchWithToken(`${apiUrl}/users/${decryptedId}/bills`, 'get');
      setAllBills(data);
      setError(null);
    } catch {
      localStorage.clear();
      navigate('/');
    } finally {
      setLoadingTrue();
    }
  };

  const getFriendConsummation = async (billId, friendName) => {
    setLoading(true);
    try {
      const encodedFriendName = encodeURI(friendName);
      const data = await fetchWithToken(
        `${apiUrl}/bills/${billId}/friendConsumption?friend=${encodedFriendName}`,
        'get',
      );
      return data;
    } catch (e) {
      localStorage.clear();
      navigate('/');
    } finally {
      setLoadingTrue();
    }
  };

  const getCalculation = async (billId) => {
    setLoading(true);
    try {
      const data = await fetchWithToken(`${apiUrl}/bills/${billId}/calculate`, 'get');
      setCalculation(data);
      setError(null);
    } catch (e) {
      localStorage.clear();
      navigate('/');
    } finally {
      setLoadingTrue();
    }
  };

  const finishBill = async (billId) => {
    setLoading(true);
    try {
      await fetchWithToken(`${apiUrl}/bills/${billId}/finish`, 'put');
    } catch (e) {
      setError(e.response.data.message);
      localStorage.clear();
      navigate('/');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, TIME_OUT);
    }
  };

  const deleteBill = async (billId) => {
    setLoading(true);
    const id = getInLocalStorage('id');
    const decryptedId = decrypt(id);
    try {
      await fetchWithToken(`${apiUrl}/users/${decryptedId}/bills/${billId}`, 'delete');
      navigate('/home');
    } catch (e) {
      localStorage.clear();
      navigate('/');
    } finally {
      setLoadingTrue();
    }
  };

  const addSplitOrder = async (billId, order, friends) => {
    setLoading(true);
    console.log('-------------------------------------------');
    console.log('splitOrder friends: ', friends);
    try {
      const body = {
        friends,
        description: `${order.description} (dividido)`,
        value: order.value,
      };
      await fetchWithToken(`${apiUrl}/bills/${billId}/items/split`, 'post', body);
      setError(null);
    } catch (e) {
      localStorage.clear();
      navigate('/');
    } finally {
      setLoadingTrue();
    }
  };

  const value = useMemo(() => ({
    loading,
    bill,
    error,
    openBill,
    getBill,
    orders,
    getOrders,
    addOrder,
    getAllBill,
    allBills,
    getFriendConsummation,
    getCalculation,
    calculation,
    finishBill,
    deleteBill,
    addSplitOrder,
    setError,
  }), [loading, bill, error, orders, allBills, calculation]);

  return (
    <BillContext.Provider value={ value }>
      {children}
    </BillContext.Provider>
  );
}

BillProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BillProvider;
