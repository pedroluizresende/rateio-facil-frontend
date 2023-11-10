import React, { useContext, useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import Context from '../context/Context';
import styles from './Perfil.module.css';
import Header from '../components/Header';
import EditUser from '../components/EditUser';
import CustomSpinner from '../components/CustomSpinner';

function Perfil() {
  const { user, getUser, loading } = useContext(Context);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setEdit(false);
    if (!user.id) {
      getUser();
    }
  }, [user]);

  if (loading) return (<CustomSpinner />);

  if (user) {
    return (
      <main className={ styles.container }>
        <Header />
        <h1>Perfil</h1>
        <p>
          <strong>Name: </strong>
          {user.name}
        </p>
        <p>
          <strong>Username: </strong>
          {user.username}
        </p>
        <p>
          <strong>Email: </strong>
          {user.email}
        </p>
        <AiFillEdit onClick={ () => setEdit(!edit) } className={ styles.editIcon } />
        {
          edit && (
            <EditUser onClick={ () => setEdit(!edit) } user={ user } />
          )
        }
      </main>
    );
  }
}

export default Perfil;
