/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/directAllocateManager/searchCargo.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Wednesday December 13th 2017 7:26:42 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday December 13th 2017 7:26:42 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Select } from 'antd';
import { getCargoByKeywordRequest } from '../../api/api';

const Option = Select.Option;

let timeout;
let currentValue;
let result;

function query(value, storageCode, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  async function fake() {
    const response = await getCargoByKeywordRequest({
      keyword: value, storageCode });
    // console.log(response);
    if (currentValue === value) {
      result = response.obj || [];
      const data = [];
      result.forEach((r) => {
        data.push({
          value: r.productCode,
          text: r.productName,
        });
      });
      callback(data, result);
    }
  }
  timeout = setTimeout(fake, 300);
}
export class SearchInput extends Component {
  state = {
    data: [],
  }
  handleChange = (value) => {
    if (value || value === 0 || value === false) {
      query(value, this.props.storageCode, (data) => {
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
          this.props.onSelect(el);
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
