/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/userManager/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday November 20th 2017 10:17:48 am
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 3:36:05 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions, { Notification } from 'tomatobean/enhance';
import { Table, Switch, Tree, Button } from 'antd';
import { getOrgTree, queryList, disabledept, enabledept } from '../../models/dept';
import './style.less';

const TreeNode = Tree.TreeNode;

const columns = target => [
  {
    title: '编码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <span
        className="operation-item"
        onClick={() => target.edit(record)}
      >
        {text}
      </span>
    ),
  }, {
    title: '部门',
    dataIndex: 'deptType',
    key: 'deptType',
  }, {
    title: '备注',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: '状态',
    dataIndex: 'isEnabled',
    key: 'isEnabled',
    width: 100,
    render: (text, record) => (
      <span>
        <Switch defaultChecked={text === 'Y'} onChange={status => target.changeStatus(record, status)} />
      </span>
    ),
  },
];

@Notification
@BaseActions
@Selecter(['dept'], { getOrgTree, queryList, disabledept, enabledept })
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
    this.create = this.create.bind(this);
  }
  componentDidMount() {
    const { getOrgTree } = this.props.actions;
    getOrgTree();
    this.loadData();
    const { observer } = this.props.notification;
    observer('deptListUpdate', () => {
      this.loadData();
    });
  }
  componentWillUnmount() {
    const { removeObserver } = this.props.notification;
    removeObserver('deptListUpdate');
  }
  onSelect(selectedKeys) {
    const orgId = selectedKeys[0];
    this.setState({
      orgId,
    });
    this.loadData({ orgId });
  }
  changeStatus(record, status) {
    const { disabledept, enabledept } = this.props.actions;
    if (status) {
      enabledept({
        id: record.id,
      }).then(() => {
        this.loadData();
      });
    } else {
      disabledept({
        id: record.id,
      }).then(() => {
        this.loadData();
      });
    }
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
  create() {
    const { linkTo } = this.props.baseActions;
    linkTo({
      pathname: '/dept-cu',
      state: {
        orgId: this.state.orgId,
      } });
  }
  edit(record) {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/dept-cu', state: { deptId: record.id, orgId: record.orgId } });
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
    const { list, total, loading, orgTree } = this.props.dept;
    const { orgId } = this.state;
    return (
      <div className="dept_view_container">
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
          <div className="create-button">
            <Button disabled={orgId === '' || orgId === undefined} type="primary" onClick={this.create}>新增</Button>
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
