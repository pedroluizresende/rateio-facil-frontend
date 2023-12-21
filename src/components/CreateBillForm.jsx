import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import styles from './CreateBillForm.module.css';
import Input from './Input';
import Button from './Button';
import BillContext from '../context/BillContext';

function CreateBillForm({ onClick }) {
  const [establishment, setEstablishment] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { openBill, error } = useContext(BillContext);

  const handleSubmit = () => {
    openBill(establishment);
  };

  const handleChange = (e) => {
    setEstablishment(e.target.value);
  };

  const handleKeyClick = (e) => {
    if (e.code === 'Escape') onClick();
  };

  const handleClick = () => {
    handleKeyClick({ code: 'Enter' });
  };

  useEffect(() => {
    setIsDisabled(establishment.length === 0);
  }, [establishment]);

  return (
    <div
      className={ styles.container }
      role="button"
      aria-labelledby="criar-conta"
      tabIndex={ 0 }
      onKeyUp={ handleKeyClick }
      onClick={ handleClick }
    >
      <Form onSubmit={ handleSubmit }>
        <Input
          type="text"
          placeholder="Digite o nome do estabelecimento"
          onChange={ handleChange }
          name="establishment"
          value={ establishment }
          autoFocus
        />
        {error && <span>{error}</span>}
        <section className={ styles.buttons }>
          <Button type="submit" disabled={ isDisabled }>
            Iniciar
          </Button>
          <Button type="reset" onClick={ onClick }>
            Cancelar
          </Button>
        </section>
      </Form>
    </div>
  );
}

CreateBillForm.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateBillForm;
