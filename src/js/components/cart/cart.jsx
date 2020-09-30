import React from "react";
import PropTypes from "prop-types";
import CartItem from "../cart-item/cart-item.jsx";
import CartAddition from "../cart-addition/cart-addition.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/cart/cart";
import {
  declOfNum,
  deleteArrayElement,
  extendObject,
  replaceNumberPropsOnArrayElement
} from "../../utils/common";
import {allGoodsToSelectedGoods, selectedGoodsToCartResult} from "../../adapters/goods";
import {Declination} from "../../const";
import {
  getAllGoods, getGoodsByID,
  getGoodsCount,
  getGoodsTotal,
  getSelectedGoods,
  getSelectedGoodsIndexByID
} from "../../reducer/cart/selectors";

const Cart = (props) => {
  const {allGoods, onFormSubmit, selectedGoods, countGoods, totalGoods,
    addGoods, deleteGoods, changeGoodsCount} = props;
  const declGoods = declOfNum(countGoods, Declination.GOODS);

  const handleFormSubmit = () => {
    onFormSubmit(selectedGoodsToCartResult(selectedGoods));
  };

  return (
    <>
      <CartAddition allGoods={allGoods} onFormSubmit={addGoods}/>
      <section className="cart container">
        <h2 className="visually-hidden">Товары в корзине</h2>
        <form className="cart__form" onSubmit={handleFormSubmit}>
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

const mapStateToProps = (state, ownProps) => ({
  allGoods: ownProps.allGoods || getAllGoods(state),
  selectedGoods: getSelectedGoods(state),
  countGoods: getGoodsCount(state),
  totalGoods: getGoodsTotal(state),
  state,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {state, selectedGoods} = stateProps;
  const {dispatch} = dispatchProps;
  const reverseSelectedGoods = selectedGoods.slice().reverse();

  const addGoods = (id, value) => {
    let newSelectedGoods = [];
    const index = getSelectedGoodsIndexByID(state, id);
    if (index === -1) {
      // Добавляет новый товар в список
      const currentGoods = getGoodsByID(state, id);
      newSelectedGoods = selectedGoods.slice();
      newSelectedGoods.push(allGoodsToSelectedGoods(currentGoods, value));
    } else {
      // Заменяет количество в уже добавленном товаре
      newSelectedGoods = replaceNumberPropsOnArrayElement(selectedGoods, index, value, `count`, true);
    }
    dispatch(ActionCreator.changeSelectedGoods(newSelectedGoods));
  };

  const deleteGoods = (id) => {
    const index = getSelectedGoodsIndexByID(state, id);
    const newSelectedGoods = deleteArrayElement(selectedGoods, index);
    dispatch(ActionCreator.changeSelectedGoods(newSelectedGoods));
  };

  const changeGoodsCount = (id, value) => {
    const index = getSelectedGoodsIndexByID(state, id);
    const newSelectedGoods = replaceNumberPropsOnArrayElement(selectedGoods, index, value, `count`, false);
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
