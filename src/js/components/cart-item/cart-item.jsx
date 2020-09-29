import React, {useRef} from "react";
import PropTypes from "prop-types";
import Counter from "../counter/counter.jsx";

const CartItem = (props) => {
  const {goods, onDeleteButtonClick, onCounterChange} = props;
  const {id, name, price, count, picture} = goods;
  const counterRef = useRef(null);
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
          <button onClick={() => onDeleteButtonClick(id)} className="cart__delete cart-button  cart-button--in-text" type="button">Удалить</button>
          <Counter
            ref={counterRef}
            className={`cart__count-wrapper cart-row`}
            startCount={count}
            onChange={(value) => onCounterChange(id, value)}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
