import React, {useRef} from "react";
import PropTypes from "prop-types";
import Counter from "../counter/counter.jsx";

const CartAddition = (props) => {
  const {allGoods, onFormSubmit} = props;
  const counterRef = useRef(null);
  const listRef = useRef(null);

  const submitFormHandler = (evt) => {
    evt.preventDefault();
    onFormSubmit(listRef.current.value, +counterRef.current.value);
  };

  return (
    <section className="cart-addition container">
      <h2 className="cart-addition__title">Добавить товар</h2>
      <form onSubmit={submitFormHandler} action="#" className="cart-addition__form">
        <select ref={listRef} className="cart-addition__select" aria-label="Выбрать товар из списка">
          {allGoods.map((it) => {
            return (
              <option key={it.id} value={it.id}>{it.name}</option>
            );
          })}
        </select>
        <Counter ref={counterRef} className={`cart-addition__count-wrapper`}/>
        <button className="cart-addition__add cart-button cart-button--attention" type="submit">Добавить</button>
      </form>
    </section>
  );
};

CartAddition.propTypes = {
  allGoods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picture: PropTypes.string.isRequired,
      })).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default CartAddition;
