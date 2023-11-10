import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Confirmation.module.css';
import CustomSpinner from '../components/CustomSpinner';
import Context from '../context/Context';

function Confirmation() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { confirmUser } = useContext(Context);

  const location = useLocation();

  useEffect(() => {
    const token = location.search.split('=')[1];
    confirmUser(token).then(() => setIsConfirmed(true));
  }, []);

  if (!isConfirmed) return <CustomSpinner />;
  return (
    <main className={ styles.container }>
      <p>Sua conta foi confirmada com sucesso!</p>
      <Link to="/">
        <p>Ir para a página de login</p>
      </Link>
    </main>
  );
}

export default Confirmation;
