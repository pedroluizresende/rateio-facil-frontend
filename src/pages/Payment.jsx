import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import BillContext from '../context/BillContext';
import useFriendFormatter from '../hooks/useFriendFormatter';
import styles from './Payment.module.css';
import BackButton from '../components/BackButton';
import PaymentCard from '../components/PaymentCard';
import Button from '../components/Button';
import CustomSpinner from '../components/CustomSpinner';

function Payment() {
  const [friends, setFriends] = useState([]);
  const { orders, getOrders, finishBill, loading } = useContext(BillContext);
  const [currIndex, setCurrIndex] = useState(0);
  const [paidFriends, setPaidFriends] = useState([]);
  const [finished, setFinished] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { getFriendsName } = useFriendFormatter();

  const clickHandler = () => {
    setPaidFriends([...paidFriends, friends[currIndex]]);
  };

  const handleSubmit = async () => {
    await finishBill(pathname.split('/')[3]);
    navigate('/home');
  };

  useEffect(() => {
    setFriends([]);
    setCurrIndex(0);
    setPaidFriends([]);
    setFinished(false);
    getOrders(pathname.split('/')[3]);
  }, [pathname]);

  useEffect(() => {
    setFriends([...getFriendsName(orders)]);
  }, [orders]);

  useEffect(() => {
    setTimeout(() => {
      if (paidFriends.length === friends.length && friends.length !== 0) {
        setFinished(true);
      } else {
        setFinished(false);
      }
    }, 100);
  }, [paidFriends]);

  if (friends.length === 0 && loading) return <CustomSpinner />;

  const changeFriend = (newIndex) => {
    if (newIndex >= 0 && newIndex < friends.length) {
      setCurrIndex(newIndex);
    }
  };
  return (
    <main className={ styles.container }>
      <BackButton />
      <PaymentCard
        friend={ friends[currIndex] }
        status={ paidFriends.includes(friends[currIndex]) ? 'Pago' : 'Pendente' }
        clickHandler={ clickHandler }
      />
      <Pagination className={ styles.pagination }>
        <Pagination.Prev
          className={ styles.pageButton }
          onClick={ () => changeFriend(currIndex - 1) }
        />
        <Pagination.Next
          className={ styles.pageButton }
          onClick={ () => changeFriend(currIndex + 1) }
        />
      </Pagination>

      {
        finished && (
          <main className={ styles.finishButton }>
            <div>
              <h2>Conta paga!</h2>
              <span>Os valores podem estar diferentes, confira!</span>
              <Button
                className={ styles.finishButton }
                type="button"
                onClick={ handleSubmit }
              >
                Finalizar
              </Button>
            </div>
          </main>
        )
      }
    </main>
  );
}

export default Payment;
