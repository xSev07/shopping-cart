import NameSpace from "../name-space";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.CART;

export const getAllGoods = (state) => {
  return state[NAME_SPACE].allGoods;
};

export const getSelectedGoods = (state) => {
  return state[NAME_SPACE].selectedGoods;
};

export const getGoodsCount = createSelector(
    getSelectedGoods,
    (selectedGoods) => {
      return selectedGoods.reduce((acc, it) => acc + it.count, 0);
    }
);

export const getGoodsTotal = createSelector(
    getSelectedGoods,
    (selectedGoods) => {
      return selectedGoods.reduce((acc, it) => acc + it.price * it.count, 0);
    }
);

export const getSelectedGoodsIndexByID = createSelector(
    getSelectedGoods,
    (state, id) => id,
    (selectedGoods, id) => {
      return selectedGoods.findIndex((it) => it.id === id);
    }
);

export const getGoodsByID = createSelector(
    getAllGoods,
    (state, id) => id,
    (allGoods, id) => {
      return allGoods.find((it) => it.id === id);
    }
);
