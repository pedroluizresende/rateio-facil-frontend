import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BillContext from '../context/BillContext';
import styles from './Bill.module.css';
import Button from '../components/Button';
import CreateOrderForm from '../components/CreateOrderForm';
import Context from '../context/Context';
import Header from '../components/Header';
import useDateFormatter from '../hooks/useDateFormatter';
import useFriendFormatter from '../hooks/useFriendFormatter';
import FriendsAccordion from '../components/FriendsAccordion';
import CustomSpinner from '../components/CustomSpinner';

function Bill() {
  const {
    bill,
    getBill,
    loading,
    getOrders,
    orders,
    deleteBill,
    success,
  } = useContext(BillContext);

  const { getUser, user } = useContext(Context);
  const location = useLocation();
  const { formatDate } = useDateFormatter();
  const { getFriendsName } = useFriendFormatter();
  const navigate = useNavigate();

  const [friends, setFriends] = useState([]);
  const [addOrder, setAddOrder] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const loadData = async () => {
    if (!addOrder) {
      const billId = location.pathname.split('/')[3];
      await getBill(billId);
      await getOrders(billId);
    }
  };

  useEffect(() => {
    loadData();
  }, [addOrder]);

  useEffect(() => {
    if (bill) {
      getUser(bill.userId);
    }
    setFriends([...getFriendsName(orders)]);
    setDisabled(orders.length === 0);
  }, [bill, orders]);

  if (loading || !bill) return <CustomSpinner />;

  return (
    <main className={ styles.container }>
      <Header />
      <h1>{bill.establishment}</h1>
      <h2>{formatDate(bill.date)}</h2>
      <FriendsAccordion friends={ friends } />

      {bill.status === 'OPEN' && (
        <Button type="button" onClick={ () => setAddOrder(!addOrder) }>
          Adicionar Pedido
        </Button>
      )}
      <h3>
        {`R$ ${bill.total.toFixed(2)}`}
        {bill.status === 'CLOSED' && ' (Conta finalizada)'}
      </h3>

      {success && <span className={ styles.success }>{success}</span>}

      {bill.status === 'OPEN' && (
        <section className={ styles.buttons }>
          <Button
            type="button"
            onClick={ () => navigate(`/${bill.userId}/bill/${bill.id}/calculo`) }
            disabled={ disabled }
          >
            Finalizar
          </Button>
          <Button type="reset" onClick={ async () => deleteBill(bill.id) }>
            Cancelar
          </Button>
        </section>
      )}

      {addOrder && (
        <CreateOrderForm
          user={ user }
          billId={ bill.id }
          onClick={ () => setAddOrder(!addOrder) }
        />
      )}

      {bill.imgUrl && <img
        className={ styles.img }
        src={ bill.imgUrl }
        alt="Imagem da conta"
      />}
    </main>
  );
}

export default Bill;
