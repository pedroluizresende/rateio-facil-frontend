import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Form from './Form';
import Button from './Button';
import styles from './CreateOrderForm.module.css';
import Checkbox from './Checkbox';
import Select from './Select';
import BillContext from '../context/BillContext';
import Context from '../context/Context';
import useFriendFormatter from '../hooks/useFriendFormatter';
import SplitFriendsList from './SplitFriendsList';
import useValidation from '../hooks/useValidation';

function CreateOrderForm({ onClick, billId }) {
  const [newFriend, setNewFriend] = useState(false);
  const { user } = useContext(Context);
  const [order, setOrder] = useState({
    friend: user.name,
    description: '',
    value: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [split, setSplit] = useState(false);
  const [splitFriend, setSplitFriend] = useState([]);
  const [friends, setFriends] = useState([]);
  const { getFriendsName } = useFriendFormatter();
  const { validateNewOrder } = useValidation();

  const { orders, addOrder, addSplitOrder, error } = useContext(BillContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (split) {
      await addSplitOrder(billId, order, [...splitFriend, order.friend]);
    } else {
      await addOrder(billId, order);
    }
    onClick();
    window.location.reload();
  };

  useEffect(() => {
    if (validateNewOrder(order)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [order]);

  useEffect(() => {
    setFriends(getFriendsName(orders));
    if (newFriend) {
      setOrder((prevState) => ({ ...prevState, friend: '' }));
    } else {
      setOrder((prevState) => ({ ...prevState, friend: user.name }));
    }
  }, [orders, newFriend]);

  const handleKeyClick = (e) => {
    if (e.code === 'Escape') onClick();
  };

  const handleChange = (e) => {
    if (e.target.name === 'friendSelect') {
      setOrder((prevState) => ({ ...prevState, friend: e.target.value }));
    } else if (e.target.name === 'value') {
      setOrder((prevState) => ({
        ...prevState, [e.target.name]: e.target.value.replace(',', '.') }));
    } else {
      setOrder((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }
  };
  return (
    <div
      className={ styles.container }
      role="button"
      tabIndex={ 0 }
      onKeyUp={ handleKeyClick }
    >
      <Form onSubmit={ handleSubmit }>
        <Checkbox
          text="novo amigo?"
          id="checkNewFriend"
          onChange={ (e) => {
            setNewFriend(e.target.checked);
          } }
          value="newFriend"
        />

        { newFriend ? (
          <Input
            placeholder="Nome do amigo"
            type="text"
            onChange={ handleChange }
            name="friend"
            value={ order.friend }
          />
        ) : (
          <Select
            options={ friends.filter((friend) => friend !== user.name) }
            name="friendSelect"
            onChange={ handleChange }
          />
        )}
        <Input
          placeholder="Descrição do pedido"
          type="text"
          onChange={ handleChange }
          name="description"
          value={ order.description }
        />
        <Input
          placeholder="Valor ex: 10.00"
          type="text"
          onChange={ handleChange }
          name="value"
          value={ order.value }
        />

        <Checkbox
          text="Dividir com um  amigo?"
          id="checkSplit"
          onChange={ (e) => setSplit(e.target.checked) }
          value="split"
        />
        {
          split && (
            <SplitFriendsList
              setSplitFriend={ setSplitFriend }
              friends={ friends.filter((friend) => friend !== order.friend) }
            />
          )
        }

        {
          error && <span>{error}</span>
        }
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

CreateOrderForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  billId: PropTypes.number.isRequired,
};

export default CreateOrderForm;