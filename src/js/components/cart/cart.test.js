import React from "react";
import renderer from "react-test-renderer";
import {allGoods, selectedGoods} from "../../test-data/test-data";
import {Cart} from "./cart.jsx";

describe(`Snapshot tests for Cart`, () => {
  it(`Should render correctly first load`, () => {
    const tree = renderer
      .create(
          <Cart
            allGoods={allGoods}
            selectedGoods={[]}
            countGoods={0}
            totalGoods={0}
            addGoods={() => {}}
            deleteGoods={() => {}}
            changeGoodsCount={() => {}}
            onFormSubmit={() => {}}
          />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it(`Should render correctly with selected goods`, () => {
    const tree = renderer
      .create(
          <Cart
            allGoods={allGoods}
            selectedGoods={selectedGoods}
            countGoods={5}
            totalGoods={1350}
            addGoods={() => {}}
            deleteGoods={() => {}}
            changeGoodsCount={() => {}}
            onFormSubmit={() => {}}
          />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
