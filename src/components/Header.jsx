import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './Header.module.css';
import Menu from './Menu';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={ styles.header }>
      {isOpen ? (
        <AiOutlineClose className={ styles.icon } onClick={ handleMenu } />
      ) : (
        <FaBars className={ styles.icon } onClick={ handleMenu } />
      )}
      {
        isOpen && <Menu onClick={ () => setIsOpen(false) } />
      }
    </div>
  );
}

export default Header;
