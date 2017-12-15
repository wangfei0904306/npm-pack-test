/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/allocate/searchCargo.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday December 11th 2017 10:23:54 am
 * Author: chengpu
 * -----
 * Last Modified:Wednesday December 13th 2017 7:26:42 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Select } from 'antd';
import { getUserByKeywordRequest } from '../../api/api';

const Option = Select.Option;

let timeout;
let currentValue;
let result;

function query(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  async function fake() {
    const response = await getUserByKeywordRequest({
      userName: value });
    // console.log(response);
    if (currentValue === value) {
      result = response.obj || [];
      const data = [];
      result.forEach((r) => {
        data.push({
          value: r.userId,
          text: r.userName,
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
      query(value, (data) => {
        this.setState({ data });
      });
    } else {
      this.props.onSelect(null);
    }
  }
  handleSelect = (value) => {
    if (this.props.onSelect) {
      result.some((el) => {
        if (el.userName + el.userId === value) {
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
          key={d.text.toString() + d.value.toString()}
          value={d.text.toString() + d.value.toString()}
        >{d.text + d.value}
        </Option>)
    );
    return (
      <Select
        disabled={this.props.disabled}
        mode="combobox"
        placeholder={this.props.placeholder}
        notFoundContent=""
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
