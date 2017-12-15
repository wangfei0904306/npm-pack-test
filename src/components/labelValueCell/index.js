/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/components/labelValueCell/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 23rd 2017 2:59:26 pm
 * Author: chengpu
 * -----
 * Last Modified:Thursday November 23rd 2017 2:59:26 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React from 'react';
import { Col } from 'antd';

const Cell = (props) => {
  const { layout, data } = props;
  return (
    <Col span={layout.wrapper} style={{ height: 30 }}>
      <Col span={layout.label} style={{ color: '#333333', textAlign: 'right', paddingRight: 10 }}>
        {data.label}:
      </Col>
      <Col span={layout.content}>
        {data.content}
      </Col>
    </Col>
  );
};
export default Cell;
