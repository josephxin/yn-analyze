import React from 'react';
import './hubei-time-select.css';
import * as api from '../../api/api-safety-production';

import TimeSelect from './TimeSelect';
import Select from '../select/Select';

/* 格式化参数 */
import { setParams2 } from '../../tool/tool.js';
let params = setParams2();


/*
* 时间组件
* @author msh
* 修改 xf
* */
class SingleIndustryTimeSelect extends React.Component {
  constructor() {
    super();
    let me = this;
    me._tokens = [];
    me.state = params;
  }

  render() {
    let me = this;
    let props = me.props;
    return (
      <div className={'accident-overview-select-box'} style={props.style}>
        <div style={{ minWidth: 80, fontSize: me.props.fontSize }}>自定义时间</div>
        <div style={{
          width: 120,
          position: 'relative'
        }}>
          <TimeSelect
            style={{
              minWidth: 100,
              height: 26,
              left: 0,
              fontSize: me.props.fontSize || 14
            }}
            defaultDate={me.state.endDate}
            callBack={me.endDateClick.bind(this)}
            ref={'timeChangeRef'}
          />
        </div>
        <div style={{ width: 40, fontSize: 20 }}>行业</div>
        <div style={{
          width: 240,
          position: 'relative'
        }}>
          <Select
            width={240}
            height={26}
            left={0}
            onSelectChange={me.industrySelectChange.bind(this)}
            ref={ref => {
              me.industrySelectRef = ref;
            }}
            fontSize={20}
          />
        </div>
        <div style={{ marginLeft: 30, fontSize: me.props.fontSize }} className={'select-query-single'} onClick={me.queryClick.bind(this)}>查询</div>
      </div>
    )
  }

  _changeTime(d) {
    let me = this;
    me.refs.timeChangeRef._setShowDate(d);
    let state = me.state;
    state.endDate = d;
    state.startDate = d;
  }

  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }

  componentDidMount() {
    // this.getIndustry();
    // let industryArr = ['全部', '道路运输', '纺织', '工商贸其他', '化工', '机械', '建材', '建筑施工', '金属非金属矿山', '贸易', '烟草', '煤矿', '石油天然气', '农业机械', '其它', '轻工', '水上交通', '铁路交通', '烟花爆竹', '冶金', '有色', '渔业船舶', '民航飞机'];
    // me.industrySelectRef._setList(industryArr);
  }

  getIndustry(res) {
    let me = this;
    /* 行业安全生产评估排行 */
    me._tokens.push(api.industrySafety.send(res).then(res => {
      let arr = [];
      res.data.forEach(s => {
        if (s.value === 0) { return }
        arr.push(s.name);
      });
      me.industrySelectRef._setList(arr);
      me.state.industry = arr[0];
    }));
  }

  endDateClick(n) {
    let me = this;
    let state = me.state;
    state.endDate = n;
    state.startDate = n;
    let res = {};
    res.startDate = n + '-01';
    let year = Number(n.slice(0, 4));
    let month = Number(n.slice(5, 7));
    res.endDate = new Date(year, month).toJSON().substring(0, 10);
    // me.getIndustry(res)
  }

  industrySelectChange(e) {
    let me = this;
    let state = me.state;
    state.industry = e;
  }

  queryClick() {
    let me = this;
    let callBack = me.props.onChange;
    let res = { ...me.state };
    res.startDate += '-01';
    let year = Number(res.endDate.slice(0, 4));
    let month = Number(res.endDate.slice(5, 7));
    res.endDate = new Date(year, month).toJSON().substring(0, 10);
    if (callBack && typeof callBack === 'function') {
      callBack(res);
    }
  }

  componentWillUnmount() {
    this._clearTokens();
  }
}

export default SingleIndustryTimeSelect;
