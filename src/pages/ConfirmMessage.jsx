import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styles from './ConfirmMessage.module.css';

function ConfirmMessage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, name } = location.state || {
    email: '',
    name: '',
  };
  return (
    <main className={ styles.container }>
      <div className={ styles.confirmMessage }>
        <h1>
          {`Olá ${name}, obrigado por se juntar a nós!`}
        </h1>
        <p>
          {`Enviamos um email de confirmação para ${email}.`}
        </p>
        <p>
          Por favor, confirme seu email para poder utilizar a plataforma.
        </p>
        <Button
          onClick={ () => navigate('/') }
        >
          Ir para a página de login
        </Button>
      </div>
    </main>
  );
}

export default ConfirmMessage;
