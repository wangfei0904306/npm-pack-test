/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/pages/storesCargo/storesCargoCU/checkSearch.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Tuesday November 21st 2017 7:52:36 pm
 * Author: youngcao
 * -----
 * Last Modified:Wednesday December 6th 2017 2:55:22 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Select } from 'antd';
import { getProductByKeywordRequest, getProductMsgByCodeRequest } from '../../api/api';

const Option = Select.Option;

let timeout;
let currentValue;
let result;

function query(value, providerCode, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  async function fake() {
    const response = await getProductByKeywordRequest({
      productName: value, providerCode });
    // console.log(response);
    if (currentValue === value) {
      result = response.obj || [];
      const data = [];
      result.forEach((r) => {
        data.push({
          value: r.productId,
          text: r.productName,
        });
      });
      callback(data, result);
    }
  }
  timeout = setTimeout(fake, 300);
}
async function getProMsyByCode(el, target) {
  const response = await getProductMsgByCodeRequest({ code: el.productCode });
  el.elseProObj = response.obj;
  target.props.onSelect(el);
}
export class SearchInput extends Component {
  state = {
    data: [],
  }
  handleChange = (value) => {
    if (value || value === 0 || value === false) {
      query(value, this.props.providerCode, (data) => {
        this.setState({ data });
      });
    } else {
      this.props.onSelect(null);
    }
  }
  handleSelect = (value) => {
    if (this.props.onSelect) {
      result.some((el) => {
        if (el.productName === value) {
          getProMsyByCode(el, this);
          return true;
        }
        return false;
      }, this);
    }
  }
  render() {
    const options = this.state.data.map(d =>
      (
        <Option
          title={d.text.toString()}
          key={d.value.toString()}
          value={d.text.toString()}
        >{d.text}
        </Option>)
    );
    return (
      <Select
        disabled={this.props.disabled}
        mode="combobox"
        placeholder={this.props.placeholder}
        notFoundContent=""
        defaultValue={this.props.value || ''}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        className={this.props.className}
      >
        {options}
      </Select>
    );
  }
}
export const SearchII = (props) => {
  const handleSelect = (value) => {
    if (props.onSelect) {
      props.list.some((el) => {
        if (el.name === value) {
          props.onSelect(el);
          return true;
        }
        return false;
      }, this);
    }
  };
  return (
    <Select
      disabled={props.disabled}
      showSearch
      placeholder="档口"
      style={{ width: '100%' }}
      className="ant-select-open"
    // mode="multiple"
      mode="combobox"
      onSelect={handleSelect}
      filterOption={
      (input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    >
      {
    props.list.map(x => (
      <Option
        key={`${x.id}`}
        value={`${x.name}`}
      >{x.name}
      </Option>)
    )}
    </Select>
  );
};
