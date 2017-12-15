/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/userManager/createUser/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday November 20th 2017 2:11:02 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 2:15:52 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import { Form, Row, Col, Input, Select, Button, Cascader } from 'antd';
import { orgDetail, orgCU } from '../../../models/orgCU';
import './style.less';

const FormItem = Form.Item;
const Option = Select.Option;

@BaseActions
@Selecter(['orgCU', 'codeModel', 'uvsModel'], { orgDetail, orgCU })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateStorage: true,
    };
    this.createStorageChange = this.createStorageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { orgCode } = this.props.location.state;
    const { orgDetail } = this.props.actions;
    const { rollBack } = this.props.baseActions;
    rollBack('orgCU');
    if (orgCode) {
      orgDetail({ code: orgCode }).then((res) => {
        this.setState({
          isCreateStorage: res.obj.retailAttrVo.isCreateStorage === 'Y',
        });
      });
    }
  }
  createStorageChange(value) {
    this.setState({
      isCreateStorage: value === 'Y',
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const { orgCU } = this.props.actions;
        const { orgCode, parentOrgCode } = this.props.location.state;
        fields.provinceId = fields.area[0];
        fields.cityId = fields.area[1];
        fields.districtId = fields.area[2];
        const ReqModel = {
          // 门店类型
          retailType: fields.retailType,
          // 门店经理
          retailManager: fields.retailManager,
          // 所属品牌
          brandCode: fields.brandCode,
          // 法人
          legalPerson: fields.legalPerson,
          // 是否是虚拟店
          virtualRetail: fields.virtualRetail,
          // 是否创建仓库
          isCreateStorage: fields.isCreateStorage,
          // 是否虚拟库
          isVirtualStorage: fields.isVirtualStorage,
          // 是否禁盘
          isNoInventory: fields.isNoInventory,
        };
        fields.retailAttrReqModel = ReqModel;
        if (orgCode) {
          fields.orgCode = orgCode;
        } else {
          fields.parentOrgCode = parentOrgCode;
        }
        console.log(JSON.stringify(fields));

        orgCU(fields).then((res) => {
          if (res.success) {
            this.props.baseActions.goBack();
          }
        });
      }
    });
  }

  render() {
    const { detail, loading } = this.props.orgCU;
    const { isCreateStorage } = this.state;
    // const isCreateStorage = true;
    const { cities, TYPE_CODE_ZZFL, TYPE_CODE_QYZT, TYPE_CODE_MDLX } = this.props.codeModel;
    const { brands } = this.props.uvsModel;
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
      <div className="org_cu_view_container">
        <div className="view-operation-bar">
          <Form
            onSubmit={this.handleSubmit}
          >
            <Row className="section-title">基础信息</Row>
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="组织编码"
                >
                  {getFieldDecorator('code', {
                    rules: [
                      { required: true, message: '请填写组织编码!' },
                    ],
                    initialValue: detail.code,
                  })(
                    <Input disabled={!!detail.code} />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="组织名称"
                >
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: '请填写组织名称!' },
                    ],
                      initialValue: detail.name,
                    })(
                      <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="组织简写"
                >
                  {getFieldDecorator('shortName', {
                     rules: [
                      { required: true, message: '请填写组织简写!' },
                    ],
                    initialValue: detail.shortName,
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="组织分类"
                >
                  {getFieldDecorator('orgCategoryCode', {
                    rules: [
                      { required: true, message: '请填写机构名称!' },
                    ],
                    initialValue: detail.orgCategoryCode
                    ? detail.orgCategoryCode.toString()
                    : undefined,
                  })(
                    <Select>
                      {
                      TYPE_CODE_ZZFL.map(x => (
                        <Option
                          key={x.code}
                          value={x.code}
                        >{x.value}
                        </Option>)
                    )}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="状态"
                >
                  {getFieldDecorator('orgStatus', {
                      initialValue: detail.orgStatus,
                    })(
                      <Select>
                        {
                          TYPE_CODE_QYZT.map(x => (
                            <Option
                              key={x.code}
                              value={x.code}
                            >{x.value}
                            </Option>)
                        )}
                      </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="电话"
                >
                  {getFieldDecorator('telphone', {
                    rules: [
                      { required: true, message: '请填写电话号码!' },
                      { pattern: /^1\d{10}$/, message: '请输入正确的电话号码' },
                    ],
                    initialValue: detail.telphone,
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="地址"
                >
                  {getFieldDecorator('area', {
                    rules: [
                      { required: true, message: '请填写机构名称!' },
                    ],
                    initialValue: [detail.provinceId, detail.cityId, detail.districtId],
                  })(
                    <Cascader options={cities} />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="详细地址"
                >
                  {getFieldDecorator('address', {
                    rules: [
                      { required: true, message: '请填写机构名称!' },
                    ],
                    initialValue: detail.address,
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="section-title">门店信息</Row>
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="门店类型"
                >
                  {getFieldDecorator('retailType', {
                    rules: [
                      { required: true, message: '请填写机构名称!' },
                    ],
                    initialValue: detail.retailAttrVo.retailType,
                  })(
                    <Select>
                      {
                      TYPE_CODE_MDLX.map(x => (
                        <Option
                          key={x.code}
                          value={x.code}
                        >{x.value}
                        </Option>)
                    )}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="门店经理"
                >
                  {getFieldDecorator('retailManager', {
                    initialValue: detail.retailAttrVo.retailManager,
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="所属品牌"
                >
                  {getFieldDecorator('brandCode', {
                    initialValue: detail.retailAttrVo.brandCode,
                  })(
                    <Select>
                      {
                        brands.map(x => (
                          <Option
                            key={x.code}
                            value={x.code}
                          >{x.name}
                          </Option>)
                      )}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="法人"
                >
                  {getFieldDecorator('legalPerson', {
                    rules: [
                      { required: true, message: '请填写机构名称!' },
                    ],
                    initialValue: detail.retailAttrVo.legalPerson,
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="是否是虚拟店"
                >
                  {getFieldDecorator('virtualRetail', {
                      initialValue: detail.retailAttrVo.virtualRetail,
                    })(
                      <Select>
                        {
                        TYPE_CODE_QYZT.map(x => (
                          <Option
                            key={x.code}
                            value={x.code}
                          >{x.value}
                          </Option>)
                      )}
                      </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="section-title">库存信息</Row>
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="是否创建仓库"
                >
                  {getFieldDecorator('isCreateStorage', {
                    rules: [
                      { required: true, message: '请填写机构名称!' },
                    ],
                    initialValue: detail.retailAttrVo.isCreateStorage,
                  })(
                    <Select onSelect={this.createStorageChange}>
                      {
                          TYPE_CODE_QYZT.map(x => (
                            <Option
                              key={x.code}
                              value={x.code}
                            >{x.value}
                            </Option>)
                        )}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            {
              isCreateStorage &&
              <Row>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="是否虚拟库"
                  >
                    {getFieldDecorator('isVirtualStorage', {
                    rules: [
                      { required: true, message: '请填写机构名称!' },
                    ],
                    initialValue: detail.retailAttrVo.isVirtualStorage,
                  })(
                    <Select>
                      {
                          TYPE_CODE_QYZT.map(x => (
                            <Option
                              key={x.code}
                              value={x.code}
                            >{x.value}
                            </Option>)
                        )}
                    </Select>
                  )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="是否禁盘"
                  >
                    {getFieldDecorator('isNoInventory', {
                      initialValue: detail.retailAttrVo.isNoInventory,
                    })(
                      <Select>
                        {
                          TYPE_CODE_QYZT.map(x => (
                            <Option
                              key={x.code}
                              value={x.code}
                            >{x.value}
                            </Option>)
                        )}
                      </Select>
                  )}
                  </FormItem>
                </Col>
              </Row>
            }
            <Row style={{ marginTop: 20 }}>
              <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
                <Button className="operation-button" style={{ marginLeft: 25 }} onClick={this.props.baseActions.goBack}>返回</Button>
                <Button className="operation-button" loading={loading} type="primary" htmlType="submit" style={{ marginLeft: 25 }}>保存</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

module.exports = Form.create()(View);
