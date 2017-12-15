/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/util/image.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday November 28th 2017 6:49:33 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 28th 2017 6:49:33 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import takeStockIcon from '../../assets/images/take_stock.png';
import storesCargoIcon from '../../assets/images/stores_cargo.png';
import receiveIcon from '../../assets/images/receive.png';

const imgBank = {
  takeStockIcon, // 盘点
  storesCargoIcon, // 报货
  receiveIcon, // 收货
};
export default (cardNo) => {
  if (imgBank[cardNo]) {
    return imgBank[cardNo];
  }
  return cardNo;
};

