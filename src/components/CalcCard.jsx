import React from 'react';
import PropTypes from 'prop-types';
import styles from './CalcCard.module.css';

function CalcCard({ calculation }) {
  if (calculation) {
    const { establishment, value, taxService, total } = calculation;
    return (
      <div className={ styles.card }>
        <ul>
          <li>
            <strong>
              Estabelcimento:
            </strong>
            <p>
              {establishment}
            </p>
          </li>
          <li>
            <strong>
              Valor:
            </strong>
            <p>
              {`R$ ${value}`}
            </p>
          </li>
          <li>
            <strong>
              Taxa de Serviço:
            </strong>
            <p>
              {`R$ ${taxService}`}
            </p>
          </li>
          <li>
            <strong>
              Total:
            </strong>
            <p>
              {`R$ ${total}`}
            </p>
          </li>
        </ul>
        <span>confira os valores com o garçom!</span>
      </div>
    );
  }
}

CalcCard.propTypes = {
  calculation: PropTypes.shape({
    establishment: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    taxService: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
  }).isRequired,
};

export default CalcCard;
