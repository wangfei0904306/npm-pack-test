import React, { Component } from 'react';
import NavLink from '../navLink/NavLink';
import { Icon } from 'antd';
import './leftNavbar.less';

export default class LeftNavbar extends Component {
    state = {

    };

    toTop=()=>{
        $('html, body').animate({scrollTop:0});
    }

    render() {

        return (
            <aside className='leftNavbar' >
                <section className="">
                   <div className="listDiv">
                       <div className="ulTitle">
                           <i className="fa fa-address-book"></i>
                           <span>商品管理</span>
                       </div>
                       <ul className="listUl"  onClick={this.toTop}>
                           <li><NavLink to={{pathname: '/goodsList'}}> 商品列表 </NavLink> </li>
                           <li><NavLink to={{pathname: '/goodsReview'}}> 新商品审核 </NavLink></li>
                           <li><NavLink to={{pathname: '/goodsRecommend'}}> 商品推荐 </NavLink></li>
                       </ul>
                   </div>
                    <div className="listDiv">
                        <div className="ulTitle">
                            <i className="fa fa-address-book order"></i>
                            <span>订单管理</span>
                        </div>
                        <ul className="listUl"  onClick={this.toTop}>
                            <li><NavLink to={{pathname: '/salesSlip'}}> 销货单 </NavLink></li>
                        </ul>
                    </div>
                </section>
            </aside>

        );
    }
}
