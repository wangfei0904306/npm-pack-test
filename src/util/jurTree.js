/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/util/role.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Friday November 17th 2017 2:08:00 pm
 * Author: chengpu
 * -----
 * Last Modified:Friday November 17th 2017 2:08:00 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
/**
 * 返回权限树
 * @param {*} arrtNodes
 * @param {*} opt
 */
export function getJurTree(arrtNodes, opt) {
  if (!opt) {
    opt = {};
    opt.key = 'id';
    opt.parent = 'pId';
    opt.children = 'children';
  }
  function exists(rows, parentId) {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][opt.key] === parentId) return true;
    }
    return false;
  }

  const nodes = [];
  // get the top level nodes
  for (let i = 0; i < arrtNodes.length; i++) {
    const row = arrtNodes[i];
    if (!exists(arrtNodes, row[opt.parent])) {
      nodes.push(row);
    }
  }

  const toDo = [];
  for (let i = 0; i < nodes.length; i++) {
    toDo.push(nodes[i]);
  }
  while (toDo.length) {
    const node = toDo.shift(); // the parent node
    // get the children nodes
    for (let i = 0; i < arrtNodes.length; i++) {
      const row = arrtNodes[i];
      if (row[opt.parent] === node[opt.key]) {
        if (row.isMenu === 0) {
          if (node.operations) {
            node.operations.push(row);
          } else {
            node.operations = [row];
          }
        } else if (node.children) {
          node.children.push(row);
        } else {
          node.children = [row];
        }
        toDo.push(row);
      }
    }
  }
  return nodes;
}
