import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import Bill from './pages/Bill';
import BillProvider from './context/BillProvider';
import Perfil from './pages/Perfil';
import BillsList from './pages/BillsList';
import Payment from './pages/Payment';
import Calculation from './pages/Calculation';
import NotFound from './pages/NotFound';
import Confirmation from './pages/Confirmation';
import ConfirmMessage from './pages/ConfirmMessage';

function App() {
  return (
    <main className={ styles.container }>
      <BillProvider>
        <Routes>
          <Route path=":id/bill/:billId/pagamento" element={ <Payment /> } />
          <Route path="/:id/bill/:billId/calculo" element={ <Calculation /> } />
          <Route path="/:id/bill/:billId" element={ <Bill /> } />
          <Route path="/bills" element={ <BillsList /> } />
          <Route path="/perfil" element={ <Perfil /> } />
          <Route path="/home" element={ <Home /> } />
          <Route
            path="/criarconta/confirmacao/mensagem"
            element={ <ConfirmMessage /> }
          />
          <Route path="/confirmacao" element={ <Confirmation /> } />
          <Route path="/criar-conta" element={ <CreateAccount /> } />
          <Route path="/404" element={ <NotFound /> } />
          <Route path="/" element={ <Login /> } />
        </Routes>
      </BillProvider>
    </main>
  );
}

export default App;
