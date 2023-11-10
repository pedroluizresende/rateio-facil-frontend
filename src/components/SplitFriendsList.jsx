import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Button from './Button';
import Input from './Input';
import styles from './SplitFriendsList.module.css';

function SplitFriendsList({ friends, setSplitFriend }) {
  const [newFriend, setNewFriend] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [allFriends, setAllFriends] = useState(friends.map((friend) => (
    {
      name: friend,
      isChecked: false,
    }
  )));

  const handleChange = (e) => {
    if (e.target.checked) {
      setAllFriends((prevState) => prevState.map((friend) => {
        if (friend.name === e.target.value) {
          return { ...friend, isChecked: true };
        }
        return friend;
      }));
      setSplitFriend((prevState) => [...prevState, e.target.value]);
    } else {
      setAllFriends((prevState) => prevState.map((friend) => {
        if (friend.name === e.target.value) {
          return { ...friend, isChecked: false };
        }
        return friend;
      }));
      setSplitFriend((prevState) => prevState
        .filter((friend) => friend !== e.target.value));
    }
  };

  const handleAddFriend = () => {
    if (newFriend.trim() !== '') {
      setAllFriends((prevState) => [...prevState, {
        name: newFriend,
        isChecked: true,
      }]);
      setSplitFriend((prevState) => [...prevState, newFriend]);
      setNewFriend('');
    }
  };

  useEffect(() => {
    if (newFriend.trim() !== '') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newFriend]);
  return (
    <div className={ styles.container }>
      <div className={ styles.addFriendContainer }>
        <Input
          name="addFriend"
          type="text"
          value={ newFriend }
          onChange={ (e) => setNewFriend(e.target.value) }
          placeholder="Digite o nome de seu amigo"
        />
        <Button
          disabled={ isDisabled }
          onClick={ handleAddFriend }
        >
          Add Amigo
        </Button>
      </div>
      {
        allFriends.length !== 0
        && (
          <ul>
            {allFriends.map((friend) => (
              <li key={ friend.name }>
                <Checkbox
                  checked={ friend.isChecked }
                  id={ friend.name }
                  value={ friend.name }
                  text={ friend.name }
                  onChange={ handleChange }
                />
              </li>
            ))}
          </ul>

        )
      }
    </div>
  );
}

SplitFriendsList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSplitFriend: PropTypes.func.isRequired,
};

export default SplitFriendsList;
