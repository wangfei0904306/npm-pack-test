import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import NavLink from '../navLink/NavLink';
// import { toggle } from '../../models/internal';
import './navbar.less';

const logoImg = require('../../../assets/images/xb_logo.jpg');

@BaseActions
@Selecter(['internal'])
export default class Navbar extends Component {
    state = {
      navbarData: [
        {
          parentCode: '000000',
          code: '001000000000',
          functionName: '报货管理',
          functionUrl: '#/basic-information',
          functionIcon: 'icon-carrgo',
          menu: [
            {
              parentCode: '001000000000',
              code: '001001000000',
              functionName: '报货',
              functionUrl: '',
              functionIcon: '',
              menu: [
                {
                  parentCode: '001001000000',
                  code: '001001001000',
                  functionName: '档口报货',
                  functionUrl: '/storesCargo',
                  functionIcon: '',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '001001000000',
                  code: '001001002000',
                  functionName: '档口报货审核',
                  functionUrl: '/auditCargo',
                  functionIcon: '',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '001001000000',
                  code: '001001003000',
                  functionName: '直配报货',
                  functionUrl: '/rectionCargo',
                  functionIcon: '',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
              ],
              brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
            },
          ],
          brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
        },
        {
          parentCode: '000000',
          code: '002000000000',
          functionName: '验货',
          functionUrl: '/examine-cargo',
          functionIcon: 'icon-inspection',
          menu: [
            {
              parentCode: '002000000000',
              code: '002001000000',
              functionName: '验货',
              menu: [
                {
                  parentCode: '002001000000',
                  code: '002001002000',
                  functionName: '验货单列表',
                  functionUrl: '/examine-cargo',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
              ],
              brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
            },
          ],
          brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
        },
        {
          parentCode: '000000',
          code: '003000000000',
          functionName: '库存管理',
          functionUrl: '#/menber-index',
          functionIcon: 'icon-inventory',
          menu: [
            {
              parentCode: '003000000000',
              code: '00300100000',
              functionName: '直拨单管理',
              functionUrl: '/direct-allocate-create',
              menu: [
                {
                  parentCode: '003001000000',
                  code: '003001001000',
                  functionName: '直拨单填置',
                  functionUrl: '/direct-allocate-create',
                },
                {
                  parentCode: '003001000000',
                  code: '003001002000',
                  functionName: '直拨单查询',
                  functionUrl: '/direct-allocate-manager',
                },
              ],
            },
            {
              parentCode: '003000000000',
              code: '0030010000',
              functionName: '调拨管理',
              functionUrl: '',
              menu: [
                {
                  parentCode: '003001000000',
                  code: '003001001000',
                  functionName: '调拨',
                  functionUrl: '/allo-cation',
                },
                {
                  parentCode: '003001000000',
                  code: '003001002000',
                  functionName: '调拨单查询',
                  functionUrl: '/allocate-manager',
                },
              ],
            },
            {
              parentCode: '003000000000',
              code: '003001000000',
              functionName: '盘点',
              functionUrl: '',
              menu: [
                {
                  parentCode: '003001000000',
                  code: '003001001000',
                  functionName: '盘点',
                  functionUrl: '/check-manager',
                },
                {
                  parentCode: '003001000000',
                  code: '003001002000',
                  functionName: '盘点列表',
                  functionUrl: '/checkList-manager',
                },
              ],
            },
          ],
          brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
        },
        {
          parentCode: '000000',
          code: '004000000000',
          functionName: '期初管理',
          functionUrl: '#/active-index',
          functionIcon: 'icon-beginning',
          menu: [
            {
              parentCode: '004000000000',
              code: '004001000000',
              functionName: '期初管理',
              menu: [
                {
                  parentCode: '004001000000',
                  code: '004001002000',
                  functionName: '期初管理',
                  functionUrl: '#/marketingActivity',
                },
              ],
              brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
            },
          ],
          brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
        },
        {
          parentCode: '000000',
          code: '006000000000',
          functionName: '报表',
          functionIcon: 'icon-report',
          menu: [
            {
              parentCode: '006000000000',
              code: '006001000000',
              functionName: '仓库查询',
              menu: [
                {
                  parentCode: '006001000000',
                  code: '006001001000',
                  functionName: '入库明细查询',
                  functionUrl: '/statement-manager',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '006001000000',
                  code: '006001002000',
                  functionName: '入库汇总查询',
                  functionUrl: '/storageTotal-manager',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '006001000000',
                  code: '006001003000',
                  functionName: '出库汇总查询',
                  functionUrl: '/outboundTotal-manager',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '006001000000',
                  code: '006001004000',
                  functionName: '出库明细查询',
                  functionUrl: '/outbounddetail-manager',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '006001000000',
                  code: '006001005000',
                  functionName: '物资综合查询',
                  functionUrl: '#/daily-product-gross-profit',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '006001000000',
                  code: '006001006000',
                  functionName: '物资明细查询',
                  functionUrl: '#/summary-product-gross-profit',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '006001000000',
                  code: '006001007000',
                  functionName: '调拨汇总查询',
                  functionUrl: '/allotcate-manager',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
              ],
              brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
            },
          ],
          brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
        },
        {
          parentCode: '000000',
          code: '010000000000',
          functionName: '系统管理',
          functionUrl: '#/fund-settlement',
          functionIcon: 'icon-usermgt',
          menu: [
            {
              parentCode: '010000000000',
              code: '010001000000',
              functionName: '用户管理',
              menu: [
                {
                  parentCode: '010001000000',
                  code: '010001001000',
                  functionName: '组织管理',
                  functionUrl: '/org-manager',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '010001000000',
                  code: '010001002000',
                  functionName: '部门管理',
                  functionUrl: '/dept-manager',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '010001000000',
                  code: '0100010030001',
                  functionName: '角色管理',
                  functionUrl: '/role-manager',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
                {
                  parentCode: '010001000000',
                  code: '0100010030002',
                  functionName: '用户管理',
                  functionUrl: '/user-manager',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
              ],
              brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
            },
          ],
          brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
        }, {
          parentCode: '000000',
          code: 'ed12',
          functionName: '配置管理',
          functionUrl: '#/fund-settlement',
          functionIcon: 'icon-cogs',
          menu: [
            {
              parentCode: '010000000000',
              code: '010002000000',
              functionName: '配置管理',
              menu: [
                {
                  parentCode: '010002000000',
                  code: '010002001000',
                  functionName: '系统参数配置',
                  functionUrl: '#/finance/statement/supplierStatement',
                  brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
                },
              ],
              brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
            },
          ],
          brandId: 'AD56B6D97F688D41419D6D5CC0B9F90CF7',
        },
      ],
    };
    pointerleave=() => {
      $('.submenuDiv').css('display', 'none');
      $('.dropdown-toggle').removeClass('activeA');
    }
    hoverLi =(e, length) => {
      const withs = `${length * 116}px`;
      $('.dropdown-toggle').removeClass('activeA');
      $('.submenuDiv').css('display', 'none');
      let submenuDiv;
      if ($(e.target)[0].className === 'dropdown-toggle') {
        submenuDiv = $(e.target).parent().find('.submenuDiv');
        $('.dropdown-toggle').removeClass('activeA');
        $(e.target).addClass('activeA');
      } else {
        $(e.target).parent().addClass('activeA');
        submenuDiv = $(e.target).parent().parent().find('.submenuDiv');
      }
      submenuDiv.css({ display: 'block', width: withs });
    };
    clickHref =() => {
      $('.submenuDiv').css('display', 'none');
      $('.dropdown-toggle').removeClass('activeA');
    };
    // toggle = () => {
    //   this.setState({ collapsed: !this.state.collapsed de
    // }

    render() {
      return (
        <aside className={this.props.internal.collapsed === true ? 'appNavbar' : 'packNavbar'} >
          <div className="title">
            <a>
              <img src={logoImg} className="logo" alt="" />
            </a>
          </div>
          <section className="" onMouseLeave={this.pointerleave}>
            <ul className="nav nav-list">
              <li className="liClass" onMouseEnter={e => this.hoverLi(e)} >
                <a onClick={() => this.props.baseActions.linkTo('/home')} className="dropdown-toggle">
                  <i className="icon-home" />
                  <span>首页</span>
                </a>
              </li>
              {
                this.state.navbarData.map(v => (
                  <li className="liClass" onMouseEnter={e => this.hoverLi(e, v.menu.length)} key={v.code} >
                    <a className="dropdown-toggle" >
                      <i className={v.functionIcon} />
                      <span className="menu-text"> {v.functionName} </span>
                    </a>
                    <div className="submenuDiv" >
                      {
                        v.menu.map((datas, index) => (
                          <div className="menuDiv" key={datas.code}>
                            <div className="first">
                              <div className="round" />
                              <span>{datas.functionName}</span>
                            </div>
                            <ul className="submenu" >
                              {
                                datas.menu.map(data =>
                                     (<li className="singleLine" key={data.code}><NavLink to={{ pathname: data.functionUrl, search: '' }} onClick={this.clickHref} className="jumpNavlist"> {data.functionName} </NavLink> </li>)
                                )
                            }
                            </ul>
                            {
                                index !== v.menu.length - 1 ? <div className="dashLine" /> : null
                            }

                          </div>
                        ))
                    }
                    </div>
                  </li>
                ))
            }
            </ul>
          </section>
        </aside>

      );
    }
}
