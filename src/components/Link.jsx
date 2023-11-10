import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Link.module.css';

function Link({ children, to }) {
  return (
    <NavLink to={ to } className={ styles.link }>{children}</NavLink>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default Link;
