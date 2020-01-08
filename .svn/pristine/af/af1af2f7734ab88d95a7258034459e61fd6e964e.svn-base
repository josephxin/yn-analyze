import React from 'react';
import './hubei-time-select.css';
import TimeSelect from './TimeSelect';

/* 格式化参数 */
import { setParams2 } from '../../tool/tool.js';
let params = setParams2();

/*
* 事故智能分析时间组件
* @author msh
* */
class IntelligentAnalysisTimeSelect extends React.Component {
  constructor() {
    super();
    let me = this;
    me.state = params;
  }

  _changeTime(d) {
    let me = this;
    me.refs.timeChangeRef._setShowDate(d);
    let state = me.state;
    state.endDate = d;
    state.startDate = d;
  }

  render() {
    let me = this;
    let props = me.props;
    return (
      <div className={'intelligent-analysis-select-box'} style={props.style}>
        <div style={{ width: '.9rem' }}>自定义时间</div>
        <div style={{ width: '1.2rem', position: 'relative' }}>
          <TimeSelect
            style={{
              width: '1.1rem',
              height: '.26rem',
            }}
            defaultDate={me.state.endDate}
            callBack={me.endDateClick.bind(this)}
            ref={'timeChangeRef'}
          />
        </div>
        <div className={'select-query-single'} onClick={me.queryClick.bind(this)}>查询</div>
      </div >
    )
  }

  endDateClick(n) {
    let me = this;
    let state = me.state;
    state.endDate = n;
    state.startDate = n;
  }

  queryClick() {
    let me = this;
    let callBack = me.props.onChange;
    let res = { ...me.state };
    res.startDate += '-01';
    // res.endDate += '-01';
    let year = Number(res.endDate.slice(0, 4));
    let month = Number(res.endDate.slice(5, 7));
    res.endDate = new Date(year, month).toJSON().substring(0, 10);
    if (callBack && typeof callBack === 'function') {
      callBack(res);
    }
  }
}

export default IntelligentAnalysisTimeSelect;
