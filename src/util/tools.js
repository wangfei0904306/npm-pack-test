
/**
 * 按关键字分组(将一维数组分成二维数组)
 *
 * @param {Array<String>} array
 * @param {String} key
 * @returns { false | Array<Map<String,String>>}
 */
export function splitGroup(array, key) {
  if (!array || array === undefined || array === '' || !array.length) { return false; }
  const arr = array.concat();
  const ret = [];
  loop(arr[0][key]);
  function loop(scaleplate) {
    const temp = [];
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (scaleplate === element[key]) {
        temp.push(element);
        arr.splice(index--, 1);
      }
    }
    ret.push(temp);
    if (arr.length) {
      loop(arr[0][key]);
    }
  }
  return ret;
}

/**
 * 深度遍历定位元素
 *
 * @param {{Array<String>}} array
 * @param {String} key
 * @param {Stirng} b
 * @param {Function} func
 * @returns {any}
 */
export function findPath(array, key, b, func, path = []) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.children && element.children.length) {
      path.push(element[key]);
      if (element[key].toString() === b.toString()) {
        return func(path.concat());
      }
      findPath(element.children, b, func, path);
    } else if (element[key].toString() === b.toString()) {
      path.push(element[key]);
      return func(path.concat());
    }
    if (i === array.length - 1) {
      path.pop();
    }
  }
}

/**
 * 获取组件展示名称即函数字面量
 *
 * @param {*Class} WrappedComponent
 * @returns {String}
 */
export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
/**
 * URL拼接字符串
 *
 * @param {any} url
 * @param {any} param
 * @returns {String} url
 */
export function urlAppendQuery(url, param) {
  if (!param) {
    return url;
  }
  let queryString = '';
  for (const key in param) {
    if (param.hasOwnProperty(key)) {
      if (param[key] === false || param[key] === 0 || param[key]) {
        queryString += `&${key}=${param[key]}`;
      }
    }
  }
  if (queryString) {
    return `${url}?${queryString.substring(1)}`;
  }
  return url;
}
/**
 * 数组转树
 * @param {*} arrtNodes
 * @param {*} opt  { key: 'id', parent: 'pid', children: 'children',});
 */
export function listToTree(arrtNodes, opt) {
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
        if (node.children) {
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
/**
 * 树转数组
 * @param {*} treeNodes
 * @param {*} opt  { key: 'id', parent: 'pid', children: 'children',});
 */
export function treeTolist(treeNodes, opt) {
  if (!opt) {
    opt = {};
    opt.key = 'id';
    opt.parent = 'pid';
    opt.children = 'children';
  }


  const NodeList = [];


  function appenChildren(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // 如果没有上层节点那么就是根节点
      if (node.parentNode == null) {
        node.Level = 0;
        node[opt.parent] = 0;
      }
      // 判断是否有子节点
      if (node[opt.children] && node[opt.children].length > 0) {
        // 所有子节点
        for (let k = 0; k < node.children.length; k++) {
          node[opt.children][k][opt.parent] = node[opt.parent];
          node[opt.children][k].Level = node.Level + 1;
          node[opt.children][k].parentNode = node;
        }

        appenChildren(node.children);
      }
      if (node.hasOwnProperty('parentNode')) { delete node.parentNode; }
      if (node.hasOwnProperty(opt.children)) { delete node[opt.children]; }
      NodeList.push(node);
    }
  }

  appenChildren(treeNodes);

  return NodeList;
}
/**
 * 转换成标准的Tree组件数据格式
 * @param {*} arr
 * @param {*} key
 * @param {*} title
 */
export const changeData = (arr, key, title) => {
  const treeArr = arr.map((x) => {
    const level = {};
    level.key = x[key];
    level.value = x[key];
    level.title = x[title];
    if (x.children && x.children.length > 0) {
      level.children = changeData(x.children, key, title);
    }
    return level;
  });
  return treeArr;
};

/**
 * 两个数相成 精确计算
 *
 * @param {any} f1
 * @param {any} f2
 * @returns
 */
export function fxf(f1, f2) {
  f1 += '';
  f2 += '';
  const f1Len = f1.split('.')[1] ? f1.split('.')[1].length : 0;
  const f2Len = f2.split('.')[1] ? f2.split('.')[1].length : 0;
  if (f1Len) {
    f1 = f1.replace('.', '');
  }
  if (f2Len) {
    f2 = f2.replace('.', '');
  }
  return (f1 * f2) / (10 ** (f1Len + f2Len));
  // return f1 * f2 / Math.pow(10, f1Len + f2Len);
}
/**
 * 对象深拷贝
 * @param {object} p
 * @returns {object}
 */
export function objDeepCopy(p) {
  const c = {};
  for (const k in p) {
    if (p.hasOwnProperty(k)) {
      c[k] = p[k];
    }
  }
  return c;
}
/**
 * 保留两位小数（非负）
 * @param {*object} obj
 */
export function limitTowDecimals(value) {
  value = value.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
  value = value.replace(/^\./g, ''); // 验证第一个字符是数字
  value = value.replace(/\.{2,}/g, '.'); // 只保留第一个, 清除多余的
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
  value = value.replace(/^()*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
  return value;
}
/**
 * 对象、数组判空
 */
export function isEmpty(obj) {
  if (!obj || !obj.length) return true;
  return false;
}
