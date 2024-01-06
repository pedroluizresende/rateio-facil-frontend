import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MdDelete, MdEdit } from 'react-icons/md';
import useFriendFormatter from '../hooks/useFriendFormatter';
import BillContext from '../context/BillContext';
import styles from './FriendsAccordion.module.css';

function FriendsAccordion({ friends }) {
  const { getFriendOrders } = useFriendFormatter();
  const { orders, removeItem } = useContext(BillContext);

  const { pathname } = useLocation();

  const handleDelete = async (id) => {
    const order = orders.find((item) => item.id === id);
    const billId = pathname.split('/')[3];

    if (order.description.match(/dividido/i)) {
      await removeItem(billId, order.id, true);
    } else {
      await removeItem(billId, order.id, false);
    }
  };

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
            <Accordion.Body className={ styles.accordionBody }>
              <ul>
                {
                  getFriendOrders(orders, friend).map((order) => (
                    <li key={ order.id }>
                      <section className={ styles.text }>
                        <p>{order.description}</p>
                        <p>
                          R$
                          {' '}
                          {order.value.toFixed(2)}
                        </p>
                      </section>
                      <section className={ styles.itemsBtns }>
                        {/* <button>
                          <MdEdit />
                        </button> */}
                        <button>
                          <MdDelete
                            id={ order.id }
                            onClick={ () => handleDelete(order.id) }
                          />
                        </button>
                      </section>
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
