import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import BillContext from '../context/BillContext';

function NotFound() {
  const { error: userError } = useContext(Context);

  const { error: billError } = useContext(BillContext);
  return (
    <div>
      <h1>Página não encontrada</h1>
      <p>{userError || billError}</p>
      <Link to="/home">Voltar para a página inicial</Link>
    </div>
  );
}

export default NotFound;
