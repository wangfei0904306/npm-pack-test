/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/userManager/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday November 20th 2017 10:17:48 am
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 2:15:52 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/roleManager/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 16th 2017 9:36:24 am
 * Author: chengpu
 * -----
 * Last Modified:Thursday November 16th 2017 9:36:24 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import { Row, Tree, Button } from 'antd';
import { getOrgTree, getOrgDetail } from '../../models/org';
import Cell from '../../components/labelValueCell';

import './style.less';

const TreeNode = Tree.TreeNode;

@BaseActions
@Selecter(['org'], { getOrgTree, getOrgDetail })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgCode: '',
    };
    this.loadData = this.loadData.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }
  componentDidMount() {
    const { getOrgTree } = this.props.actions;
    getOrgTree().then((res) => {
      this.loadData({ code: res.obj[0].code });
    });
    // this.loadData();
  }
  onSelect(selectedKeys) {
    const orgCode = selectedKeys[0];
    this.setState({
      orgCode,
    });
    if (orgCode) {
      this.loadData({ code: orgCode });
    }
  }
  loadData(params) {
    const { getOrgDetail } = this.props.actions;
    getOrgDetail(params);
  }
  create() {
    const { linkTo } = this.props.baseActions;
    linkTo({
      pathname: '/org-cu',
      state: {
        parentOrgCode: this.state.orgCode,
      } });
  }
  edit() {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/org-cu', state: { orgCode: this.state.orgCode } });
  }
  renderTreeNodes(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }
  render() {
    const { orgTree, detail } = this.props.org;
    const { orgCode } = this.state;
    const layout = {
      wrapper: 8,
      label: 10,
      content: 14,
    };
    return (
      <div className="org_view_container">
        <div className="org-tree-board">
          {
            orgTree[0] &&
            <Tree
              selectedKeys={[orgTree[0].key]}
              defaultExpandedKeys={[orgTree[0].key]}
              onSelect={this.onSelect}
              showLine
            >
              {this.renderTreeNodes(orgTree)}
            </Tree>
        }
        </div>
        <div className="org-detail-board">
          <div className="create-user-button">
            <Button disabled={orgCode === '' || orgCode === undefined} type="primary" onClick={this.create}>新增</Button>
            <Button disabled={orgCode === '' || orgCode === undefined} type="primary" style={{ marginLeft: 25 }} onClick={this.edit}>编辑</Button>
          </div>
          {detail.code &&
          <div className="view-operation-bar">
            <Row className="section-title">基础信息</Row>
            <Row>
              <Cell data={{ label: '门店类型', content: detail.code }} layout={layout} />
              <Cell data={{ label: '组织名称', content: detail.name }} layout={layout} />
              <Cell data={{ label: '组织简写', content: detail.shortName }} layout={layout} />
            </Row>
            <Row>
              <Cell data={{ label: '组织分类', content: detail.orgCategoryName }} layout={layout} />
              <Cell data={{ label: '状态', content: detail.orgStatus === 'Y' ? '启用' : '停用' }} layout={layout} />
              <Cell data={{ label: '电话', content: detail.telphone }} layout={layout} />
            </Row>
            <Row className="section-title">门店信息</Row>
            <Row>
              <Cell data={{ label: '门店类型', content: detail.retailAttrVo.retailTypeName }} layout={layout} />
              <Cell data={{ label: '门店经理', content: detail.retailAttrVo.retailManager }} layout={layout} />
              <Cell data={{ label: '所属品牌', content: detail.retailAttrVo.brandName }} layout={layout} />
            </Row>
            <Row>
              <Cell data={{ label: '法人', content: detail.retailAttrVo.legalPerson }} layout={layout} />
              <Cell data={{ label: '是否是虚拟店', content: detail.retailAttrVo.virtualRetail === 'Y' ? '启用' : '停用' }} layout={layout} />
            </Row>
            <Row className="section-title">库存信息</Row>
            <Row>
              <Cell data={{ label: '是否创建仓库', content: detail.retailAttrVo.isCreateStorage === 'Y' ? '启用' : '停用' }} layout={layout} />
              <Cell data={{ label: '是否虚拟库', content: detail.retailAttrVo.isVirtualStorage === 'Y' ? '启用' : '停用' }} layout={layout} />
              <Cell data={{ label: '是否禁盘', content: detail.retailAttrVo.isNoInventory === 'Y' ? '启用' : '停用' }} layout={layout} />
            </Row>
          </div>
          }
        </div>
      </div>
    );
  }
}

module.exports = View;
