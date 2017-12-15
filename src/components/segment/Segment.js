import React, { Component } from 'react';
import './segment.less';
// import eventProxy from '../../util/eventProxy';

/**
 * titeles 为数组 [{name:'在售商品',id:'12'},{name:'上架商品',id:'123123'}];
 * func 为function
 */
export default class Segment extends Component {
//   constructor(props) {
//     super(props);
//   }
    clickHreaf=(e, func, id) => {
      $('.segmentLi').removeClass('active');
      $(e.target).parent().addClass('active');
      func(id);
      // 发布 msg 事件
      // eventProxy.trigger('data', data);
    };
    render() {
      const { titles, func, selected } = this.props;
      return (
        <div >
          <ul className="segment-tab">
            {
                        titles.map((v, k) => {
                            return (

                                selected ?
                                    v.id == selected ?
                                      <li key={k} className="segmentLi active"><a onClick={e => this.clickHreaf(e, func, v.id)}>{v.name}</a></li> :
                                      <li key={k} className="segmentLi "><a onClick={e => this.clickHreaf(e, func, v.id)}>{v.name}</a></li>
                                    :
                                    k == 0 ?
                                      <li key={k} className="segmentLi active"><a onClick={e => this.clickHreaf(e, func, v.id)}>{v.name}</a></li> :
                                      <li key={k} className="segmentLi "><a onClick={e => this.clickHreaf(e, func, v.id)}>{v.name}</a></li>

                            );
                        })
                    }
          </ul>
        </div>

      );
    }
}
