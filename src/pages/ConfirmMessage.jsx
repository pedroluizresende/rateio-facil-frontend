import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import styles from './ConfirmMessage.module.css';
import Context from '../context/Context';

function ConfirmMessage() {
  const location = useLocation();

  const { email, name } = location.state || {
    email: '',
    name: '',
  };

  const { logout } = useContext(Context);
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
          onClick={ () => {
            logout();
          } }
        >
          Ir para a página de login
        </Button>
      </div>
    </main>
  );
}

export default ConfirmMessage;
