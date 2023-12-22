import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getInLocalStorage } from '../utils/localStorage';
import { decrypt } from '../utils/crypto';
import BillContext from './BillContext';
import useToken from '../hooks/useToken';
import apiRequest from '../utils/api';
import handleApiError from '../utils/errors';
import useUpload from '../hooks/useUpLoad';

function BillProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState(null);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [allBills, setAllBills] = useState([]);
  const [calculation, setCalculation] = useState({});
  const [success, setSuccess] = useState(null);

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
      setSuccess(null);
      const response = await apiRequest(url, method, data, config);
      setError(null);
      return response.data;
    } catch (e) {
      handleApiError(e, setError, navigate);
      setSuccess(null);
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
    setLoadingTrue();
  };

  const getBill = async (billId) => {
    setLoading(true);
    setBill(null);
    const id = getInLocalStorage('id');
    const decryptedId = decrypt(id);
    const billFromApi = await fetchWithToken(
      `${apiUrl}/users/${decryptedId}/bills/${billId}`,
      'get',
    );
    setBill(billFromApi);
    setError(null);
    setLoadingTrue();
  };

  const getOrders = async (billId) => {
    setLoading(true);
    setOrders([]);
    const ordersFromApi = await fetchWithToken(
      `${apiUrl}/bills/${billId}/items`,
      'get',
    );
    setOrders(ordersFromApi);
    setError(null);
    setLoadingTrue();
  };

  const addOrder = async (billId, order) => {
    setLoading(true);
    await fetchWithToken(`${apiUrl}/bills/${billId}/items`, 'post', order);

    setError(null);
    setSuccess('Pedido adicionado com sucesso!');

    setLoadingTrue();
  };

  const addSplitOrder = async (billId, order, friends) => {
    setLoading(true);
    const body = {
      friends,
      description: `${order.description} (dividido)`,
      value: order.value,
    };
    await fetchWithToken(`${apiUrl}/bills/${billId}/items/split`, 'post', body);
    setError(null);
    setSuccess('Pedido adicionado com sucesso!');

    setLoadingTrue();
  };

  const getAllBill = async () => {
    setLoading(true);
    const id = getInLocalStorage('id');
    const decryptedId = decrypt(id);
    const data = await fetchWithToken(`${apiUrl}/users/${decryptedId}/bills`, 'get');
    setAllBills(data);
    setError(null);
    setLoadingTrue();
  };

  const getFriendConsummation = async (billId, friendName) => {
    setLoading(true);
    const encodedFriendName = encodeURI(friendName);
    const data = await fetchWithToken(
      `${apiUrl}/bills/${billId}/friendConsumption?friend=${encodedFriendName}`,
      'get',
    );
    setLoadingTrue();
    return data;
  };

  const getCalculation = async (billId) => {
    setLoading(true);
    const data = await fetchWithToken(`${apiUrl}/bills/${billId}/calculate`, 'get');
    setCalculation(data);
    setError(null);
    setLoadingTrue();
  };

  const finishBill = async (billId) => {
    setLoading(true);
    await fetchWithToken(`${apiUrl}/bills/${billId}/finish`, 'put');

    setLoadingTrue();
  };

  const deleteBill = async (billId) => {
    setLoading(true);
    const id = getInLocalStorage('id');
    const decryptedId = decrypt(id);
    await fetchWithToken(`${apiUrl}/users/${decryptedId}/bills/${billId}`, 'delete');
    navigate('/home');
  };

  const addImg = async (imgUrl) => {
    setLoading(true);
    setSuccess(null);
    const response = await
    fetchWithToken(`${apiUrl}/bills/${bill.id}/imgUrl`, 'put', { imgUrl });
    setSuccess(response.data.message);
    setBill(response.data.data);

    setLoadingTrue();
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
    addImg,
    success,
  }), [loading, bill, error, orders, allBills, calculation, success]);

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
