import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './Login.module.css';
import Context from '../context/Context';
import Link from '../components/Link';
import { getInLocalStorage } from '../utils/localStorage';
import Footer from '../components/Footer';
import Checkbox from '../components/Checkbox';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const MIN_PASSWORD_LENGTH = 6;
  const disabled = !password || password.length < MIN_PASSWORD_LENGTH;

  const navigate = useNavigate();

  const { login, error, success } = useContext(Context);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setPassword(value);
    } else {
      setUsername(value);
    }
  };

  useEffect(() => {
    const id = getInLocalStorage('id');
    if (id) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = () => {
    login(username, password, remember);
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
        {success && <span className={ styles.success }>{success}</span>}
        <Checkbox
          text="Lembrar-me"
          id="checkRemember"
          value="remember"
          onChange={ (e) => setRemember(e.target.checked) }
          checked={ remember }
        />
        <Button type="submit" disabled={ disabled }>
          Sign In
        </Button>

        <p>
          Não tem uma conta?
          {' '}
          <Link to="criar-conta">Cadastre-se</Link>
        </p>
      </Form>
      <Footer />
    </main>
  );
}

export default Login;
