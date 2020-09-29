import React from "react";
import PropTypes from "prop-types";
import Counter from "../counter/counter.jsx";

const CartItem = (props) => {
  const {goods} = props;
  const {name, price, count, picture} = goods;
  const totalPrice = count === 1 ? price : price * count;

  return (
    <li className="cart__item">
      <img src={picture} alt={name} className="cart__picture" width="100" height="100"/>
      <div className="cart__info">
        <div className="cart__row cart-row">
          <h3 className="cart__title">
            <a href="#" className="cart__link">{name}</a>
          </h3>
          <div className="cart__price-wrapper">
            <p className="cart__price-total">{totalPrice} &#8381;</p>
            {count > 1 && <p className="cart__price">{count} x {price} &#8381;</p>}
          </div>
        </div>
        <div className="cart__row cart-row">
          <button className="cart__delete cart-button  cart-button--in-text" type="button">Удалить</button>
          <Counter className={`cart__count-wrapper cart-row`}/>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
