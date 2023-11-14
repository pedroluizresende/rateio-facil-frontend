import { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import styles from './Home.module.css';
import Button from '../components/Button';
import CreateBillForm from '../components/CreateBillForm';
import Header from '../components/Header';
import CustomSpinner from '../components/CustomSpinner';
import ConfirmMessage from './ConfirmMessage';
import Footer from '../components/Footer';

function Home() {
  const { loading, getUser, user } = useContext(Context);
  const [openBill, setOpenbill] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  if (loading || !user.id) {
    return <CustomSpinner />;
  }

  if (user.status === 'NOT_CONFIRMED') return (<ConfirmMessage />);
  return (
    <main className={ styles.container }>
      <Header />
      <h1>{`Olá, ${user.name}...`}</h1>
      <h2>Bora iniciar uma conta?</h2>
      <Button onClick={ () => setOpenbill(!openBill) } type="button">Sim</Button>
      {
        openBill && <CreateBillForm onClick={ () => setOpenbill(!openBill) } />
      }
      <Footer />
    </main>
  );
}

export default Home;
