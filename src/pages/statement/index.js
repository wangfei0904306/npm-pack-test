
import React, { Component } from 'react';
import { Form, Select, Row, Col, Button, Table, Input, DatePicker } from 'antd';
import './style.less';

const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const columns = [{
  title: '日期',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '凭证号',
  dataIndex: 'age',
}, {
  title: '物资编码',
  dataIndex: 'address',
}, {
  title: '物资名称',
  dataIndex: 'cangku',
}, {
  title: '规格',
  dataIndex: 'pepo',
}, {
  title: '单位',
  dataIndex: 'starttime',
}, {
  title: '数量',
  dataIndex: 'stoptime',
}, {
  title: '单价',
  dataIndex: 'caozuo',
},
{
  title: '金额',
  dataIndex: 'pingjun',
},
{
  title: '含税单价',
  dataIndex: 'jine',
},
{
  title: '含税金额',
  dataIndex: 'zhongxin',
},
{
  title: '配送单位',
  dataIndex: 'shuliang',
},
{
  title: '配送数量',
  dataIndex: 'zhongxinjine',
},
{
  title: '单据类型',
  dataIndex: 'danju',
},
{
  title: '供应商',
  dataIndex: 'gongyingshang',
},
{
  title: '仓位',
  dataIndex: 'cangwei',
},
{
  title: '备注',
  dataIndex: 'beizhu',
},
{
  title: '生产日期',
  dataIndex: 'shengchan',
},
{
  title: '批次号',
  dataIndex: 'pici',
},
];
const data = [{
  key: '1',
  name: '123123123',
  age: '月盘',
  address: '2017-17-10',
  cangku: '凉档北京未来广场',
  pepo: '李四',
  starttime: '2017-19-19',
  stoptime: '2017-19-19',
}, {
  key: '2',
  name: '123123123',
  age: '日盘',
  address: '2017-17-10',
  cangku: '凉档北京未来广场',
  pepo: '李四',
  starttime: '2017-19-19',
  stoptime: '2017-19-19',

}, {
  key: '3',
  name: '123123213',
  age: '周盘',
  address: '2017-17-10',
  cangku: '凉档北京未来广场',
  pepo: '李四',
  starttime: '2017-19-19',
  stoptime: '2017-19-19',
}];

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="checktype">
        <Form>
          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="入库时间"
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
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="单据类型"
              >
                {getFieldDecorator('checkType', {
                  initialValue: 'DAILY',
              })(
                <Select disabled={this.state.ckType}>
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
                label="物资"
              >
                {getFieldDecorator('checkType', {
                  initialValue: 'DAILY',
              })(
                <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="供应商"
              >
                {getFieldDecorator('checkType', {
                  initialValue: 'DAILY',
              })(
                <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="仓库"
              >
                {getFieldDecorator('checkType', {
                  initialValue: 'DAILY',
              })(
                <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="物资分类"
              >
                {getFieldDecorator('checkType', {
                  initialValue: 'DAILY',
              })(
                <Input placeholder="Basic usage" />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span={2}>
              <Button type="primary">查询</Button>
            </Col>
          </Row>
          <Row type="flex" justify="end center">
            <Col span={2}><span className="imgs"><img className="imgs" src="../../../assets/images/蓝色上传.png" alt="打印" /></span><span className="fontsize">打印</span></Col>
            <Col span={2}><span className="imgs"><img className="imgs" src="../../../assets/images/蓝色打印.png" alt="导出" /></span><span className="fontsize">导出</span></Col>
          </Row>
          <Table className="listTable" bordered columns={columns} dataSource={data} />
        </Form>
      </div>
    );
  }
}

module.exports = Form.create()(View);
