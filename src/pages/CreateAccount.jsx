import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';
import styles from './CreateAccount.module.css';
import useValidation from '../hooks/useValidation';
import Context from '../context/Context';
import CustomSpinner from '../components/CustomSpinner';
import Footer from '../components/Footer';

function CreateAccount() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    confirmEmail: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const { validateNewAccount } = useValidation();
  const { error, createUser, loading } = useContext(Context);

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUser(account);
  };

  useEffect(() => {
    const { confirmEmail, email } = account;

    if (validateNewAccount(account) && confirmEmail === email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [account]);

  return (
    <main className={ styles.container }>
      <h1>Cadastre-se para poder utilizar a plataforma!</h1>
      <Form onSubmit={ handleSubmit }>
        <Input
          placeholder="Digite seu nome"
          type="text"
          required
          value={ account.name }
          onChange={ handleChanges }
          name="name"
        />
        <Input
          placeholder="Digite seu email"
          type="email"
          value={ account.email }
          onChange={ handleChanges }
          name="email"
        />
        <Input
          placeholder="Confirme seu email"
          type="email"
          value={ account.confirmEmail }
          onChange={ handleChanges }
          name="confirmEmail"
        />
        <Input
          placeholder="Digite seu username"
          type="text"
          value={ account.username }
          onChange={ handleChanges }
          name="username"
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          value={ account.password }
          onChange={ handleChanges }
          name="password"
        />
        <Input
          placeholder="Digite confirme sua senha"
          type="password"
          value={ account.confirmPassword }
          onChange={ handleChanges }
          name="confirmPassword"
        />

        {error && <span>{error}</span>}
        <section className={ styles.buttons }>

          <Button
            disabled={ isDisabled }
            type="submit"
          >
            Cadastrar

          </Button>
          <Button
            type="reset"
            onClick={ (e) => {
              e.preventDefault();
              navigate('/');
            } }
          >
            Cancelar

          </Button>

        </section>
      </Form>
    </main>

  );
}

export default CreateAccount;
