import React from "react";
import PropTypes from "prop-types";
import CartItem from "../cart-item/cart-item.jsx";
import CartAddition from "../cart-addition/cart-addition.jsx";
import {connect} from "react-redux";

const Cart = (props) => {
  const {allGoods, selectedGoods, needAddition = true} = props;
  return (
    <>
      <section className="cart container">
        <h2 className="visually-hidden">Товары в корзине</h2>
        <form className="cart__form">
          <ul className="cart__list">
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
          </ul>
          <div className="cart__total">
            <div className="cart__row cart__total-row cart-row">
              <p className="cart__total-count">В корзине 2 товара</p>
              <p className="cart__total-price">105 980 &#8381;</p>
            </div>
            <button className="cart__submit cart-button cart-button--attention" type="submit">Продолжить оформление</button>
          </div>
        </form>
      </section>
      {needAddition && <CartAddition allGoods={allGoods}/>}
    </>
  );
};

const mapStateToProps = (state) => ({
  allGoods: state.allGoods,
  selectedGoods: state.selectedGoods,
});

export {Cart};
export default connect(mapStateToProps)(Cart);
