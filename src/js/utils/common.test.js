import {declOfNum} from "./common";

it(`Should check declination of number is correct`, () => {
  const textForms = [`тест`, `теста`, `тестов`];
  expect(declOfNum(1, textForms)).toBe(`тест`);
  expect(declOfNum(3, textForms)).toBe(`теста`);
  expect(declOfNum(10, textForms)).toBe(`тестов`);
});
