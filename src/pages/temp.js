/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/temp.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Wednesday December 6th 2017 4:38:26 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday December 6th 2017 4:38:26 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';

function limitMax(value, mx, vos, id) {
  let sum = 0;
  for (const k in vos) {
    if (vos.hasOwnProperty(k)) {
      if (k !== id) {
        sum += vos[k];
      }
    }
  }
  let ret = '';
  const max = mx - sum;
  if (value > max) {
    ret = max;
  } else {
    ret = value;
  }
  return ret;
}
class componentName extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      vos: { id1: 0, id2: 0 },
    };
  }

  onChange(e, id) {
    const { value } = e.target;
    const vos = this.state.vos;
    vos[id] = limitMax(value, 10, vos, id);
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <input type="text" onChange={e => this.onChange(e, 'id1')} value={this.state.vos.id1} />
        <input type="text" onChange={e => this.onChange(e, 'id2')} value={this.state.vos.id2} />
      </div>
    );
  }
}

module.exports = componentName;
