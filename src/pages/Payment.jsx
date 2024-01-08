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
import TakePhoto from '../components/TakePhoto';

function Payment() {
  const { orders, getOrders, finishBill, loading } = useContext(BillContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [friends, setFriends] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [paidFriends, setPaidFriends] = useState([]);
  const [finished, setFinished] = useState(false);
  const [takePhoto, setTakePhoto] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  const { getFriendsName } = useFriendFormatter();

  const clickHandler = () => {
    setPaidFriends((prevPaidFriends) => [...prevPaidFriends, friends[currIndex]]);
  };

  const handleSubmit = async () => {
    await finishBill(pathname.split('/')[3]);
    navigate('/home');
  };

  useEffect(() => {
    getOrders(pathname.split('/')[3]);
  }, []);

  useEffect(() => {
    setDisablePrev(currIndex === 0);
    setDisableNext(currIndex === friends.length - 1);
  }, [currIndex]);

  useEffect(() => {
    setFriends(getFriendsName(orders));
  }, [orders]);

  useEffect(() => {
    setFinished(friends.length > 0 && paidFriends.length === friends.length);
  }, [paidFriends, friends]);

  const changeFriend = (newIndex) => {
    if (newIndex >= 0 && newIndex < friends.length) {
      setCurrIndex(newIndex);
    }
  };

  if (friends.length === 0 && loading) return <CustomSpinner />;

  return (
    <main className={ styles.container }>
      <BackButton />
      <PaymentCard
        friend={ friends[currIndex] }
        status={ paidFriends.includes(friends[currIndex]) ? 'Pago' : 'Pendente' }
        clickHandler={ clickHandler }
      />
      {
        friends.length > 0 && (
          <Pagination className={ styles.pagination }>
            <Pagination.Prev
              className={ disablePrev ? styles.pageButtonDisabled : styles.pageButton }
              onClick={ () => changeFriend(currIndex - 1) }
            />
            <Pagination.Next
              className={ disableNext ? styles.pageButtonDisabled : styles.pageButton }
              onClick={ () => changeFriend(currIndex + 1) }
            />
          </Pagination>
        )
      }

      {finished && (
        <main className={ styles.finishButton }>
          <div>
            <h2>Conta paga!</h2>
            <span>Os valores podem estar diferentes, confira!</span>

            {!takePhoto ? (
              <p>
                Deseja registrar este momento com uma foto?
                <button
                  className={ styles.takePhotoBtn }
                  type="button"
                  onClick={ () => setTakePhoto(true) }
                >
                  clique aqui
                </button>
              </p>
            ) : (
              <TakePhoto setTakePhoto={ setTakePhoto } />
            )}

            <section className={ styles.buttons }>
              <Button
                className={ styles.finishButton }
                type="button"
                onClick={ handleSubmit }
                disabled={ !finished }
              >
                Finalizar
              </Button>
            </section>
          </div>
        </main>
      )}
    </main>
  );
}

export default Payment;
