import React from "react";
import PropTypes from "prop-types";

const CartItem = () => {
  return (
    <li className="cart__item">
      <img src="./assets/img/RTX3000.jpg" alt="Видеокарта NVIDIA GeForce RTX 3000" className="cart__picture"
           width="100" height="100"/>
      <div className="cart__info">
        <div className="cart__row cart-row">
          <h3 className="cart__title">
            <a href="#" className="cart__link">Видеокарта NVIDIA GeForce RTX 3000</a>
          </h3>
          <div className="cart__price-wrapper">
            <p className="cart__price-total">100 000 &#8381;</p>
            <p className="cart__price">2 x 50 000 &#8381;</p>
          </div>
        </div>
        <div className="cart__row cart-row">
          <button className="cart__delete cart-button  cart-button--in-text" type="button">Удалить</button>
          <div className="cart__count-wrapper cart-count cart-row">
            <button className="cart-count__button" type="button">-</button>
            <input type="number" className="cart-count__value" value="2" min="1" aria-label="Количество"/>
            <button className="cart-count__button" type="button">+</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
