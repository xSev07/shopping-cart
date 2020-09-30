// import './js/common';
import './assets/scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Cart from "./js/components/cart/cart.jsx";
import {createAPI} from "./js/api";
import {applyMiddleware, createStore} from "redux";
import reducer from "./js/reducer/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {Operation} from "./js/reducer/cart/cart";

const init = () => {
  const api = createAPI();

  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(Operation.loadGoods());

  ReactDOM.render(
      <Provider store={store}>
        <Cart onFormSubmit={() => {}}/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();