/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/components/conciseModal/proCategory.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Wednesday December 13th 2017 6:49:41 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday December 13th 2017 6:49:41 pm
 * Modified By: caoyang
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import { Tree, Input } from 'antd';
import { getProCategoryTree } from '../../models/uvsModel';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.categoryCode;
    dataList.push({ categoryCode: key, categoryName: node.categoryName });
    if (node.childrens) {
      generateList(node.childrens);
    }
  }
};
// generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.childrens) {
      if (node.childrens.some(item => item.categoryCode === key)) {
        parentKey = node.categoryCode;
      } else if (getParentKey(key, node.childrens)) {
        parentKey = getParentKey(key, node.childrens);
      }
    }
  }
  return parentKey;
};

@Selecter(['uvsModel'], { getProCategoryTree })
export class Demo extends Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    searchValue: '',
    checkedKeys: [],
    selectedKeys: [],
  }
  componentDidMount() {
    const { getProCategoryTree } = this.props.actions;
    getProCategoryTree().then((res) => {
      generateList(res.obj);
    });
  }
  onChange = (e) => {
    const value = e.target.value;
    console.log(dataList);
    const { proCategoryTree } = this.props.uvsModel;
    const expandedKeys = dataList.map((item) => {
      if (item.categoryName.indexOf(value) > -1) {
        return getParentKey(item.categoryCode, proCategoryTree);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.props.selectFun(checkedKeys);
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
  renderTreeNodes = (data) => {
    const { searchValue } = this.state;
    return data.map((item) => {
      const index = item.categoryName.indexOf(searchValue);
      const beforeStr = item.categoryName.substr(0, index);
      const afterStr = item.categoryName.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.categoryName}</span>;
      if (item.childrens && item.childrens.length > 0) {
        return (
          <TreeNode title={title} key={item.categoryCode} dataRef={item}>
            {this.renderTreeNodes(item.childrens)}
          </TreeNode>
        );
      }
      return <TreeNode title={title} key={item.categoryCode} />;
    });
  }
  render() {
    const { proCategoryTree } = this.props.uvsModel;
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          checkable
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(proCategoryTree || [])}
        </Tree>
      </div>
    );
  }
}
