/**
 * 简单表格
 * xf
 */
import React, { Component } from 'react';
import "./showdatares.css";

class DataRes extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this._flag = false;
  }
  _setData(d) {
    this._flag = true;
    this.setState({
      data: d
    })
  }
  componentDidUpdate() {
    let me = this;
    if (me._flag) {
      me.refs.analysis.innerHTML = me.state.data[0];
      me.refs.forecast.innerHTML = me.state.data[1];
    }
  }
  render() {
    let me = this;
    if (me._flag) {
      if (me.state.data.length === 0) { return <div className={"component-loading"} >暂无数据</div> }
      return (
        <div className="dialog-box-wrap" style={me.props.style}>
          <ul style={{
            display: "flex",
            color: "#f1f7ff",
            flexDirection: "column",
            fontSize: "0.16rem",
            padding: "0 0.2rem",
          }} className="show-data-res" >
            <li style={{ marginBottom: "0.5rem" }}>
              <p style={{ fontSize: "0.24rem", marginBottom: "0.15rem" }}>大数据分析</p>
              <p style={{ lineHeight: "0.3rem", textIndent: "0.32rem" }} ref={"analysis"}></p>
            </li>
            <li>
              <p style={{ fontSize:"0.24rem", marginBottom: "0.15rem" }}>大数据预测</p>
              <p style={{ lineHeight: "0.3rem", textIndent: "0.32rem" }} ref={"forecast"}></p>
            </li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className={"component-loading"}>加载中…</div>
      )
    }
    this._flag = false;
  }
}
export default DataRes;
