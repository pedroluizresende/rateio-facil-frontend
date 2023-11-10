import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import styles from './CreateBillForm.module.css';
import Input from './Input';
import Button from './Button';
import BillContext from '../context/BillContext';

function CreateBillForm({ onClick }) {
  const [estabilishment, setEstabilishment] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { openBill, error } = useContext(BillContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    openBill(estabilishment);
  };

  const handleChange = (e) => {
    setEstabilishment(e.target.value);
  };

  const handleKeyClick = (e) => {
    if (e.code === 'Escape') onClick();
  };

  useEffect(() => {
    if (estabilishment.length > 0) setIsDisabled(false);
    else setIsDisabled(true);
  }, [estabilishment]);
  return (
    <div
      className={ styles.container }
      role="button" // Definir um papel apropriado
      tabIndex={ 0 }// Adicionar suporte a mouse
      onKeyUp={ handleKeyClick }
    >
      <Form onSubmit={ handleSubmit }>
        <Input
          type="text"
          placeholder="Digite o nome do estabelecimento"
          onChange={ handleChange }
          name="estabilishment"
          value={ estabilishment }
        />
        {error && <span>{error}</span>}
        <section className={ styles.buttons }>
          <Button
            type="submit"
            disabled={ isDisabled }
          >
            Iniciar

          </Button>
          <Button type="reset" onClick={ onClick }>Cancelar</Button>
        </section>
      </Form>
    </div>
  );
}

CreateBillForm.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateBillForm;
