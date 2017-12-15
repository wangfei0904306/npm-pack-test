import React, { Component } from 'react';

function decorator(params, sd) {
  // const sss = new Target();
  // console.log(sss);
  const args = [].slice.call(arguments);
  // console.log(arguments);
  return function (Target, n, descriptor) {
    // console.log(params);
    // console.log(sd);
    const target = new Target();
    // console.log(target.state);
    // console.log(descriptor);
  };
}
@decorator([123, 23], { ss: 123123 })
class testDecorator extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '123' };
  }
  test() {

  }
  render() {
    return (
      <div>
        123123
      </div>
    );
  }
}

module.exports = testDecorator;
