import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Cart} from "./cart.jsx";
import {allGoods, selectedGoods} from "../../test-data/test-data";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E tests for Cart`, () => {
  it(`Should check goods addition`, () => {
    const addGoods = jest.fn();

    const cart = mount(
        <Cart
          allGoods={allGoods}
          selectedGoods={[]}
          countGoods={0}
          totalGoods={0}
          addGoods={addGoods}
          deleteGoods={() => {}}
          changeGoodsCount={() => {}}
          onFormSubmit={() => {}}
        />
    );

    const selectorOptions = cart.find(`.cart-addition__select option`);
    selectorOptions.at(0).instance().selected = false;
    selectorOptions.at(1).instance().selected = true;
    const addCountInput = cart.find(`.cart-count__value`);
    addCountInput.instance().value = 5;
    const addButton = cart.find(`.cart-addition__add`);
    addButton.simulate(`submit`);

    expect(addGoods).toHaveBeenCalledTimes(1);
    expect(addGoods).toHaveBeenCalledWith(`2`, 5);
  });

  it(`Should check goods deleting`, () => {
    const deleteGoods = jest.fn();

    const cart = mount(
        <Cart
          allGoods={allGoods}
          selectedGoods={[selectedGoods[0], selectedGoods[1], selectedGoods[2]]}
          countGoods={0}
          totalGoods={0}
          addGoods={() => {}}
          deleteGoods={deleteGoods}
          changeGoodsCount={() => {}}
          onFormSubmit={() => {}}
        />
    );
    const deleteButton = cart.find(`.cart__delete`);
    deleteButton.at(1).simulate(`click`);

    expect(deleteGoods).toHaveBeenCalledTimes(1);
    expect(deleteGoods).toHaveBeenCalledWith(`2`);
  });

  it(`Should check change goods count`, () => {
    const changeGoodsCount = jest.fn();

    const cart = mount(
        <Cart
          allGoods={allGoods}
          selectedGoods={[selectedGoods[0]]}
          countGoods={0}
          totalGoods={0}
          addGoods={() => {}}
          deleteGoods={() => {}}
          changeGoodsCount={changeGoodsCount}
          onFormSubmit={() => {}}
        />
    );
    const plusButton = cart.find(`.cart-count__button`);
    plusButton.at(1).simulate(`click`);

    expect(changeGoodsCount).toHaveBeenCalledTimes(1);
    expect(changeGoodsCount).toHaveBeenCalledWith(`1`, 2);
  });
});
