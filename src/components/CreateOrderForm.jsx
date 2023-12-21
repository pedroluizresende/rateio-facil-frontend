import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Form from './Form';
import Button from './Button';
import styles from './CreateOrderForm.module.css';
import Checkbox from './Checkbox';
import Select from './Select';
import BillContext from '../context/BillContext';
import useFriendFormatter from '../hooks/useFriendFormatter';
import SplitFriendsList from './SplitFriendsList';
import useValidation from '../hooks/useValidation';

function CreateOrderForm({ onClick, billId, user }) {
  const [newFriend, setNewFriend] = useState(false);
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

  const handleSubmit = async () => {
    if (split) {
      await addSplitOrder(billId, order, [...splitFriend, order.friend]);
    } else {
      await addOrder(billId, order);
    }
    onClick(false);
  };

  const handleKeyClick = (e) => {
    if (e.code === 'Escape') onClick(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrder((prevState) => {
      if (name === 'friendSelect') {
        return { ...prevState, friend: value };
      }
      if (name === 'value') {
        return { ...prevState, [name]: value.replace(',', '.') };
      }
      return { ...prevState, [name]: value };
    });
  };

  const handleClick = () => {
    handleKeyClick({ code: 'Enter' });
  };

  useEffect(() => {
    setIsDisabled(!validateNewOrder(order));
  }, [order]);

  useEffect(() => {
    setFriends(getFriendsName(orders));
    setOrder((prevState) => ({
      ...prevState,
      friend: newFriend ? '' : user.name,
    }));
  }, [orders, newFriend]);

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
        <Checkbox
          text="novo amigo?"
          id="checkNewFriend"
          onChange={ (e) => setNewFriend(e.target.checked) }
          value="newFriend"
          checked={ newFriend }
        />

        {newFriend ? (
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
          checked={ split }
        />
        {split && (
          <SplitFriendsList
            setSplitFriend={ setSplitFriend }
            friends={
              user.name === order.friend
                ? friends.filter((friend) => friend !== user.name)
                : [user.name, ...friends.filter((friend) => friend !== user.name)]
            }
          />
        )}

        {error && <span>{error}</span>}
        <section className={ styles.buttons }>
          <Button type="submit" disabled={ isDisabled }>
            Adicionar
          </Button>
          <Button type="reset" onClick={ () => onClick(false) }>
            Cancelar
          </Button>
        </section>
      </Form>
    </div>
  );
}

CreateOrderForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  billId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreateOrderForm;
