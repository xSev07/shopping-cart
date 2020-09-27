import React from "react";
import PropTypes from "prop-types";

const CartAddition = () => {
  return (
    <section className="cart-addition container">
      <h2 className="cart-addition__title">Добавить товар</h2>
      <form action="#" className="cart-addition__form">
        <select className="cart-addition__select" aria-label="Выбрать товар из списка">
          <option value="RTX_3000">Видеокарта NVIDIA GeForce RTX 3000</option>
          <option value="WI-XB400">Наушники Bluetooth Sony WI-XB400</option>
        </select>
        <div className="cart-addition__count-wrapper cart-count">
          <button className="cart-count__button" type="button">-</button>
          <input type="number" className="cart-count__value" value="1" min="1" aria-label="Количество"/>
            <button className="cart-count__button" type="button">+</button>
        </div>
        <button className="cart-addition__add cart-button cart-button--attention" type="submit">Добавить</button>
      </form>
    </section>
  );
};

export default CartAddition;
