import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './Login.module.css';
import Context from '../context/Context';
import Link from '../components/Link';
import { getInLocalStorage } from '../utils/localStorage';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const MIN_PASSWORD_LENGTH = 6;
  const disabled = !password || password.length < MIN_PASSWORD_LENGTH;

  const navigate = useNavigate();

  const { login, error, sucess } = useContext(Context);

  const handleChange = ({ target }) => {
    if (target.name === 'password') {
      setPassword(target.value);
    } else {
      setUsername(target.value);
    }
  };

  useEffect(() => {
    const id = getInLocalStorage('id');

    if (id) {
      navigate('/home');
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <main className={ styles.container }>
      <Form onSubmit={ handleSubmit }>
        <h1>Bem vindo!</h1>
        <Input
          placeholder="Digite seu username"
          type="text"
          name="username"
          required
          value={ username }
          onChange={ handleChange }
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          name="password"
          value={ password }
          required
          onChange={ handleChange }
        />
        {error && <span className={ styles.error }>{error}</span>}
        {sucess && <span className={ styles.sucess }>{sucess}</span>}
        <Button type="submit" disabled={ disabled }>Sign In</Button>

        <p>
          Não tem uma conta?
          {' '}
          <Link to="criar-conta">Cadastre-se</Link>
        </p>
      </Form>
    </main>
  );
}

export default Login;
