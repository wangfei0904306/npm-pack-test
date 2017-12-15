import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import './pagebar.less';

const Option = Select.Option;
const externalPageNum = 1;
class Pagebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: props.total,
      pageNo: props.currentPage | 0,
      currentPage: props.currentPage | 0,
      totalPage: Math.ceil(props.total / (props.pageSize | 10)),
      pageSize: props.pageSize | '10',
    };
    this.pageSizeChange = this
      .pageSizeChange
      .bind(this);
    this.pageOnChange = this
      .pageOnChange
      .bind(this);
    this.pageBack = this
      .pageBack
      .bind(this);
    this.pageAdvance = this
      .pageAdvance
      .bind(this);
    this.handleKeyDown = this
      .handleKeyDown
      .bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.total == 0 || nextProps.total) {
      this.setState({
        total: nextProps.total,
        // pageNo: nextProps.currentPage?nextProps.currentPage:this.state.currentPage,
        // currentPage: nextProps.currentPage?nextProps.currentPage:this.state.currentPage,
        totalPage: Math.ceil(nextProps.total / (this.state.pageSize | 10)),
      });
    }
    if (nextProps.modifyCurrentPage) {
      this.setState({
        total: nextProps.total,
        modifyCurrentPage: nextProps.modifyCurrentPage,
        pageNo: nextProps.modifyCurrentPage,
        currentPage: nextProps.modifyCurrentPage,
        totalPage: Math.ceil(nextProps.total / (this.state.pageSize | 10)),
      });
    }
  }

  pageSizeChange(value) {
    this.setState({
      pageSize: value,
      totalPage: Math.ceil(this.state.total / value),
      currentPage: 1,
      pageNo: 1,
    });
    this.props.onShowSizeChange(1, parseInt(value));
  }
  pageOnChange(e) {
    const { value } = e.target;
    if (value <= this.state.totalPage) {
      const reg = /^[1-9]\d*$/;
      if ((!isNaN(value) && reg.test(value)) || value === '') {
        this.setState({ pageNo: value });
      }
    }
  }
  handleKeyDown(e) {
    if (e.keyCode == 13) {
      if (this.state.pageNo !== '') {
        this.setState({ currentPage: this.state.pageNo });
        this.props.onChange(parseInt(this.state.pageNo));
      }
    }
  }
  handleOnBlur(e) {
    this.setState({ pageNo: this.state.currentPage });
  }

  pageBack() {
    if (this.state.pageNo > 1) {
      this.setState({
        currentPage: parseInt(this.state.currentPage) - 1,
        pageNo: parseInt(this.state.pageNo) - 1,
      });
      this.props.onChange(parseInt(this.state.currentPage) - 1);
    }
  }
  pageAdvance() {
    if (this.state.pageNo < this.state.totalPage) {
      this.setState({
        currentPage: parseInt(this.state.currentPage) + 1,
        pageNo: parseInt(this.state.pageNo) + 1,
      });
      this.props.onChange(parseInt(this.state.currentPage) + 1);
    }
  }
  render() {
    return (
      <div className="pagebar">
        <span className="page-content-cell">总共：{this.state.total}条</span>
        <span className="page-content-cell page-size">每页显示：</span>
        <Select
          defaultValue="10"
          style={{
                    width: 80,
                    float: 'left',
                }}
          onChange={this.pageSizeChange}
        >
          <Option value="10">10/每页</Option>
          <Option value="20">20/每页</Option>
          <Option value="30">30/每页</Option>
          <Option value="40">40/每页</Option>
        </Select>
        <span className="page-content-cell">&nbsp;条</span>
        <span className="page-content-cell">第&nbsp;<input
          className="pagebar-currentpage-input"
          type="text"
          value={this.state.pageNo}
          onChange={this.pageOnChange}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleOnBlur}
        />&nbsp;页
        </span>
        <span className="page-content-cell">共{this.state.totalPage}页</span>

        <i
          onClick={this.pageBack}
          className="page-content-cell page-step pagebar-back fa fa-caret-left"
          aria-hidden="true"
        />

        <i
          onClick={this.pageAdvance}
          className="page-content-cell page-step pagebar-advance fa fa-caret-right"
          aria-hidden="true"
        />

      </div>
    );
  }
}
Pagebar.propTypes = {
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  onShowSizeChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  modifyCurrentPage: PropTypes.number,
};
export default Pagebar;
