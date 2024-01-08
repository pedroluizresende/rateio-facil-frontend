import React, { useContext, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from './BillsList.module.css';
import Header from '../components/Header';
import BillContext from '../context/BillContext';
import BillCard from '../components/BillCard';
import CustomSpinner from '../components/CustomSpinner';
import Footer from '../components/Footer';

function BillsList() {
  const { getAllBill, allBills, loading } = useContext(BillContext);

  useEffect(() => {
    getAllBill();
  }, []);

  if (loading) return <CustomSpinner />;

  const renderBillCards = (bills) => {
    if (bills.length === 0) {
      return <h2>Não há contas disponíveis!</h2>;
    }

    return bills.map((bill, index) => (
      <BillCard key={ `${bill.establishment}-${index}` } bill={ bill } />
    ));
  };

  const openBills = allBills.filter((bill) => bill.status === 'OPEN');
  const closedBills = allBills.filter((bill) => bill.status === 'CLOSED');

  return (
    <main className={ styles.container }>
      <Header />
      <h1>Minhas contas!</h1>

      <Tabs defaultActiveKey="Abertas" fill>
        <Tab eventKey="Abertas" title="Abertas" className={ styles.tab }>
          <section className={ styles.billsContainer }>
            {renderBillCards(openBills)}
          </section>
        </Tab>
        <Tab eventKey="Finalizadas" title="Finalizadas">
          <section className={ styles.billsContainer }>
            {renderBillCards(closedBills)}
          </section>
        </Tab>
      </Tabs>
    </main>
  );
}

export default BillsList;
