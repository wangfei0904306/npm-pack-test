/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/intenarModels/index.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Wednesday November 15th 2017 11:55:36 am
 * Author: youngcao
 * -----
 * Last Modified:Wednesday November 15th 2017 11:55:36 am
 * Modified By: youngcao
 * -----
 * Copyright (c) 2017 MagCloud
 */
// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html
const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');

const models = [];
for (let i = 0; i < keys.length; i += 1) {
  models.push(context(keys[i]).default);
}

export default models;
