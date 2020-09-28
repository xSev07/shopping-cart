import {extendObject} from "./utils/common";
import {goods} from "./mocks/goods";

const initialState = {
  allGoods: [],
  selectedGoods: new Map(),
};

const ActionType = {
  LOAD_GOODS: `LOAD_GOODS`,
};

const ActionCreator = {
  loadGoods: (goods) => ({
    type: ActionType.LOAD_GOODS,
    payload: goods,
  }),
};

const Operation = {
  loadGoods: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadGoods(goods));

    // return api.get(`/goods`)
    //   .then((response) => dispatch(ActionCreator.loadGoods(response.data)));
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_GOODS:
      return extendObject(state, {allGoods: action.payload});
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
