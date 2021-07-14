import React from 'react';
import '../styles/Orders.scss';

export class Orders extends React.Component {
  getOrdersCount(
    orders
  ) {
    return (
      orders
        .ordered
        ?.length +
      orders
        .baking
        ?.length +
      orders
        .finishing
        ?.length +
      orders
        .served
        ?.length
    );
  }

  render() {
    return (
      <button className="orders">
        <div className="circle"></div>
        <img
          src="/dish.svg"
          alt="dish.svg"
        />
        <p>
          order
          status
          <div className="count">
            {this.getOrdersCount(
              this
                .props
                .orders
            )}
          </div>
        </p>
      </button>
    );
  }
}
