/**
 * 水球 简单css3动画制成
 * 半径尽量控制在 1rem -- 1.5rem 之间
 * zll
 */
import React, { Component } from 'react';
import './water.css';
class WaterPolo extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      data: ''
    };
    me.flag = false;
  }
  setData(d) {
    this.flag = true;
    this.setState({
      data: d
    })
  }
  render() {
    let me = this;
    if (me.flag) {
      if (me.state.data.length === 0) { return <div className={"component-loading"} >暂无数据</div> }
      let width = me.props.width || '1.2rem';
      let value = parseFloat(me.state.data.value).toFixed(2) || 16.6;
      if (value === '100.00') { value = 100 }

      let val;
      let bgHeight = width;

      if (value === 100) {
        bgHeight = parseFloat(bgHeight) + 0.3 + 'rem';
        val = -18;
      } else {
        val = 100 - value;
      }
      return (
        <div ref={'box'} className={'water-polo'} style={{
          width: width,
          height: width,
          position: 'absolute',
          top: this.props.top,
          left: this.props.left,
          background: 'rgba(1,68,153,0.7)'
        }}>
          <div className={'polo-bg1'} style={{
            height: bgHeight,
            backgroundSize: `3.59rem ${bgHeight}`,
            top: parseFloat(bgHeight) * (val / 100) + 'rem'
          }}></div>
          <div className={'polo-bg2'} style={{
            height: bgHeight,
            backgroundSize: `3.59rem ${bgHeight}`,
            top: parseFloat(bgHeight) * (val / 100) + 'rem'
          }}></div>
          <span className={'value'} style={{
            width: width,
            fontSize: me.props.fontSize || '0.2rem'
          }}>{value + '%'}</span>
        </div>
      )
    } else {
      return (
        <div className={"component-loading"} >加载中…</div>
      )
    }
    me.flag = false;
  }
  componentDidMount() {
    let me = this;
  }

}

export default WaterPolo;
