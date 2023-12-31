import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import BillContext from '../context/BillContext';
import styles from './PaymentCard.module.css';
import Button from './Button';
import CustomSpinner from './CustomSpinner';

function PaymentCard({ friend, status, clickHandler }) {
  const [consummation, setConsummation] = useState(null);
  const { pathname } = useLocation();
  const { getFriendConsummation, loading } = useContext(BillContext);

  const setConsummationState = async () => {
    const billId = pathname.split('/')[3];

    if (friend) {
      const data = await getFriendConsummation(billId, friend);
      setConsummation(data);
    }
  };

  useEffect(() => {
    setConsummationState();
  }, [friend]);

  if (loading) return <CustomSpinner />;

  if (consummation) {
    const { items, value, taxService, total } = consummation;
    return (
      <div className={ styles.card }>
        <h1>{friend}</h1>
        <ul className={ styles.list }>
          {items && items.map((item, index) => (
            <li className={ styles.listItem } key={ `${item.description}-${index}` }>
              <p>{item.description}</p>
              <p>{`R$ ${item.value.toFixed(2)}`}</p>
            </li>
          ))}
        </ul>
        <p>{`Valor: R$ ${value.toFixed(2)}`}</p>
        <p>{`Taxa de serviço: R$ ${taxService.toFixed(2)}`}</p>
        <p>
          <strong>{`Total: R$ ${total.toFixed(2)}`}</strong>
          {status === 'Pago' && <span className={ styles.paid }>{` (${status})`}</span>}
        </p>
        {status === 'Pendente' && <Button onClick={ clickHandler }>Paguei!</Button>}
      </div>
    );
  }

  return null; // Renderiza null se consummation for falsy
}

PaymentCard.propTypes = {
  friend: PropTypes.string,
  status: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

PaymentCard.defaultProps = {
  friend: '',
};

export default PaymentCard;
