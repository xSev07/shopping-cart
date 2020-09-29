import {extendObject} from "./utils/common";
import {goods as MockGoods} from "./mocks/goods";
import {parseGoodsList} from "./adapters/goods";

const initialState = {
  allGoods: [],
  selectedGoods: [],
};

const ActionType = {
  LOAD_GOODS: `LOAD_GOODS`,
  ADD_SELECTED_GOODS: `ADD_SELECTED_GOODS`,
};

const ActionCreator = {
  loadGoods: (goods) => ({
    type: ActionType.LOAD_GOODS,
    payload: goods,
  }),
  addSelectedGoods: (goods) => ({
    type: ActionType.ADD_SELECTED_GOODS,
    payload: goods,
  }),
};

const Operation = {
  loadGoods: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadGoods(MockGoods));

    // return api.get(`/goods`)
    //   .then((response) => dispatch(ActionCreator.loadGoods(parseGoodsList(response.data))));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_GOODS:
      return extendObject(state, {allGoods: action.payload});
    case ActionType.ADD_SELECTED_GOODS:
      return extendObject(state, {selectedGoods: action.payload});
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
