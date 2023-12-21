import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditUser.module.css';
import Button from './Button';
import Form from './Form';
import Input from './Input';
import Context from '../context/Context';
import useValidation from '../hooks/useValidation';

function EditUser({ onClick, user }) {
  const { updateUser, error } = useContext(Context);
  const { validateUpdateAccount } = useValidation();
  const [isDisabled, setIsDisabled] = useState(true);

  const [update, setUpdate] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    confirmEmail: '',
  });

  const handleSubmit = async () => {
    updateUser(update);
    if (error === 'Usuário atualizado com sucesso!') window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [name]: value,
    }));
  };

  const handleKeyClick = (e) => {
    if (e.code === 'Escape') onClick();
  };

  useEffect(() => {
    const { email, confirmEmail } = update;
    const isValidUpdate = validateUpdateAccount(update);
    const emailsMatch = email === confirmEmail;

    setIsDisabled(!isValidUpdate || !emailsMatch);
  }, [update, validateUpdateAccount]);

  return (
    <div
      className={ styles.container }
      role="button"
      tabIndex={ 0 }
      onKeyUp={ handleKeyClick }
    >
      <Form onSubmit={ handleSubmit }>
        <Input
          placeholder="Digite o novo nome"
          name="name"
          value={ update.name }
          onChange={ handleChange }
        />
        <Input
          placeholder="Digite o novo username"
          name="username"
          value={ update.username }
          onChange={ handleChange }
        />
        <Input
          placeholder="Digite seu novo email"
          type="email"
          name="email"
          value={ update.email }
          onChange={ handleChange }
        />
        <Input
          placeholder="Confirme seu novo email"
          type="email"
          name="confirmEmail"
          value={ update.confirmEmail }
          onChange={ handleChange }
        />
        {error && <span>{error}</span>}
        <section className={ styles.buttons }>
          <Button disabled={ isDisabled } type="submit">
            Salvar
          </Button>
          <Button type="reset" onClick={ onClick }>
            Cancelar
          </Button>
        </section>
      </Form>
    </div>
  );
}

EditUser.propTypes = {
  onClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditUser;
