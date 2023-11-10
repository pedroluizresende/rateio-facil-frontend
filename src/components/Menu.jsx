import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import PropTypes from 'prop-types';
import styles from './Menu.module.css';
import Context from '../context/Context';

function Menu({ onClick }) {
  const navigate = useNavigate();

  const { logout } = useContext(Context);
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const { pathname } = useLocation();

  return (
    <div className={ styles.container }>
      <ul>
        <li>
          <Link
            to="/home"
            onClick={ () => pathname === '/home' && onClick() }
          >
            Home

          </Link>
        </li>
        <li>
          <Link
            to="/bills"
            onClick={ () => pathname === '/bills' && onClick() }
          >
            Contas

          </Link>
        </li>
        <li>
          <Link
            to="/perfil"
            onClick={ () => pathname === '/perfil' && onClick() }
          >
            Perfil

          </Link>
        </li>
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
