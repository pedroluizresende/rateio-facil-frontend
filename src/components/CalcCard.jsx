import React from 'react';
import PropTypes from 'prop-types';
import styles from './CalcCard.module.css';
import ListItem from './ListItem';

function CalcCard({ calculation }) {
  if (!calculation) {
    return null;
  }

  const { establishment, value, taxService, total } = calculation;

  return (
    <div className={ styles.card }>
      <ul>
        <ListItem label="Estabelecimento" value={ establishment } />
        <ListItem label="Valor" value={ `R$ ${value && value.toFixed(2)}` } />
        <ListItem
          label="Taxa de Serviço"
          value={ `R$ ${taxService && taxService.toFixed(2)}` }
        />
        <ListItem label="Total" value={ `R$ ${total}` } />
      </ul>
      <span>Confira os valores com o garçom!</span>
    </div>
  );
}

CalcCard.propTypes = {
  calculation: PropTypes.shape({
    establishment: PropTypes.string,
    value: PropTypes.number,
    taxService: PropTypes.number,
    total: PropTypes.number,
  }),
};

CalcCard.defaultProps = {
  calculation: {
    establishment: '',
    value: 0,
    taxService: 0,
    total: 0,
  },
};

export default CalcCard;
