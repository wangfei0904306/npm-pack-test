/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/userManager/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday November 20th 2017 10:17:48 am
 * Author: chengpu
 * -----
 * Last Modified:Monday November 20th 2017 10:17:48 am
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
import BaseActions, { Notification } from 'tomatobean/enhance';
import { Table, Switch, Tree, Button } from 'antd';
import { getOrgTree, queryList, disableUser, resetPwd } from '../../models/user';
import './style.less';

const TreeNode = Tree.TreeNode;

const columns = target => [
  {
    title: '员工编码',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '名称',
    dataIndex: 'userName',
    key: 'userName',
    render: (text, record) => (
      <span
        className="operation-item"
        onClick={() => target.editUser(record)}
      >
        {text}
      </span>
    ),
  }, {
    title: '登录账号',
    dataIndex: 'userLogin',
    key: 'userLogin',
    width: 100,
  }, {
    title: '部门',
    dataIndex: 'deptName',
    key: 'deptName',
    width: 100,
  }, {
    title: '角色',
    dataIndex: 'roleNames',
    key: 'roleNames',
  }, {
    title: '缩写',
    dataIndex: 'simplifyName',
    key: 'simplifyName',
  }, {
    title: '状态',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (text, record) => (
      <span>
        <Switch defaultChecked={text === 'Y'} onChange={status => target.changeStatus(record, status)} />
      </span>
    ),
  }, {
    title: '密码管理',
    dataIndex: 'resetPwd',
    key: 'resetPwd',
    render: (text, record) => (
      <span className="table-operation" onClick={() => target.resetPwd(record)}>
        <span className="table-reset-operation" />
        <span className="table-operation-title">重置</span>
      </span>
    ),
  },
];
@Notification
@BaseActions
@Selecter(['user'], { getOrgTree, queryList, disableUser, resetPwd })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      orgId: '',
      params: {
        pageNo: 1,
        pageSize: 10,
      },
    };
    this.loadData = this.loadData.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  componentDidMount() {
    const { getOrgTree } = this.props.actions;
    const { observer } = this.props.notification;
    getOrgTree();
    this.loadData();
    observer('userListUpdate', () => {
      this.loadData();
    });
  }
  componentWillUnmount() {
    const { removeObserver } = this.props.notification;
    removeObserver('userListUpdate');
  }
  onSelect(selectedKeys) {
    const orgId = selectedKeys[0];
    this.setState({
      orgId,
    });
    this.loadData({ orgId });
  }
  changeStatus(record, status) {
    const { disableUser } = this.props.actions;
    disableUser({
      userId: record.id,
      isActive: status ? 'Y' : 'N',
    }).then(() => {
      this.loadData();
    });
  }
  resetPwd(record) {
    const { resetPwd } = this.props.actions;
    resetPwd({ userId: record.id });
  }
  loadData(params) {
    this.changeParams(params);
    const { actions } = this.props;
    actions.queryList(this.state.params);
  }
  //
  changeParams(params) {
    if (typeof (params) === 'object') {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const element = params[key];
          this.state.params[key] = element;
        }
      }
    }
  }
  createUser() {
    const { linkTo } = this.props.baseActions;
    linkTo({
      pathname: '/user-cu',
      state: {
        orgId: this.state.orgId,
      } });
  }
  editUser(record) {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/user-cu', state: { userId: record.id, orgId: record.orgId } });
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
    const { list, total, loading, orgTree } = this.props.user;
    const { orgId } = this.state;
    return (
      <div className="user_view_container">
        <div className="org-tree-board">
          {
            orgTree[0] &&
            <Tree
              defaultExpandedKeys={[orgTree[0].key.toString()]}
              onSelect={this.onSelect}
              showLine
            >
              {this.renderTreeNodes(orgTree)}
            </Tree>
          }
        </div>
        <div className="table-board">
          <div className="create-user-button">
            <Button disabled={orgId === '' || orgId === undefined} type="primary" onClick={this.createUser}>新增</Button>
          </div>
          <Table
            bordered
            loading={loading}
            className="view-data-table"
            dataSource={list}
            columns={this.state.columns}
            rowKey="id"
            scroll={{ x: 700 }}
            pagination={{
                    total,
                    current: this.state.params.pageNo,
                    showSizeChanger: true,
                    pageSize: this.state.params.pageSize,
                    onChange: (pageNo) => {
                      // console.log("Current: ", current);
                      this.loadData({ pageNo });
                    },
                    onShowSizeChange: (pageNo, pageSize) => {
                      this.loadData({ pageNo, pageSize });
                    },
                  }}
          />
        </div>
      </div>
    );
  }
}

module.exports = View;
