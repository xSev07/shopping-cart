import React, {useState, forwardRef} from "react";
import PropTypes from "prop-types";

const Counter = forwardRef((props, ref) => {
  const {className} = props;
  const [count, setCount] = useState(1);
  const clickIncrementHandler = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const clickDecrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const changeCountHandler = (evt) => {
    const value = +evt.target.value;
    setCount(value > 0 ? value : 1);
  };

  return (
    <div className={`cart-count ${className}`}>
      <button onClick={clickIncrementHandler} className="cart-count__button" type="button">-</button>
      <input onChange={changeCountHandler} ref={ref} type="number" className="cart-count__value" value={count} min="1" aria-label="Количество"/>
      <button onClick={clickDecrementHandler} className="cart-count__button" type="button">+</button>
    </div>
  );
});

Counter.displayName = `Counter`;

export default Counter;
