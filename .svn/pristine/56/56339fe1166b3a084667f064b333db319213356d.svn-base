/**
 * zhy
 */
import React, { Component } from 'react';
import './water.css';
class WaterPoloBig extends Component {
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
      let value = me.state.data.value === "+∞" ? 99 : parseFloat(me.state.data.value).toFixed(0);

      let val, scale;
      let bgHeight = width;
      if (Number(value) >= 100) {
        // bgHeight = parseFloat(bgHeight) + 0.3 + 'rem';
        val = .1;
        if (Number(value) >= 100000) {
          scale = "translate(-50%,0) scale(.6)"
        } else if (Number(value) >= 1000) {
          scale = "translate(-50%,0) scale(.7)"
        }
      } else {
        val = 100 - Number(value);
      }
      let nodeVal, nodeRate;
      if (me.state.data.value === "+∞") {
        let tempScale;
        if (Number(me.state.data.val) >= 100000) {
          tempScale = "translate(-50%,0) scale(.6)";
        } else if (Number(me.state.data.val) >= 1000) {
          tempScale = "translate(-50%,0) scale(.7)";
        }
        nodeVal = (
          <span className={'value'} style={{
            minWidth: width,
            color: me.state.data.color,
            fontSize: '0.3rem' || '0.2rem',
            transform: tempScale
          }}>{me.state.data.val}<span className="ValuePercent">起</span></span>
        );
        nodeRate = (
          <span className={'rate'} style={{
            width: width,
            fontSize: 12 || '0.2rem',
          }}>{me.state.data.rate.slice(2) === "上升" ? "增长" : "减少" || ''}</span>
        );
      } else {
        nodeVal = (
          <span className={'value'} style={{
            minWidth: width,
            color: me.state.data.color,
            fontSize: '0.3rem' || '0.2rem',
            transform: scale
          }}>{value}<span className="ValuePercent">%</span></span>
        );
        nodeRate = (
          <span className={'rate'} style={{
            width: width,
            fontSize: 12 || '0.2rem',
          }}>{me.state.data.rate || ''}</span>
        );
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
          <span className={'name'} style={{
            width: parseFloat(width) * .8 + 'rem',
            fontSize: 12 || '0.2rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>{me.state.data.name || ''}</span>
          {nodeVal}
          {nodeRate}
        </div >
      )
    } else {
      return (
        <div className={"component-loading"} >加载中…</div>
      )
    }
    //me.flag = false;
  }
  componentDidMount() {
    
  }
}

export default WaterPoloBig;
