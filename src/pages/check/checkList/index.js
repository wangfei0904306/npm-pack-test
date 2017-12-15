import React, { Component } from 'react';
import { Form, Select, Row, Col, DatePicker, Button, Table } from 'antd';
import { Selecter } from 'tomatobean';
import { listAny, searchAny } from '../../../models/check';

// import moment from 'moment';
import './style.less';

// render: text => <a href="#">{text}</a>,
const FormItem = Form.Item;
const Option = Select.Option;
// const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};
// function handleChange(value) {
//   console.log(`selected ${value}`);
// }
// function handleChanges(value) {
//   console.log(`selected ${value}`);
// }
const columns = target => [
  {
    title: '盘点单号',
    dataIndex: 'col1',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '盘点类型',
    dataIndex: 'col2',
    key: 'l2',
  }, {
    title: '盘点日期',
    dataIndex: 'col3',
    key: 'l3',
  }, {
    title: '仓库',
    dataIndex: 'col4',
    key: 'l4',
  },
  {
    title: '盘点人',
    dataIndex: 'col4',
    key: 'l5',
  },
  {
    title: '盘点开始时间',
    dataIndex: 'col4',
    key: 'l6',
  },
  {
    title: '盘点结束时间',
    dataIndex: 'col4',
    key: 'l7',
  },
  {
    title: '操作',
    dataIndex: 'col4',
    render() {
      return (
        <div className="Images">
          <img src="/assets/images/上传.png" alt="导出" />
          <img className="dayin" src="/assets/images/打印.png" alt="打印" />
        </div>);
    },
  },
];
@Selecter(['checkCK'], { listAny, searchAny })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      params: {
        pageNo: 1,
        pageSize: 10,
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.props.actions.listAny();
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
      const rangeValue = fieldsValue['range-picker'];
      const search = {
        storageCode: fieldsValue.storageCode,
        checkType: fieldsValue.checkType,
        checkDateBegin: rangeValue && rangeValue[0].format('YYYY-MM-DD'),
        checkDateEnd: rangeValue && rangeValue[1].format('YYYY-MM-DD'),
      };
      this.loadData(search);
    });
  }
  loadData(params) {
    this.changeParams(params);
    const { actions } = this.props;
    actions.searchAny(this.state.params);
  }
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
  render() {
    const { storageNames, storageCode } = this.props.checkCK;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div className="checkList">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row type="flex">
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="盘点类型"
              >
                {getFieldDecorator('checkType', {
            initialValue: 'DAILY',
        })(
          <Select style={{ width: 160 }} disabled={this.state.ckType}>
            <Option value="DAILY">日盘</Option>
            <Option value="WEEKLY">周盘</Option>
            <Option value="MONTHLY">月盘</Option>
          </Select>
        )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="盘点仓库"
              >
                {getFieldDecorator('storageCode', {
            initialValue: storageCode,
        })(
          <Select style={{ width: 160 }}>
            {
              storageNames.map((item, key) => {
                return (
                  <Option value={item.storageCode} key={item.storageCode}>{item.storageName}</Option>
                );
              })
          }

          </Select>
        )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="盘点日期"
              >
                {getFieldDecorator('range-picker', {
            initialValue: '',
          })(
            <RangePicker
              format="YYYY-MM-DD"
              onChange={this.onChange}
            />
          )}
              </FormItem>
            </Col>

          </Row>
          <Row type="flex" justify="center" className="checkListbtn">
            <Col span="3">
              <Button type="primary" onClick={this.handleSearch}>查询</Button>
            </Col>
          </Row>
          <Table
            bordered
            rowSelection={rowSelection}
            className="view-data-table"
            dataSource={this.props.checkCK.details}
            columns={this.state.columns}
            rowKey="id"
            scroll={{ x: 900 }}
            pagination={{
              // total,
              current: this.state.params.pageNo,
              showSizeChanger: true,
              pageSize: this.state.params.pageSize,
              onChange: (pageNo) => {
                this.loadData({ pageNo });
              },
              onShowSizeChange: (pageNo, pageSize) => {
                this.loadData({ pageNo, pageSize });
              },
            }}
          />
        </Form>
      </div>

    );
  }
}
module.exports = Form.create()(View);
