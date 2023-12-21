import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import PropTypes from 'prop-types';
import styles from './Menu.module.css';
import Context from '../context/Context';

function Menu({ onClick }) {
  const { logout } = useContext(Context);
  const { pathname } = useLocation();

  const createLink = (to, label) => (
    <Link to={ to } onClick={ () => pathname === to && onClick() }>
      {label}
    </Link>
  );

  return (
    <div className={ styles.container }>
      <ul>
        <li>{createLink('/home', 'Home')}</li>
        <li>{createLink('/bills', 'Contas')}</li>
        <li>{createLink('/perfil', 'Perfil')}</li>
        <li>
          <BiLogOut className={ styles.logoutIcon } onClick={ logout } />
        </li>
      </ul>
    </div>
  );
}

Menu.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Menu;
