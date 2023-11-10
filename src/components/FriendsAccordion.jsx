import React, { useContext } from 'react';
import { Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';
import useFriendFormatter from '../hooks/useFriendFormatter';
import BillContext from '../context/BillContext';
import styles from './FriendsAccordion.module.css';

function FriendsAccordion({ friends }) {
  const { getFriendOrders } = useFriendFormatter();
  const { orders } = useContext(BillContext);
  return (
    <Accordion className={ styles.accordion }>
      {
        friends.map((friend, index) => (
          <Accordion.Item
            className={ styles.accordionItem }
            key={ friend }
            eventKey={ index }
          >
            <Accordion.Header
              className={ styles.accordionHeader }
            >
              {friend}

            </Accordion.Header>
            <Accordion.Body>
              <ul>
                {
                  getFriendOrders(orders, friend).map((order) => (
                    <li key={ order.id }>
                      <p>{order.description}</p>
                      <p>
                        R$
                        {' '}
                        {order.value.toFixed(2)}
                      </p>
                    </li>
                  ))
                }
              </ul>

            </Accordion.Body>

          </Accordion.Item>
        ))
      }

    </Accordion>
  );
}

FriendsAccordion.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FriendsAccordion;
