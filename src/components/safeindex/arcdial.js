/**
 * 渐变色圆弧
 * xf
 */

import React, { Component } from 'react';
import * as d3 from 'd3';
import "./arcdial.css";
import TreeChart from '../safeindex/treechart';
import { color } from 'echarts/lib/export';

class ArcDial extends Component {
  constructor(props) {
    super(props);
    const me = this;
    this.state = {
      startAngle: -Math.PI / 2 + Math.PI / 144,
      endAngle: Math.PI / 3
    };
    this._flag = false;

    me.treeChart1 = {
      width: 270,
      height: 230,
      top: -54,
      left: -411,
    };
    me.changeRem(me.treeChart1);

    me.treeChart2 = {
      width: 300,
      height: 230,
      top: -230,
      left: -332,
    };
    me.changeRem(me.treeChart2);

    me.treeChart3 = {
      width: 300,
      height: 190,
      top: -290,
      left: -76,
    };
    me.changeRem(me.treeChart3);

    me.treeChart4 = {
      width: 300,
      height: 230,
      top: -230,
      left: 476,
    };
    me.changeRem(me.treeChart4);

    me.treeChart5 = {
      width: 300,
      height: 230,
      top: -54,
      left: 586,
    };
    me.changeRem(me.treeChart5);
  };

  changeRem(dist) {
    const me = this;
    for (let n in dist) {
      if (n === 'bottom' || n === 'left' || n === 'top' || n === 'right') {
        dist[n] = dist[n] / 100 + 'rem';
      }
    }
  }

  _setData(d) {
    this._flag = true;
    let numMax = 100;  //设置数据的最大值以便计算比例
    let angleMax = Math.PI - Math.PI / 72;
    let res = this.state.startAngle + d.num * angleMax / numMax;
    this.setState({
      num: d.num,
      endAngle: res,
      name: d.name,
      type: d.type
    })
  };

  _showAll() {
    let me = this;
    let ref = [me.refs.treeChartRef1, me.refs.treeChartRef2, me.refs.treeChartRef3, me.refs.treeChartRef4, me.refs.treeChartRef5];
    ref.forEach((s, i) => {
      s._setData(true);
    });
  }

  showTreeChart(index, e) {
    let me = this;
    let ref = [me.refs.treeChartRef1, me.refs.treeChartRef2, me.refs.treeChartRef3, me.refs.treeChartRef4, me.refs.treeChartRef5];
    ref[index]._setData(true);
    me.treeRef = ref;
  };

  createList() {
    let me = this;
    let data = ["基础数据", "隐患数据", "事故风险数据", "物联网数据", "特殊时期数据"];
    return data.map((s, i) => {
      let url = `./static/image/safeindex/tip${i + 1}.png`;
      let style = me[`treeChart${i + 1}`];
      if (i > 2) {
        return (
          <li key={i} >
            <img style={{ width: '.36rem', height: '.36rem' }}
              src={url}
              alt="logo"
              onClick={this.showTreeChart.bind(this, i)}
            />
            <p className={`${me.props.fontSize ? 'active' : ''}`}
              style={{ marginLeft: '.2rem', fontSize: me.props.fontSize }}
              onClick={this.showTreeChart.bind(this, i)}
            >{s}</p>
            <span className="arc-dial-arrow" ></span>
            <TreeChart open={me.props.open}
              style={style}
              fontSize={me.props.fontSize}
              ref={`treeChartRef${i + 1}`}
              className={`tree-chart${i + 1}`}
              isLeft={false} index={i}
            />
          </li>
        )
      } else {
        return (
          <li key={i}>
            <p className={`${me.props.fontSize ? 'active' : ''}`}
              onClick={this.showTreeChart.bind(this, i)}
              style={{ marginLeft: '-.1rem', fontSize: me.props.fontSize }}
            >{s}</p>
            <img onClick={this.showTreeChart.bind(this, i)}
              style={{ width: '.36rem', height: '.36rem' }}
              src={url}
              alt="logo"
            />
            <span className="arc-dial-arrow" ></span>
            <TreeChart open={me.props.open}
              style={style}
              fontSize={me.props.fontSize}
              ref={`treeChartRef${i + 1}`}
              className={`tree-chart${i + 1}`}
              isLeft={true} index={i}
            />
          </li>
        )
      }
    })
  };

