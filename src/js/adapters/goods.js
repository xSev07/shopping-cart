export const parseGoods = (goods) => {
  return {
    id: goods.id,
    name: goods.name,
    price: goods.price,
    picture: goods.picture,
  };
};

export const parseGoodsList = (data) => {
  return data.map((goods) => parseGoods(goods));
};

/**
 * Преобразует товар общего списка в выбранный товар
 * @param {Object} goods товар общего списка
 * @param {number} count количество
 * @return {{price: number, name: string, count: number, id: string, picture: string}} выбранный товар
 */
export const allGoodsToSelectedGoods = (goods, count) => {
  return {
    id: goods.id,
    name: goods.name,
    price: goods.price,
    picture: goods.picture,
    count,
  };
};
