export const extendObject = (...rest) => {
  return Object.assign({}, ...rest);
};

/**
 * Склоняет слова в зависимости от их количества
 * @param {number} n - количество
 * @param {Array} textForms - массив склонённых форм слова, например:
 * [`штука`, `штуки`, `штук`]
 * @return {string} - элемент массива textForms
 */
export const declOfNum = (n, textForms) => {
  n = Math.abs(n) % 100; const n1 = n % 10;
  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
};

export const replaceArrayElement = (array, element, index) => {
  return [...array.slice(0, index), element, ...array.slice(index + 1)];
};

export const deleteArrayElement = (array, index) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

/**
 * Заменяет значение числового реквизита в элементе массива
 * @param {Array.<Object>} array - массив с объектами
 * @param {number} index - номер элемента
 * @param {number} value - значение, на которое заменить
 * @param {string} propsName - имя реквизита, у которого заменить значение
 * @param {boolean} addCurrentValue - истина: добавить value к текущему значению, ложь: заменить на value
 * @return {Array.<Object>} - возвращает новый массив с заменённым элементом
 */
export const replaceNumberPropsOnArrayElement = (array, index, value, propsName, addCurrentValue = false) => {
  const currentElement = array[index];
  const newElement = extendObject(currentElement, {[propsName]: value + (addCurrentValue ? currentElement[propsName] : 0)});
  return replaceArrayElement(array, newElement, index);
};