  render() {
    let me = this;
    let num = me.state.num || me.state.num === "0" ? Number(me.state.num) : "--";
    let color = "rgba(255,150,1,1)";
    let colorArr = ["rgba(3,254,151,1)", "rgba(0,229,241,1)", "rgba(59,153,255,1)", "rgba(255,240,0,1)"];
    if (num > 89) { color = colorArr[1] } else if (num > 69) { color = colorArr[2] } else if (num > 59) { color = colorArr[0] } else if (num > 49) { color = colorArr[3] }
    return (
      <div style={me.props.style} className="arc-dial-wrap">
        <div className="arc-dial" ref={'arcDialRef'}></div>
        <span className="arc-dial-left"
          style={{ fontSize: '.2rem' }} >危险</span>
        <span className="arc-dial-tip arc-dial-right"
          style={{ fontSize: '.2rem' }}>安全</span>
        <div className="arc-dial-info" >
          <p className="arc-dial-info-number" style={{ color: color }}>{num}</p>
          <p>{me.state.name}</p>
          <p>{me.state.type ? "行业安全生产形势评估" : "安全生产形势评估"}</p>
        </div>
        <div className="arc-dial-tip" >
          <ul>
            {me.createList()}
          </ul>
        </div>
      </div>
    )
  };

  //生成圆弧函数
  createArc(end) {
    let me = this;
    let arc = me.arc
      .cornerRadius(50)
      .startAngle(-Math.PI / 2 + Math.PI / 144)
      .endAngle(end);
    return arc();
  };

  //绘制svg
  draw() {
    let me = this;
    let width = 445 * window._scaler;
    let height = 240 * window._scaler;
    let arcG = d3.select(me.refs.arcDialRef).select('svg');
    if (arcG) { arcG.remove(); }

    //创建svg画布
    // me.width = 445;
    // me.height = 240;
    me._svg = d3.select(me.refs.arcDialRef)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    //生成渐变色
    me.linearGradient = me.createColor();

    //生成圆弧的path
    me.arc = d3.arc()
      .innerRadius(width / 2 - 20 - 3)
      .outerRadius(width / 2 - 3)
      .cornerRadius(50)

    me.arcWrap = d3.arc()
      .innerRadius(width / 2 - 20 - 6)
      .outerRadius(width / 2)
      .cornerRadius(50)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    //绘制外圆环
    let gWrap = me._svg.append("g")
      .attr("transform", `translate(${width / 2},${height})`);

    let svgWrap = gWrap.append("path")
      .attr("d", me.arcWrap())
      .attr("stroke", "#30b1ff")
      .attr("stroke-width", 2)
      .attr("fill", "rgba(0,128,255,.7)");

    let g = me._svg.append("g")
      .attr("transform", `translate(${width / 2},${height})`);

    let svg = g.append("path")
      .style("fill", "url(#" + me.linearGradient.attr("id") + ")") //添加渐变色到图形
      .attr("stroke", "none")
      .attr("stroke-width", 2);

    svg.transition()
      .duration(1500)
      .attrTween("d", function () {
        var i = d3.interpolate(me.state.startAngle, me.state.endAngle);
        return function (t) {
          let end = i(t);
          return me.createArc(end)
        }
      });
  };

  //生成渐变色
  createColor() {
    let me = this;
    let e = d3.rgb(0, 213, 144);
    let d = d3.rgb(0, 246, 255);
    let c = d3.rgb(70, 161, 255);
    let b = d3.rgb(255, 234, 0);
    let a = d3.rgb(242, 97, 0);
    let defs = me._svg.append('defs');
    let linearGradient = defs.append("linearGradient")
      .attr("id", "linearColor")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    let stop1 = linearGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", a.toString());

    let stop2 = linearGradient.append("stop")
      .attr("offset", "20%")
      .style("stop-color", b.toString());

    let stop3 = linearGradient.append("stop")
      .attr("offset", "60%")
      .style("stop-color", c.toString());

    let stop4 = linearGradient.append("stop")
      .attr("offset", "80%")
      .style("stop-color", d.toString());

    let stop5 = linearGradient.append("stop")
      .attr("offset", "100%")
      .style("stop-color", e.toString());
    return linearGradient;
  };

  resize() {
    let r = 50 * window._scaler;
    this.draw(r);
    this.treeRef.forEach((s) => {
      try {
        s.resize();
      } catch (err) { }
    });
  }

  componentDidUpdate() {
    let me = this;
    if (!me._flag) { return };
    me._flag = false;
    let r = 50 * window._scaler;
    me.draw(r);
  };
}
export default ArcDial;
