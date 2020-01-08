/**
 * 树图
 * xf
 */

import React, { Component } from 'react';
// import * as d3 from 'd3';
import { hierarchy, select, tree } from 'd3';
import "./treechart.css";
const dataArr = [
  {
    name: '',
    children: [
      { name: "重大事项数据" },
      { name: "相关方安全数据" },
      { name: "设备及防护用品数据" },
      { name: "人员教育培训数据" },
      { name: "制度落实情况数据" },
      { name: "安全生产投入数据" },
      { name: "企业基本数据" }
    ]
  },
  {
    name: '',
    children: [
      { name: "清单编制数据" },
      { name: "一般隐患数据" },
      { name: "重大隐患数据" },
      { name: "隐患排查数据" }
    ]
  },
  {
    name: '',
    children: [
      { name: "事故分析数据" },
      { name: "事故数据" },
      { name: "风险数据" }
    ]
  },
  {
    name: '',
    children: [
      { name: "视频监控数据" },
      { name: "重大危险源监测数据" }
    ]
  },
  {
    name: '',
    children: [
      { name: "特殊时期事故" },
      { name: "特殊时期隐患" }
    ]
  },
];

class TreeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._flag = false;
    this.isLeft = this.props.isLeft;
    this.lock = false;
  };
  _setData(d) {
    let me = this;
    me._flag = true;
    if (me.lock) {
      this.setState({ lock: !d });
    } else {
      this.setState({ lock: d });
    }
  };

  render() {
    let me = this;
    return (
      <div style={me.props.style} className="tree-chart-wrap">
        <div ref={'svgRef'} className={`tree-chart ${me.props.className}`}></div>
      </div>
    )
  };

  resize() {
    this.draw(this.arr, this.hasArr);
  }

  //绘制svg
  draw(arr, hasArr) {
    const me = this;
    let width = me.props.style.width * window._scaler;
    let height = me.props.style.height * window._scaler;
    let _x = height;
    let _y = width;

    select(me.refs.svgRef).select('svg').remove();

    me._svg = select(me.refs.svgRef)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    me.g = me._svg.append('g')
      .attr("transform", "translate(0,0)")
      .attr("opacity", me.props.open ? 1 : 0);

    /* 生成节点 */
    let root = hierarchy(arr);
    let rootNew = hierarchy(arr);

    /* 创建树状布局 */
    me.tree = tree()
      .size([_x, _y]);

    me.tree(root);

    me.treeNew = tree()
      .size([_x - 100 * window._scaler, _y]);

    me.treeNew(rootNew);

    me.rootArr = rootNew.descendants().slice(1);
    /* link */
    me.g.selectAll('.link')
      .data(root.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', function (d) {
        return '#12ffff';
      })
      .style('stroke-width', function (d) {
        return 1
      })
      .style('stroke-opacity', function (d) {
        if (d.depth === 1) {
          return 0.3;
        } else {
          return 0.2;
        }
      })
      .attr("d", function (d, i) {
        let dd = me.rootArr[i];
        let parent = d.parent;
        let x, y;

        // if (d.depth === 0) y = _y;
        let px = parent.y;
        let py = parent.x;

        if (!me.isLeft) {
          x = _y - dd.y + 100 * window._scaler;
          y = _x - dd.x - 30 * window._scaler;
          if (parent.depth === 0) py = _x;
          if (parent.depth === 0) px = 0;
        } else {
          x = _y - dd.y + 200 * window._scaler;
          y = _x - dd.x - 30 * window._scaler;
          if (parent.depth === 0) py = _x;
          if (parent.depth === 0) px = _y;
        }

        return "M" + x + "," + y
          + " C" + px + "," + y
          + " " + px + "," + py
          + " " + px + "," + py;
      });

    /* 文字和标记 */
    let node = me.g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", function (d) {
        return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .style('font-size', me.props.fontSize)
      .attr("transform", function (d, i) {
        // let x = d.y;
        // let y = d.x;
        if (d.depth === 1) { d = me.rootArr[i - 1]; }
        let x, y;
        if (!me.isLeft) {
          x = _y - d.y + 100 * window._scaler;
          y = _x - d.x - 30 * window._scaler;
        } else {
          x = _y - d.y + 200 * window._scaler;
          y = _x - d.x - 30 * window._scaler;
        }

        if (d.depth === 0) y = height / 2;
        return "translate(" + x + "," + y + ")";
      });

    node.append("circle")
      .attr("r", function (d) {
        if (d.depth === 0) return 6;
        else return 5 * window._scaler;
      })
      .style('fill', '#12ffff');

    node.append("text")
      .attr("dy", '0.35em')
      .attr("x", function () {
        if (!me.isLeft) {
          return 15 * window._scaler;
        } else {
          return -15 * window._scaler
        }
      })
      .text(function (d) {
        let str = '';
        let t = d.data.name;
        // if (t.length > 6) {
        //   str = t.substring(0, 6) + '...'
        // } else {
        str = t;
        // }
        return str;
      })
      .style("text-anchor", `${me.isLeft ? 'end' : 'start'}`)
      // .style("transform", `${!me.isLeft ? 'rotateY(180deg)' : 'rotateY(0deg)'}`)
      .style("font-size", me.props.fontSize || 14 * me.scale)
      .style("fill", function (d, i) {
        if (d.data.name === "") { return "#fff" }
        if (hasArr[i - 1].has === 1) { return "#12ffff" }
        return "#fff";
      });
  };

  componentDidMount() {
    let me = this;

    let hasArr = [];
    dataArr[Number(me.props.index)].children.forEach((s, i) => {
      let temp = {};
      temp.name = s.name;
      Number(me.props.index) > 2 ? temp.has = 2 : temp.has = 1;
      if (s.name === "风险数据") { temp.has = 2 }
      if (Number(me.props.index) === 4) { temp.has = 1 }
      hasArr.push(temp);
    });

    me.arr = dataArr[Number(me.props.index)];
    me.hasArr = hasArr;

    me.draw(dataArr[Number(me.props.index)], hasArr);
  };

  componentDidUpdate() {
    let me = this;
    if (!me._flag) { return };
    me._flag = false;

    if (me.state.lock) {
      me.lock = true;
      me.g.transition()
        .duration(600)
        .attr("opacity", 1);
    } else {
      me.lock = false;
      me.g.transition()
        .duration(600)
        .attr("opacity", 0);
    }
  };

}
export default TreeChart;
