import React, { useContext, useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import Context from '../context/Context';
import styles from './Perfil.module.css';
import Header from '../components/Header';
import CustomSpinner from '../components/CustomSpinner';
import Footer from '../components/Footer';
import EditUser from '../components/EditUser';

function Perfil() {
  const { user, getUser, loading } = useContext(Context);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user.id) {
      getUser();
    }
  }, [user, getUser]);

  if (loading) {
    return <CustomSpinner />;
  }

  const renderProfile = () => (
    <>
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
      {edit && <EditUser onClick={ () => setEdit(!edit) } user={ user } />}
      <Footer />
    </>
  );

  return (
    <main className={ styles.container }>
      {user ? renderProfile() : null}
    </main>
  );
}

export default Perfil;
