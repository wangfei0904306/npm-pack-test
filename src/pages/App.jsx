import React, { Component } from 'react';
import { RootRouteConnect } from 'tomatobean/connect';
import IndexHeader from '../components/indexHeader/IndexHeader';
import Navbar from '../components/navbar/navbar';
import Tabbar from '../components/tabbar/Tabbar';
import '../styles/index.less';

@RootRouteConnect
class App extends Component {
  render() {
    return (
      <div className="app-container">
        <IndexHeader />
        <Navbar />
        <Tabbar />
        {/** 100 --> 60
         *<Tabbar />
         */}
      </div>
    );
  }
}
module.exports = App;
