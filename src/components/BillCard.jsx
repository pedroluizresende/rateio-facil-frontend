import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './BillCard.module.css';
import { getInLocalStorage } from '../utils/localStorage';
import { decrypt } from '../utils/crypto';
import useDateFormatter from '../hooks/useDateFormatter';
import Bill from '../pages/Bill';

function BillCard({ bill }) {
  const navigate = useNavigate();

  const clickChange = () => {
    const id = getInLocalStorage('id');
    const decryptedId = decrypt(id);
    navigate(`/${decryptedId}/bill/${bill.id}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') clickChange();
  };

  const { formatDate } = useDateFormatter();

  return (
    <div
      className={ styles.card }
      role="button"
      tabIndex={ 0 }
      onClick={ clickChange }
      onKeyUp={ handleKeyPress }
    >
      <h1>{bill.establishment}</h1>

      <div>
        <p>
          Data:
          {' '}
          {formatDate(bill.date)}
        </p>
        <p>
          Valor:
          {' '}
          { `R$ ${bill.total.toFixed(2)}` }
        </p>
      </div>

    </div>
  );
}

BillCard.propTypes = {
  bill: PropTypes.shape({
    id: PropTypes.number,
    establishment: PropTypes.string,
    date: PropTypes.string,
    total: PropTypes.number,
  }),
};

BillCard.defaultProps = {
  bill: {
    id: 0,
    establishment: '',
    date: '',
    total: 0,
  },
};

export default BillCard;
