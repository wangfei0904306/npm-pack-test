/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/components/conciseModal/suplier.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Tuesday December 12th 2017 4:25:24 pm
 * Author: caoyang
 * -----
 * Last Modified:Tuesday December 12th 2017 4:25:24 pm
 * Modified By: caoyang
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import { Row, Col, Button, Table, Input, Form } from 'antd';
import { getAllSuppliers } from '../../models/uvsModel';

const FormItem = Form.Item;
const columns = () => [
  {
    title: '编码',
    dataIndex: 'providerCode',
    key: 'providerCode',
  }, {
    title: '名称',
    dataIndex: 'providerName',
    key: 'providerName',
  }, {
    title: '缩写',
    dataIndex: 'requireQty',
    key: 'requireQty',
    render: text => (
      text
    ),
  }, {
    title: '联系人',
    dataIndex: 'requireAmount',
    key: 'requireAmount',
  }, {
    title: '联系人2',
    dataIndex: 'deptCode',
    key: 'deptCode',
  }, {
    title: '电话',
    dataIndex: 'deptName',
    key: 'deptName',
  },
];


@Selecter(['uvsModel'], { getAllSuppliers })
class SuplierView extends Component {
  constructor(props) {
    super(props);
    const selectIds = [];
    this.props.selectedItems.map((v) => {
      selectIds.push(v.id);
      return true;
    });
    this.state = {
      columns: columns(this),
      selectedRowKeys: selectIds || [],
      params: {
        pageNo: 1,
        pageSize: 10,
      },
    };
  }
  componentDidMount() {
    this.loadData();
  }
  onSelect = (record, selected) => {
    if (selected) {
      this.props.selectedItems.push(record);
      this.props.selectFun(this.props.selectedItems);
    } else {
      this.props.selectedItems.map((v, k) => {
        if (record.id === v.id) {
          this.props.selectedItems.splice(k, 1);
        }
        this.props.selectFun(this.props.selectedItems);
        return true;
      });
    }
  }
  onSelectAll = (selected, selectedRows, changeRows) => {
    if (selected) {
      changeRows.map((v) => {
        this.props.selectedItems.push(v);
        return true;
      });
      this.props.selectFun(this.props.selectedItems);
    } else {
      const arr = [];
      this.props.selectedItems.map((v1, k1) => {
        changeRows.map((v2) => {
          if (v1.id === v2.id) { arr.push(k1); }
          return k1;
        });
        return true;
      });
      this.props.selectedItems.splice(arr[0], arr.length);
      this.props.selectFun(this.props.selectedItems);
    }
  }
  onChange = (selectedKeys) => {
    console.log('selectedRowKeys changed: ', selectedKeys);
    this.setState({ selectedRowKeys: selectedKeys });
  }
  loadData=(params) => {
    this.changeParams(params);
    const { getAllSuppliers } = this.props.actions;
    getAllSuppliers(this.state.params);
  }
  changeParams=(params) => {
    if (typeof (params) === 'object') {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const element = params[key];
          this.state.params[key] = element;
        }
      }
    }
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onChange,
      onSelect: this.onSelect,
      onSelectAll: this.onSelectAll,
    };
    const { getFieldDecorator } = this.props.form;
    const { allSuppliers, total } = this.props.uvsModel;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div className="SuplierCpt">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="编码"
              >
                {getFieldDecorator('range-picker', {
      initialValue: '',
    })(
      <Input />
    )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="缩写"
              >
                {getFieldDecorator('deptId', {
    initialValue: '',
  })(
    <Input />
  )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="名称"
              >
                {getFieldDecorator('requireStatus', {
          initialValue: '',
        })(
          <Input />
      )}
              </FormItem>
            </Col>
            <Col span={6} style={{ paddingLeft: 30 }}>
              <Button className="operation-button" type="primary" htmlType="submit" >查询</Button>
            </Col>
          </Row>
        </Form>
        <Table
          bordered
          rowSelection={rowSelection}
          loading={false}
          dataSource={allSuppliers}
          columns={this.state.columns}
          rowKey="id"
          size="small"
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
    );
  }
}
const SuplierCpt = Form.create()(SuplierView);
export default SuplierCpt;
