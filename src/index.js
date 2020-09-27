// import './js/common';
import './assets/scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Cart from "./js/components/cart/cart.jsx";

const init = () => {
  ReactDOM.render(
      <Cart/>,
      document.querySelector(`#root`)
  );
};

init();
