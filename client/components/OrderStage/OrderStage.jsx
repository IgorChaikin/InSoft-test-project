import PropTypes from 'prop-types';
import React from 'react';
import './OrderStage.scss';

function OrderStage(props) {
  const { title, orders, id, onDelete, onInc, onDec } = props;
  const time = Math.max(...orders.map((order) => order.time));
  const diff = Math.floor((Date.now() - time) / 1000);

  const intervals = [
    [3600, ' hours'],
    [60, ' minutes'],
    [10, '0 seconds'],
  ];
  const stringParams = intervals.reduce(
    (accumulator, currentValue) =>
      currentValue[0] <= accumulator[0] && accumulator[1] === 'just now'
        ? currentValue
        : accumulator,
    [diff, 'just now']
  );

  const timeString =
    stringParams[1] === 'just now'
      ? stringParams[1]
      : `${Math.floor(diff / stringParams[0])}${stringParams[1]} ago`;

  const counts = {};

  orders.forEach((elem) => {
    counts[elem.item._id] = (counts[elem.item._id] || 0) + 1;
  });

  const orderList = orders.map((order) => {
    const { item, _id, count } = order;
    return (
      <div className="order" key={_id}>
        <figure>
          <img src={item?.imgPath} alt={item?.title} />
          <span>{item?.title}</span>
        </figure>
        <span>
          <div className="counter">
            <button type="button" disabled={count <= 1} id={`${_id}_DEC`}>
              -
            </button>
            <div className="count">{count}</div>
            <button type="button" id={`${_id}_INC`}>
              +
            </button>
          </div>
          <button type="button" id={`${_id}_DEL`}>
            x
          </button>
        </span>
      </div>
    );
  });

  return (
    <li
      key={id}
      className={`${orders.length <= 0 ? 'in' : ''}active`}
      onClick={(e) => {
        const args = e.target.id.split('_');
        switch (args[1]) {
          case 'INC':
            onInc(args[0]);
            break;
          case 'DEC':
            onDec(args[0]);
            break;
          case 'DEL':
            onDelete(args[0]);
            break;
          default:
            break;
        }
      }}
    >
      <section>
        <h2>{title}</h2>
        {orders?.length > 0 ? <span>{timeString}</span> : ''}
      </section>
      {orderList}
    </li>
  );
}

OrderStage.propTypes = {
  id: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onInc: PropTypes.func.isRequired,
  onDec: PropTypes.func.isRequired,
};

export default OrderStage;
