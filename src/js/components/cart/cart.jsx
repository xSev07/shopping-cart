import React from "react";
import PropTypes from "prop-types";
import CartItem from "../cart-item/cart-item.jsx";
import CartAddition from "../cart-addition/cart-addition.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import {extendObject} from "../../utils/common";
import {allGoodsToSelectedGoods} from "../../adapters/goods";

const Cart = (props) => {
  const {allGoods, selectedGoods, addGoods, deleteGoods} = props;

  return (
    <>
      <CartAddition allGoods={allGoods} onFormSubmit={addGoods}/>
      <section className="cart container">
        <h2 className="visually-hidden">Товары в корзине</h2>
        <form className="cart__form">
          <ul className="cart__list">
            {selectedGoods.map((it) => <CartItem key={it.id} goods={it} onDeleteButtonClick={deleteGoods}/>)}
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
    </>
  );
};

const mapStateToProps = (state) => ({
  allGoods: state.allGoods,
  selectedGoods: state.selectedGoods,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {allGoods, selectedGoods} = stateProps;
  const {dispatch} = dispatchProps;
  const reverseSelectedGoods = selectedGoods.slice().reverse();
  const addGoods = (id, value) => {
    let newSelectedGoods = [];
    const index = selectedGoods.findIndex((it) => it.id === id);
    if (index === -1) {
      const currentGoods = allGoods.find((it) => it.id === id);
      newSelectedGoods = selectedGoods.slice();
      newSelectedGoods.push(allGoodsToSelectedGoods(currentGoods, value));
    } else {
      const currentGoods = selectedGoods[index];
      const newGoods = extendObject(currentGoods, {count: currentGoods.count + value});
      newSelectedGoods = [...selectedGoods.slice(0, index), newGoods, ...selectedGoods.slice(index + 1)];
    }
    dispatch(ActionCreator.changeSelectedGoods(newSelectedGoods));
  };

  const deleteGoods = (id) => {
    const index = selectedGoods.findIndex((it) => it.id === id);
    const newSelectedGoods = [...selectedGoods.slice(0, index), ...selectedGoods.slice(index + 1)];
    dispatch(ActionCreator.changeSelectedGoods(newSelectedGoods));
  };

  return extendObject(
      stateProps,
      dispatchProps,
      ownProps,
      {
        selectedGoods: reverseSelectedGoods,
        addGoods,
        deleteGoods,
      }
  );
};

export {Cart};
export default connect(mapStateToProps, null, mergeProps)(Cart);
