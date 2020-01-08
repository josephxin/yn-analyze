/**
 * xf
 */

import React, { Component } from 'react';
import * as d3 from 'd3';
import "./analysiscompany.css";
const pi = Math.PI;

class AnalysisCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this._flag = false;
    this._lock = false;
  };
  _setData(d) {
    this._flag = true;
    this._lock = true;
    this.setState({ data: d })
  };

  render() {
    let me = this;
    return (
      <div style={me.props.style} className="analysis-company-wrap">
        {me.props.type ? '' : (
          <div style={{
            width: me.props.style.width,
            height: me.props.style.height
          }} className="analysis-company-bgB"></div>
        )}
        {me.props.type ? '' : (
          <div style={{
            left: me.props.style.width / 2 - 200,
            top: me.props.style.height / 2 - 200
          }} className="analysis-company-bgG"></div>
        )}
        <div style={{
          left: me.props.style.width / 2 - 90,
          top: me.props.style.height / 2 - 90
        }} className="analysis-company-icon-out">
          <div className="analysis-company-icon-in"></div>
          <div className="analysis-company-icon"></div>
        </div>
        <div className="icon-line" ></div>
      </div>
    )
  };

  data = [];
  textData = [];
  // index = this.textData.length;
  // max = this.props.style.width / 2 - 5;
  // textMax = this.max - 90 * Math.cos(Math.PI / 17);
  //计算路径
  createLine() {
    let me = this;
    let r = 90;
    let R = 130;
    let x = me.width > 500 ? 70 : 0;
    let angle = 2 * pi / me.index;
    let startAngle = -pi / 3 + 2 * pi;
    for (let i = 0; i < me.index; i++) {
      let tempR = R;
      if (i % 2 === 0) { tempR = R + x };
      let data = [];
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let tempAngle = startAngle + angle * i;
      if (tempAngle % pi <= 0.1) {
        tempAngle += pi / 17;
      }

      let x1 = r * Math.cos(tempAngle);
      let y1 = r * Math.sin(tempAngle);
      arr1.push(x1, y1);

      let x2 = tempR * Math.cos(tempAngle);
      let y2 = tempR * Math.sin(tempAngle);
      arr2.push(x2, y2);

      let x3;
      let y3 = y2;
      if (tempAngle > 5 * pi / 2) {
        x3 = x2 - me.textData[i].length * 20 - 5;
        if (-x3 > me.max) { x3 = -me.max }
      } else {
        x3 = x2 + me.textData[i].length * 20 + 15;
        if (x3 > me.max) { x3 = me.max }
      }
      arr3.push(x3, y3);

      data.push(arr1, arr2, arr3);
      me.data.push(data);
    }

  };

  componentDidMount() {
    let me = this;
    //创建svg画布
    me.width = me.props.style.width;
    me.height = me.props.style.height;
    me._svg = d3.select(`.icon-line`)
      .append('svg')
      .attr('width', me.width)
      .attr('height', me.height);

    //直线生成器
    me.line = d3.line()
      .x(function (d) {
        return d[0]
      })
      .y(function (d) {
        return d[1]
      });
  };

  componentDidUpdate() {
    let me = this;
    if (!me._flag) { return };
    me._flag = false;
    me.textData = me.state.data;
    me.index = me.textData.length;
    me.max = me.props.style.width / 2 - 5;
    me.textMax = me.max - 90 * Math.cos(pi / 17);
    //生成路径点
    me.createLine();
    me.g = me._svg.append('g')
      .attr("transform", `translate(${me.width / 2},${me.height / 2})`);

    me.g.selectAll(".path")
      .data(me.data)
      .enter()
      .append('path')
      .attr('class', 'path')
      .attr('stroke', 'rgba(47,179,239,.7)')
      .attr('stroke-width', '2')
      .attr('fill', 'none')
      .transition()
      .duration(500)
      .attrTween("d", function (d, i) {
        let arr = [];
        let x1 = d[0][0];
        let y1 = d[0][1];
        let x2 = d[1][0];
        let y2 = d[1][1];
        let fx = d3.interpolate(x1, x2);
        let fy = d3.interpolate(y1, y2);
        return function (t) {
          let x = fx(t);
          let y = fy(t);
          arr.push([x, y])
          return me.line(arr)
        }
      })
      .transition()
      .duration(300)
      .attrTween("d", function (d, i) {
        let arr = [d[0], d[1]];
        let x1 = d[1][0];
        let y1 = d[1][1];
        let x2 = d[2][0];
        let y2 = d[2][1];
        let fx = d3.interpolate(x1, x2);
        let fy = d3.interpolate(y1, y2);
        return function (t) {
          let x = fx(t);
          let y = fy(t);
          arr.push([x, y])
          return me.line(arr)
        }
      })

    me.data.forEach((s, i) => {
      me.node = me.g.append("g")
        .attr("transform", function () {
          let x = me.data[i][2][0];
          let y = me.data[i][2][1];
          return "translate(" + x + "," + y + ")";
        });
      me.node.append("circle")
        .transition()
        .delay(800)
        .attr("r", function (d) {
          return 5;
        })
        .style('fill', '#12ffff');
      let isLeft;
      me.node.append("text")
        .attr("dy", '0.35em')
        .attr("x", function () {
          if (i < 5 * me.index / 12) {
            isLeft = false;
            return -10;
          } else {
            isLeft = true;
            return 10
          }
        })
        .attr("y", function () {
          return -15
        })
        .style("fill", 'transparent')
        .transition()
        .duration(600)
        .delay(800)
        .text(function () {
          let str = '';
          let t = me.textData[i];
          // if (t.length > 6) {
          //   str = t.substring(0, 6) + '...'
          // } else {
          str = t;
          // }
          return str;
        })
        .style("fill", '#fff')
        .style("font-size", 14)
        .style("text-anchor", `${isLeft ? 'start' : 'end'}`);
    })
  };

  componentWillUnmount() {

  };
}
export default AnalysisCompany;
