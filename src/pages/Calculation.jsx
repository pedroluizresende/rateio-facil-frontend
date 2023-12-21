import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Calculation.module.css';
import BillContext from '../context/BillContext';
import Button from '../components/Button';
import CalcCard from '../components/CalcCard';
import Checkbox from '../components/Checkbox';
import CustomSpinner from '../components/CustomSpinner';
import BackButton from '../components/BackButton';

function Calculation() {
  const { getCalculation, calculation, loading } = useContext(BillContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const billId = pathname.split('/')[3];
    getCalculation(billId);
  }, []);

  if (loading) {
    return <CustomSpinner />;
  }

  const handlePaymentClick = () => {
    navigate(`/${calculation.userId}/bill/${calculation.billId}/pagamento`);
  };

  return (
    <main className={ styles.container }>
      <BackButton />
      <h1 className={ styles.title }>Sua conta!</h1>

      <CalcCard calculation={ calculation } />

      <Checkbox
        text="Esta correto?"
        onChange={ () => setIsCorrect(!isCorrect) }
        checked={ isCorrect }
      />

      <Button onClick={ handlePaymentClick } disabled={ !isCorrect }>
        Pagar
      </Button>
    </main>
  );
}

export default Calculation;
