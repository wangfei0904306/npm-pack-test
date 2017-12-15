/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/components/conciseModal/product.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Thursday December 14th 2017 5:50:23 pm
 * Author: caoyang
 * -----
 * Last Modified:Thursday December 14th 2017 5:50:23 pm
 * Modified By: caoyang
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import { Row, Col, Button, Table, Input, Form, Tree } from 'antd';
import { getAllSuppliers, getProCategoryTree, getAllProduct } from '../../models/uvsModel';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const columns = () => [
  {
    title: '物资编码',
    dataIndex: 'productName',
    key: 'productName',
  }, {
    title: '物资名称',
    dataIndex: 'productCode',
    key: 'productCode',
  }, {
    title: '规格',
    dataIndex: 'productSpce',
    key: 'productSpce',
    render: text => (
      text
    ),
  }, {
    title: '缩写',
    dataIndex: 'shortPinyin',
    key: 'shortPinyin',
  }, {
    title: '标准单位',
    dataIndex: 'deptCode',
    key: 'deptCode',
  }, {
    title: '辅助单位',
    dataIndex: 'deptName',
    key: 'deptName',
  }, {
    title: '状态',
    dataIndex: 'qwe',
    key: 'qwe',
  },
];


@Selecter(['uvsModel'], { getAllSuppliers, getProCategoryTree, getAllProduct })
class View extends Component {
  constructor(props) {
    super(props);
    const selectIds = [];
    this.props.selectedItems.map((v) => {
      selectIds.push(v.productCode);
      return true;
    });
    this.state = {
      columns: columns(this),
      selectedRowKeys: selectIds || [],
      params: {
        pageNo: 1,
        pageSize: 10,
      },
      expandedKeys: [],
      autoExpandParent: true,
      selectedKeys: [],
    };
  }
  componentDidMount() {
    this.loadData();
    const { getProCategoryTree } = this.props.actions;
    getProCategoryTree();
  }
  onSelect = (record, selected) => {
    if (selected) {
      this.props.selectedItems.push(record);
      this.props.selectFun(this.props.selectedItems);
    } else {
      this.props.selectedItems.map((v, k) => {
        if (record.productCode === v.productCode) {
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
          if (v1.productCode === v2.productCode) { arr.push(k1); }
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
    const { getAllProduct } = this.props.actions;
    getAllProduct(this.state.params);
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
  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onSelectKeys = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
  handleSearch=(e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
      console.log(fieldsValue);
      // const { depts } = this.props.uvsModel;
      // const reg = /^[\u4E00-\u9FA5]+$/;
      // const values = {
      //   deptId: parseInt(fieldsValue.deptId, 0),
      //   requireStatus: fieldsValue.requireStatus,
      //   requireDateStart: rangeValue && rangeValue[0].format('YYYY-MM-DD'),
      //   requireDateEnd: rangeValue && rangeValue[1].format('YYYY-MM-DD'),
      // };
      this.loadData(fieldsValue);
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.childrens && item.childrens.length > 0) {
        return (
          <TreeNode title={item.categoryName} key={item.categoryCode} dataRef={item}>
            {this.renderTreeNodes(item.childrens)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.categoryName} key={item.categoryCode} />;
    });
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
    const { allProduct, total, proCategoryTree } = this.props.uvsModel;
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
                {getFieldDecorator('code', {
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
                {getFieldDecorator('shortName', {
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
                {getFieldDecorator('name', {
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
        <div style={{ display: 'flex' }}>
          <Tree
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onSelect={this.onSelectKeys}
          >
            {this.renderTreeNodes(proCategoryTree || [])}
          </Tree>
          <div style={{ marginLeft: 40 }}>
            <Table
              bordered
              rowSelection={rowSelection}
              loading={false}
              dataSource={allProduct}
              columns={this.state.columns}
              rowKey="productCode"
              size="small"
              width={500}
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

      </div>
    );
  }
}
const ProductCpt = Form.create()(View);
export default ProductCpt;
