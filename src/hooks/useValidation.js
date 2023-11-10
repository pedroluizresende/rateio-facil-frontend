import { useContext } from 'react';
import Context from '../context/Context';
import BillContext from '../context/BillContext';

function useValidation() {
  const { setError: setErrorUser } = useContext(Context);
  const { setError: setErrorBill } = useContext(BillContext);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password, confirmPassword) => {
    const MIN_PASSWORD_LENGTH = 6;
    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorUser('Senha deve ter mais de 6 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorUser('Senhas não conferem');
      return false;
    }

    return true;
  };

  function validateNewAccount(account) {
    const MIN_USERNAME_LENGTH = 4;
    if (account.name.length < 2) {
      setErrorUser('Nome é obrigatório! e deve ter mais de 2 caracteres');
      return false;
    }

    if (!validateEmail(account.email)) {
      setErrorUser('Email inválido!');
      return false;
    }

    if (account.username < MIN_USERNAME_LENGTH) {
      setErrorUser('Usuário é obrigatório e deve ter mais de 4 caracteres');
      return false;
    }
    setErrorUser(null);

    return validatePassword(account.password, account.confirmPassword);
  }

  function validateUpdateAccount(account) {
    const MIN_USERNAME_LENGTH = 4;
    if (account.name.length < 2) {
      setErrorUser('Nome é obrigatório! e deve ter mais de 2 caracteres');
      return false;
    }

    if (!validateEmail(account.email)) {
      setErrorUser('Email inválido!');
      return false;
    }

    if (account.username < MIN_USERNAME_LENGTH) {
      setErrorUser('Usuário é obrigatório e deve ter mais de 4 caracteres');
      return false;
    }
    setErrorUser(null);

    return true;
  }

  const validateNewOrder = (order) => {
    const { friend, description, value } = order;

    if (!friend) {
      setErrorBill('Amigo é obrigatório!');
      return false;
    }

    if (friend.length < 2) {
      setErrorBill('Amigo deve ter mais de 2 caracteres!');
      return false;
    }

    if (!description) {
      setErrorBill('Descrição é obrigatório!');
      return false;
    }

    if (Number.isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      setErrorBill('Preço deve ser um número maior que zero!');
      return false;
    }
    setErrorBill(null);
    return true;
  };

  return {
    validateNewAccount,
    validateNewOrder,
    validateUpdateAccount,
  };
}

export default useValidation;
