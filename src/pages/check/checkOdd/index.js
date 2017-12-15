import React, { Component } from 'react';
import { Table, Button, Row } from 'antd';
import './style.less';

const { Column, ColumnGroup } = Table;
const data = [{
  key: '1',
  firstName: '1',
  lastName: '12334',
  wuziName: '12334',
  guige: '双',
  num1: 12,
  num2: 12,
  num3: 12,
  num4: 12,
  num5: 12,
  danwei1: '包',
  danwei2: '包',
  danwei3: '包',
  danwei4: '包',
  danwei5: '包',
}, {
  key: '2',
  firstName: '2',
  wuziName: '12334',
  lastName: '123123',
  guige: '双',
  num1: 12,
  num2: 12,
  num3: 12,
  num4: 12,
  num5: 12,
  danwei1: '包',
  danwei2: '包',
  danwei3: '包',
  danwei4: '包',
  danwei5: '包',
}, {
  key: '3',
  firstName: '3',
  lastName: '123123',
  wuziName: '12334',
  guige: '双',
  num1: 12,
  num2: 12,
  num3: 12,
  num4: 12,
  num5: 12,
  danwei1: '包',
  danwei2: '包',
  danwei3: '包',
  danwei4: '包',
  danwei5: '包',
}];
class Comp extends Component {
  render() {
    return (
      <div className="checkOdd">
        <Table bordered className="tableStyle" dataSource={data} >
          <ColumnGroup className="thStyle" title="物资">
            <Column
              title="顺序号"
              dataIndex="firstName"
              key="firstName"
            />
            <Column
              title="物资编码"
              dataIndex="lastName"
              key="lastName"
            />
            <Column
              title="物资名称"
              dataIndex="wuziName"
              key="wuziName"
            />
            <Column
              title="规格"
              dataIndex="guige"
              key="guige"
            />
          </ColumnGroup>
          <ColumnGroup className="thStyle" title="初始入库">
            <Column
              title="数量"
              dataIndex="num1"
              key="num1"
            />
            <Column
              title="单位"
              dataIndex="danwei1"
              key="danwei1"
            />
          </ColumnGroup>
          <ColumnGroup className="thStyle" title="入库">
            <Column
              title="数量"
              dataIndex="num2"
              key="num2"
            />
            <Column
              title="单位"
              dataIndex="danwei2"
              key="danwei2"
            />
          </ColumnGroup>
          <ColumnGroup className="thStyle" title="盘点">
            <Column
              title="数量"
              dataIndex="num3"
              key="num3"
            />
            <Column
              title="单位"
              dataIndex="danwei3"
              key="danwei3"
            />
          </ColumnGroup>
          <ColumnGroup className="thStyle" title="在途">
            <Column
              title="数量"
              dataIndex="num4"
              key="num4"
            />
            <Column
              title="单位"
              dataIndex="danwei4"
              key="danwei4"
            />
          </ColumnGroup>
          <ColumnGroup className="thStyle" title="当前库存合计">
            <Column
              title="数量"
              dataIndex="num5"
              key="num5"
            />
            <Column
              title="单位"
              dataIndex="danwei5"
              key="danwei5"
            />
          </ColumnGroup>
        </Table>
        <Row className="checkOddbtn" type="flex" justify="center">
          <Button type="danger">关闭</Button>
        </Row>

      </div>
    );
  }
}
module.exports = Comp;
