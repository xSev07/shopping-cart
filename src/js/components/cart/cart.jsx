import React from "react";
import PropTypes from "prop-types";
import CartItem from "../cart-item/cart-item.jsx";
import CartAddition from "../cart-addition/cart-addition.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import {declOfNum, extendObject} from "../../utils/common";
import {allGoodsToSelectedGoods} from "../../adapters/goods";
import {Declination} from "../../const";

const Cart = (props) => {
  const {allGoods, selectedGoods, countGoods, totalGoods,
    addGoods, deleteGoods, changeGoodsCount, onFormSubmit} = props;
  const declGoods = declOfNum(countGoods, Declination.GOODS);

  return (
    <>
      <CartAddition allGoods={allGoods} onFormSubmit={addGoods}/>
      <section className="cart container">
        <h2 className="visually-hidden">Товары в корзине</h2>
        <form className="cart__form" onSubmit={onFormSubmit}>
          <ul className="cart__list">
            {selectedGoods.map((it) =>
              <CartItem
                key={it.id}
                goods={it}
                onDeleteButtonClick={deleteGoods}
                onCounterChange={changeGoodsCount}
              />)}
          </ul>
          <div className="cart__total">
            <div className="cart__row cart__total-row cart-row">
              <p className="cart__total-count">В корзине {countGoods.toLocaleString()} {declGoods}</p>
              <p className="cart__total-price">{totalGoods.toLocaleString()} &#8381;</p>
            </div>
            <button
              className="cart__submit cart-button cart-button--attention"
              type="submit"
              disabled={countGoods === 0}
            >
              Продолжить оформление
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

Cart.propTypes = {
  allGoods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picture: PropTypes.string.isRequired,
      })).isRequired,
  selectedGoods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picture: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })).isRequired,
  countGoods: PropTypes.number.isRequired,
  totalGoods: PropTypes.number.isRequired,
  addGoods: PropTypes.func.isRequired,
  deleteGoods: PropTypes.func.isRequired,
  changeGoodsCount: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allGoods: state.allGoods,
  selectedGoods: state.selectedGoods,
  countGoods: state.selectedGoods.reduce((acc, it) => acc + it.count, 0),
  totalGoods: state.selectedGoods.reduce((acc, it) => acc + it.price * it.count, 0),
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

  const changeGoodsCount = (id, value) => {
    const index = selectedGoods.findIndex((it) => it.id === id);
    const newGoods = extendObject(selectedGoods[index], {count: value});
    const newSelectedGoods = [...selectedGoods.slice(0, index), newGoods, ...selectedGoods.slice(index + 1)];
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
        changeGoodsCount,
      }
  );
};

export {Cart};
export default connect(mapStateToProps, null, mergeProps)(Cart);
