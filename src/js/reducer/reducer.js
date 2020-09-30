import {combineReducers} from "redux";
import NameSpace from "./name-space";
import {reducer as cart} from "./cart/cart";


export default combineReducers({
  [NameSpace.CART]: cart,
});
