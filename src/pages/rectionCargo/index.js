/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/pages/rectionCargo/index.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Thursday December 7th 2017 1:40:12 pm
 * Author: chengpu
 * -----
 * Last Modified:Thursday December 7th 2017 1:40:12 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import moment from 'moment';
import { Upload, message, Button, Icon, Table, Row, Col } from 'antd';
import { rectionCargo } from '../../models/cargo';
// import { urlAppendQuery } from '../../util/tools';
import './style.less';

const columns = () => [
  {
    title: '日期',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '门店名称',
    dataIndex: 'requireDate',
    key: 'requireDate',
  }, {
    title: '档口名称',
    dataIndex: 'requireQty',
    key: 'requireQty',
  }, {
    title: '物资编码',
    dataIndex: 'requireAmount',
    key: 'requireAmount',
  }, {
    title: '物资名称',
    dataIndex: 'deptCode',
    key: 'deptCode',
  }, {
    title: '规格',
    dataIndex: 'deptName',
    key: 'deptName',
  }, {
    title: '单位',
    dataIndex: 'createByName',
    key: 'createByName',
  }, {
    title: '数量',
    dataIndex: 'requireStatusName',
    key: 'requireStatusName',
  },
];
const resultColumns = () => [
  {
    title: '日期',
    dataIndex: 'proDate',
    key: 'proDate',
    render: text => moment(text).format('YYYY-MM-DD'),
  }, {
    title: '门店名称',
    dataIndex: 'orgName',
    key: 'orgName',
  }, {
    title: '档口名称',
    dataIndex: 'deptName',
    key: 'deptName',
  }, {
    title: '原物资编码',
    dataIndex: 'materialName',
    key: 'materialName',
  }, {
    title: '原物资名称',
    dataIndex: 'materialCoding',
    key: 'materialCoding',
  }, {
    title: '物资编码',
    dataIndex: 'systemMaterialCoding',
    key: 'systemMaterialCoding',
  }, {
    title: '物资名称',
    dataIndex: 'systemMaterialName',
    key: 'systemMaterialName',
  }, {
    title: '规格',
    dataIndex: 'specification',
    key: 'specification',
  }, {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
  }, {
    title: '数量',
    dataIndex: 'proCount',
    key: 'proCount',
  }, {
    title: '单价',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
  }, {
    title: '金额',
    dataIndex: 'requireAmount',
    key: 'requireAmount',
  }, {
    title: '下单人',
    dataIndex: 'createBy',
    key: 'createBy',
  },
];
@BaseActions
@Selecter(['cargo'], { rectionCargo })
class RecrionCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      resultColumns: resultColumns(this),
      tableData: [],
      directCode: '',
      flag: true,
    };
  }
  onChangeFile = (info) => {
    const self = this;
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      const data = info.file.response.obj;
      // let payMoney = 0;
      // for (let i = 0; i < data.length; i++) {
      //   payMoney += data[i].amount;
      // }
      console.log(data);
      self.setState({ tableData: data.directList, directCode: data.directCode, flag: false });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  handleSubmit = () => {
    // const option = {
    //   url: urlAppendQuery(`${host}//order-service/order/retail/dept/require/readExcel/excelAdd`, { directCode: this.state.directCode }),
    //   method: 'post',
    // };
    // getJson(option, (data) => {
    //   console.log(data);
    // });
    const { rectionCargo } = this.props.actions;
    rectionCargo({ directCode: this.state.directCode }).then((res) => {
      if (res.success) {
        message.success('生成报货单成功');
      }
    });
  }
  render() {
    const upProps = {
      name: 'file',
      action: `${host}/order-service/order/retail/dept/require/readExcel/uploadFile`,
      showUploadList: false,
      headers: { token: localStorage.token, 'X-Requested-With': null },
      onChange: this.onChangeFile,
    };
    return (
      <div className="recrion-cargo-page">
        <div className="upLoad">
          <p>上传文件：</p>
          <Upload {...upProps}>
            <Button>
              <Icon type="upload" /> 点击上传文件
            </Button>
          </Upload>
        </div>
        <div className="information">
        说明：1.以下模板中红色字段不能为空
        </div>
        <div className="information-table">
          <Table columns={this.state.columns} dataSource={[]} />
        </div>
        <div className="result">
        导入结果：
        </div>
        <Table
          footer={() => {
          return (
            <div className="cargo-bottom">
              <span>合计</span>
              <span style={{ marginLeft: 30 }}>数量：123</span>
              <span style={{ marginLeft: 30 }}>含税金额：￥1234</span>
            </div>);
        }}
          columns={this.state.resultColumns}
          dataSource={this.state.tableData}
        />
        <Row style={{ marginTop: 20 }}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
            <Button className="operation-button" style={{ marginLeft: 25 }} onClick={this.props.baseActions.goBack}>返回</Button>
            <Button className="operation-button" type="primary" disabled={this.state.flag} onClick={this.handleSubmit} style={{ marginLeft: 25 }}>生成报货单</Button>
          </Col>
        </Row>
      </div>

    );
  }
}


module.exports = RecrionCargo;
