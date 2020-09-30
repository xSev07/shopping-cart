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

// Для интеграции в приложение необходимо передать список всех товаров(allGoods):
// [{ id: string | number, name: string, price: number, picture: string }, ...]
// и cb функцию(onFormSubmit), которая вернёт список выбранных товаров:
// [{ id: string, quantity: number, total: number }, ...]
//
// Получение моковых данных осталось для демонстрации работы компонента в тестовом задании.
// В реальной работе было бы несколько иначе, конечно же =)
// Так же обращаю внимание, что частичное тестирование - это осознанное решение.
// Для демонстрации навыков тестирования этого достаточно.
// Не вижу смысла тратить время на полное покрытие тестами тестового задания.
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
