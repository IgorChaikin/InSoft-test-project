import React, { useEffect } from 'react';

import './AdminSingleCart.scss';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

function AdminSingleCart(props) {
  const { selectedCart, onMount } = props;
  const { id } = useParams();

  useEffect(() => onMount(id), []);

  const ordersList = selectedCart?.orders.map((cart) => {
    const { _id, item, count } = cart;
    return (
      <div className="order" key={_id}>
        <figure>
          <img src={item?.imgPath} alt={item?.title} />
          <span>{item?.title}</span>
        </figure>
        <div className="count">{count}</div>
      </div>
    );
  });

  return (
    <div className="admin-dashboard__container">
      <h2>
        {selectedCart?.username ? `Cart of ${selectedCart?.username}` : `Anonymous cart`}
        <span className="cart__id">id: {id}</span>
      </h2>
      <div className="main-content">{ordersList}</div>
      <p>
        <span className="cart__total">Total</span>
        <span className="cart__price">{selectedCart?.price.toFixed(2)}$</span>
      </p>
    </div>
  );
}

AdminSingleCart.propTypes = {
  selectedCart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    orders: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
    username: PropTypes.string,
  }),
  onMount: PropTypes.func.isRequired,
};

AdminSingleCart.defaultProps = {
  selectedCart: null,
};

export default AdminSingleCart;
