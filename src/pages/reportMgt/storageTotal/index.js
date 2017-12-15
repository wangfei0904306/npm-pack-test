
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import { Form, Select, Row, Col, Button, Table, Input, DatePicker, Modal } from 'antd';
import { SuplierCpt, WarehouseCpt, ProCategory, ProductCpt } from '../../../components/conciseModal';
import { getCodeMapByTypeCode } from '../../../models/codeModel';
import './style.less';

const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const columns = [{
  title: '物资编码',
  dataIndex: 'name',
}, {
  title: '物资名称',
  dataIndex: 'age',
}, {
  title: '规格',
  dataIndex: 'address',
}, {
  title: '单位',
  dataIndex: 'cangku',
}, {
  title: '入库次数',
  dataIndex: 'pepo',
}, {
  title: '平均单价',
  dataIndex: 'starttime',
}, {
  title: '数量',
  dataIndex: 'stoptime',
}, {
  title: '金额',
  dataIndex: 'caozuo',
},
{
  title: '含税平均单价',
  dataIndex: 'pingjun',
},
{
  title: '含税金额',
  dataIndex: 'jine',
},
{
  title: '中心平均价',
  dataIndex: 'zhongxin',
},
{
  title: '中心数量',
  dataIndex: 'shuliang',
},
{
  title: '中心金额',
  dataIndex: 'zhongxinjine',
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

@Selecter(['codeModel'], { getCodeMapByTypeCode })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      SupplierItems: [],
      StoragesItems: [],
      proCategoryItems: [],
      productItems: [],
      modalWidth: '',
    };
  }
  // 供应商弹层
  handleOk = () => {
    this.setState({
      visible: false,
    });
    const { ModalTitle } = this.state;
    if (ModalTitle === '供应商列表') {
      const supplierStringArr = [];
      this.state.SupplierItems.map((v) => {
        supplierStringArr.push(v.providerName);
        return true;
      });
      this.setState({ supplier: supplierStringArr.join(',') });
    }
    if (ModalTitle === '仓库列表') {
      const storagesStringArr = [];
      this.state.StoragesItems.map((v) => {
        storagesStringArr.push(v.name);
        return true;
      });
      this.setState({ storages: storagesStringArr.join(',') });
    }
    if (ModalTitle === '物资列表') {
      const productStringArr = [];
      this.state.productItems.map((v) => {
        productStringArr.push(v.productName);
        return true;
      });
      this.setState({ product: productStringArr.join(',') });
    }
  }
  // 供应商回调
  selectSupplierRow = (items) => {
    console.log(items);
    this.setState({ SupplierItems: items });
  }
  // 仓库回调
  selectStoragesRow = (items) => {
    // console.log(items);
    this.setState({ StoragesItems: items });
  }
  // 物资分类回调
  selectProCategoryRow = (items) => {
    console.log(items);
    this.setState({ proCategoryItems: items });
  }
  // 物资回调
  selectProductRow = (items) => {
    console.log(items);
    this.setState({ productItems: items });
  }
  selectFun = (items) => {
    const { ModalTitle } = this.state;
    if (ModalTitle === '仓库列表') { this.selectStoragesRow(items); }
    if (ModalTitle === '供应商列表') { this.selectSupplierRow(items); }
    if (ModalTitle === '物资类别列表') { this.selectProCategoryRow(items); }
    if (ModalTitle === '物资列表') { this.selectProductRow(items); }
  }
  selectedItems = () => {
    const { ModalTitle, SupplierItems, StoragesItems, productItems } = this.state;
    if (ModalTitle === '供应商列表') { return SupplierItems; }
    if (ModalTitle === '仓库列表') { return StoragesItems; }
    if (ModalTitle === '物资列表') { return productItems; }
    return [];
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      modalWidth: '' });
  }
  modalOpen = (name) => {
    let Cpt = ''; let title = '';
    if (name === 'warehouse') { Cpt = WarehouseCpt; title = '仓库列表'; }
    if (name === 'supplier') { Cpt = SuplierCpt; title = '供应商列表'; }
    if (name === 'product') { Cpt = ProductCpt; title = '物资列表'; }
    if (name === 'proCategory') { Cpt = ProCategory; title = '物资类别列表'; this.setState({ modalWidth: 500 }); }
    this.setState({
      visible: true,
      ModalCpt: Cpt,
      ModalTitle: title,
    });
  }

  render() {
    const { TYPE_CODE_RKLX } = this.props.codeModel;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { ModalTitle, ModalCpt, supplier, storages, modalWidth, product } = this.state;
    return (
      <div className="storage-total-page">
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
                  initialValue: '',
              })(
                <Select >
                  <Option
                    key=""
                    value=""
                  >全部
                  </Option>
                  {
                    TYPE_CODE_RKLX && TYPE_CODE_RKLX.map(x => (
                      <Option
                        rowKey={`${x.id}`}
                        key={`${x.id}`}
                        value={`${x.code}`}
                      >{x.value}
                      </Option>
                ))
             }
                </Select>
              )}
              </FormItem>

            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="物资"
              >
                {getFieldDecorator('product', {
                  initialValue: '',
              })(
                <div onClick={() => this.modalOpen('product')} className="search-input">
                  <Search
                    value={product}
                    placeholder="搜索物资"
                    onSearch={() => this.modalOpen('product')}
                  />
                </div>
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
                {getFieldDecorator('supplier', {
                  initialValue: '',
              })(
                <div onClick={() => this.modalOpen('supplier')} className="search-input">
                  <Search
                    value={supplier}
                    placeholder="搜索供应商"
                    onSearch={() => this.modalOpen('supplier')}
                  />
                </div>
              )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="仓库"
              >
                {getFieldDecorator('warehouse', {
                  initialValue: '',
              })(
                <div onClick={() => this.modalOpen('warehouse')} className="search-input">
                  <Search
                    value={storages}
                    placeholder="搜索仓库"
                    onSearch={() => this.modalOpen('warehouse')}
                  />
                </div>
              )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="物资分类"
              >
                {getFieldDecorator('checkType', {
                  initialValue: '',
              })(
                <div onClick={() => this.modalOpen('proCategory')} className="search-input">
                  <Search
                    value={storages}
                    placeholder="搜索物资分类"
                    onSearch={() => this.modalOpen('proCategory')}
                  />
                </div>
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
          <Modal
            title={ModalTitle}
            width={modalWidth || 800}
            visible={this.state.visible}
            onOk={() => this.handleOk()}
            onCancel={this.handleCancel}
          >
            {
            ModalCpt ? <ModalCpt
              selectFun={items => this.selectFun(items)}
              selectedItems={this.selectedItems()}
            /> : null
          }
          </Modal>
          <Table className="listTable" bordered columns={columns} dataSource={data} />
        </Form>
      </div>
    );
  }
}

module.exports = Form.create()(View);
