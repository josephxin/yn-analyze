/**
 * zhy
 */
import React, { Component } from 'react';
import Circle from './circle';
import WaterPoloBig from './waterPoloBig';

class DistributionChart extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      data: ''
    };
  }
  _hoverHere(ref) {
    let me = this;
    let timer = setTimeout(function () {
      me.refs[ref].style.display = 'block'
    }, 100)
  }
  _outHere(ref) {
    let me = this;
    setTimeout(function () {
      me.refs[ref].style.display = 'none'
    }, 100)
  }
  setData(d) {
    this.lock = true;
    this.setState({
      data: d
    })
  }
  dealTime(time) {
    let d = new Date(time);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    month = month > 10 ? month : `0${month}`;
    let day = d.getDay();
    day = day > 10 ? day : `0${day}`;
    return [year, month, day].join('-');
  }
  render() {
    let me = this;
    //console.log(me.lock);
    if (!me.lock) return false;

    return (
      <div>
        {
          me.state.data.data.map(function (d, i) {
            return <div className={'waterBox' + (i + 1)} key={'zhy' + i}>
              <div className="hoverBoxes" onMouseOver={me._hoverHere.bind(me, ('toolBoeder' + i))} onMouseOut={me._outHere.bind(me, ('toolBoeder' + i))}>
                <Circle style={{
                  width: '1.6rem',
                  height: '1.6rem',
                  position: 'absolute',
                  zIndex: 10,
                }} ref={'Circle' + i}></Circle>
                <WaterPoloBig width={'1rem'}
                  top={'0.3rem'}
                  left={'0.3rem'}
                  ref={'WaterPoloBig' + i}></WaterPoloBig>
                <div className="toolBoeder" ref={('toolBoeder' + i)} >
                  <ul className="toolBox">
                    <li><span>{me.state.data.startDate || ''}</span> 至 <span>{me.state.data.endDate || ''}</span></li>
                    <li><span>{d.ThisName || ''}</span>：<span className="toolCount" style={{ color: d.color }}>{d.thisValue || '0'}</span> 起</li>
                    <li><span>{d.lastStartDate || ''}</span> 至 <span>{d.lastEndDate || ''}</span></li>
                    <li><span>{d.ThisName || ''}</span>：<span className="toolCount" style={{ color: d.color }}>{d.lastValue || '0'}</span> 起</li>
                  </ul>
                </div>
              </div>
            </div>
          })
        }
      </div>
    )
  }

  componentDidMount() {
    let me = this;
    /**事故级别分布同比 */
  }

  resize() {
    const me = this;
    const keys = Object.keys(me.refs);
    keys.map(t => {
      // console.log(t);
      try {
        me.refs[t].resize();
      } catch (err) {

      }
    })
  }

  componentDidUpdate() {
    let me = this;
    if (!me.lock) return false;
    //this.lock = false;
    //console.log(me.state.data);
    me.state.data.data.map(function (d, i) {
      let data = { val: d.thisValue, value: d.rate, rate: d.rateType, color: d.color, name: d.ThisName }
      me.refs['Circle' + i].setData(data);
      me.refs['WaterPoloBig' + i].setData(data)
    })
  }

}

export default DistributionChart;
