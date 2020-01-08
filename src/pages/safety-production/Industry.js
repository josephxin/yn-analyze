import React from 'react';
import './industry.css';
import Panel from '../../components/panel/Panel';
import * as api from '../../api/api-safety-production';
/* 行业安全生产评估概览 */
import SafeIndex from '../../components/safeindex/safeindex';
import ArcDial from '../../components/safeindex/arcdial';
/*主要行业安全生产评估分析*/
/*行业安全生产评估排行*/
//import PictorialBar from '../../components/bar/PictorialBar';
import DivBar from '../../components/bar/DivBar';

/* 时间选择 */
import TimeSelect from '../../components/hubei-time-select/SingleTimeSelect';

/*
*  安全生产评估 - 行业页面
*  @author msh
* */

/* 格式化参数 */
import { setParams } from '../../tool/tool.js';
let params = setParams();

class Industry extends React.Component {
  constructor() {
    super();
    let me = this;
    me._tokens = [];
    /* 主要行业安全生产评估分析 */
    // me.radarMap = {
    //   width: 600,
    //   height: 395,
    //   top: 50,
    //   left: 20
    // };

    me.areaProdocut = {
      width: '6rem',
      height: '3.95rem',
      top: '5.1rem',
      left: '0.2rem'
    };

    me.safeIndex = {
      width: '12.2rem',
      height: '8.55rem',
      top: '0.5rem',
      left: '6.6rem'
    };
    me.safetyProduction = {
      width: '6rem',
      height: '3.95rem',
      top: '0.5rem',
      left: '0.2rem'
    };

    me.arcdial = {
      width: '4.45rem',
      height: '2.35rem',
      top: '2.5rem',
      left: '4rem'
    };

    me._resize = me._windowResizeHandler.bind(me);
  };

  worldAnimation() {
    let arr = ["重大安全事故", "3人重伤", "企业股权变更", "火灾死亡2人", "重大安全事故", "3人重伤", "企业股权变更", "火灾死亡2人"];
    return arr.map((s, i) => {
      return (
        <p key={i} style={{ left: (230 * i + 130) / 100 + 'rem', animationDelay: `${i}s` }}>{s}</p>
      )
    })
  };

  render() {
    let me = this;
    return (
      <div className={'safety-production-industry'}>
        <Panel style={me.safeIndex} title={"安全生产形势评估概览"}>
          <div className="safe-index-bg">
            {
              me.worldAnimation()
            }
          </div>
          <div style={{
            position: 'absolute',
            top: '0.3rem',
            left: '0.6rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                background: '#12ffff',
                marginRight: 10,
                borderRadius: '50%'
              }}></span><span style={{
                color: '#12ffff'
              }}>有数据</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                background: '#fff',
                marginRight: 10,
                borderRadius: '50%'
              }}></span><span style={{
                color: '#fff'
              }}>暂无数据</span>
            </div>
          </div>
          <ArcDial style={me.arcdial} ref="arcDialRef" />
          <SafeIndex ref="safeIndexRef" />
        </Panel>
        {/* <Panel style={me.radarMap} title={"主要行业安全生产评估分析"}>
          <div className={'radarMapLegent'}>
            <a><span></span>危险</a>
            <a><span className={'warning'}></span>警告</a>
            <a><span className={'safe'}></span>安全</a>
          </div>
          <RadarMap width={600} height={326} ref={'radarMap'}></RadarMap>
        </Panel> */}
        <Panel style={me.safetyProduction} title={"行业安全生产形势评估排行"}>
          <div className={'accidentAreas dialog-box-wrap'} style={{ height: '2.85rem', top: '.8rem' }}>
            {/* <PictorialBar width={'9.3rem'} height={'6rem'} ref={'safetyProduction'}
              accidentPatternClick={me._accidentPattern.bind(this)} /> */}
            <DivBar type={3} width={'6rem'} height={'3.95rem'} ref={'safetyProduction'} onClick={me._accidentPattern.bind(this)} />
          </div>
        </Panel>

        <Panel style={me.areaProdocut} title={"区域安全生产形势评估排行"}>
          <div className={"accidentAreas dialog-box-wrap"}>
            {/* <PictorialBar width={'9.3rem'} height={'6rem'} ref={'areaProdocuts'}
              accidentPatternClick={me._getCityIndex.bind(this)} /> */}
            <DivBar type={3} width={'6rem'} height={'3.95rem'} ref={'areaProdocuts'} onClick={me._getCityIndex.bind(this)} />
          </div>
        </Panel>
        {/* 时间选择框 */}
        <TimeSelect
          style={{
            top: '.9rem',
            left: '1.7rem',
            width: '3.4rem',
            height: '.26rem',
            zIndex: 10,
            display: 'flex'
          }}
          fontSize={'.14rem'}
          selectColor={'#bfe9ff'}
          onChange={me.timeChange.bind(this)}
          ref={'timeSelectRef'}
        />
      </div>
    )
  };

  /* 时间选择 */
  timeChange(e) {
    let me = this;
    if (e.startDate === me.tempParams.startDate && e.endDate === me.tempParams.endDate) return;
    me._clearTokens();
    Object.assign(me.tempParams, e)
    me.obj = e;
    me.componentDidMount();
  }

  // 行业安全生产评估排行点击事件
  _accidentPattern(name) {
    let me = this;
    let tempParams = { ...me.tempParams };
    delete tempParams.city;
    delete tempParams.districtName;
    let temp = { industry: name, source: 1 };
    Object.assign(tempParams, temp);
    me.getIndex(tempParams, true);
  }

  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  };

  getIndex(tempParams, isIndustry) {
    let me = this;
    /* 行业安全生产评估概览 */
    if (me.safeIndexXhr) me.safeIndexXhr.cancel();
    me.safeIndexXhr = api.safeIndex.send(tempParams).then(res => {
      let data = {};
      data.num = Number(res.value);
      data.name = tempParams.industry || tempParams.city;
      if (this.userArea) {
        data.name = tempParams.industry || tempParams.districtName;
      }
      data.type = isIndustry;
      me.refs.arcDialRef._setData(data);
      me.refs.safeIndexRef._setData(res.data);
    })
    me._tokens.push(me.safeIndexXhr);
  }

  // 区域安全生产形势评估排行点击事件
  _getCityIndex(name) {
    let me = this;
    let tempParams = { ...me.tempParams };
    delete tempParams.industry;
    if (this.userArea) {
      Object.assign(tempParams, { source: 1, districtName: name }, this.userArea);
    } else {
      Object.assign(tempParams, { city: name, source: 1 });
    }

    me.getIndex(tempParams, false);
  }

  getPreMonth(date) {
    let arr = date.split('-');
    let year = arr[0]; //获取当前日期的年份
    let month = arr[1]; //获取当前日期的月份
    let day = arr[2]; //获取当前日期的日
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    let year2 = year;
    let month2 = parseInt(month) - 1;
    if (month2 === 0) {
      year2 = parseInt(year2) - 1;
      month2 = 12;
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 !== '01') {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    let t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
  }

  componentDidMount() {
    let me = this;
    if (!me.sendLock) {
      me.tempParams = { ...params }
    };
    // if (me.obj) { Object.assign(me.tempParams, me.obj) }
    /* 行业安全生产评估排行 */
    let industry = { ...me.tempParams };
    delete industry.industry;
    me._tokens.push(
      api.industrySafety
        .send(industry)
        .then(res => {
          let arr = [], brr = [];
          let haveNoData = Boolean(res.data.length);
          if (!haveNoData) {
            me.tempParams.startDate = me.getPreMonth(me.tempParams.startDate);
            me.tempParams.endDate = me.getPreMonth(me.tempParams.endDate);
            me.refs.timeSelectRef._changeTime(me.tempParams.endDate.slice(0, 7));
            me.componentDidMount();
            return
          }
          res.data.forEach(s => {
            if (s.value === 0) {
              return
            }
            arr.push(s.name);
            brr.push(s.value)
          });
          let max = Math.max.apply(null, brr)
          let objs = {
            CityName: arr,
            seriesData: brr,
            arrData: [],
            unit: '',
            gridLeft: '25%',
            gridTop: '0%',
            gridBottom: '0%',
            gridRight: '55%',
            widthNum: 106,
            seriesName: 1,
            types: 'item',
            num: max
          };
          me.refs.timeSelectRef._changeTime(me.tempParams.endDate.slice(0, 7));
          Object.assign(me.tempParams, { industry: objs.CityName[0] });
          me.getIndex(me.tempParams, true);
          // me.refs.safetyProduction._setData(objs);
          me.refs.safetyProduction._setData(res.data);
        })
      // .catch(() => {
      //   me.componentDidMount();
      //   return
      // })
    );

    /* 区域安全生产评估排行 */
    let areaParams = { ...me.tempParams };
    delete areaParams.industry;
    me._tokens.push(api.areaIndustrySafety.send(areaParams).then(res => {
      let haveNoData = Boolean(res.data.length);
      if (!haveNoData) {
        return
      }
      let arr = [], brr = [];
      res.data.map(s => {
        if (s.value === 0) {
          return
        }
        arr.push(s.name);
        brr.push(s.value)
      });
      let max = Math.max.apply(null, brr);
      let objs = {
        CityName: arr,
        seriesData: brr,
        arrData: [],
        unit: '',
        gridLeft: '25%',
        gridTop: '0%',
        gridBottom: '0%',
        gridRight: '55%',
        widthNum: 106,
        seriesName: 1,
        types: 'item',
        num: max
      };

      // me.refs.areaProdocuts._setData(objs)
      me.refs.areaProdocuts._setData(res.data);
    }));
    me.sendLock = true;

    // 获取用户所属区域
    me._tokens.push(api.getUserArea.send().then(res => {
      let data = res.data;
      if (data.level !== "1") {
        this.userArea = {
          city: data.city
        }
      }
    })
    );

    window.addEventListener('resize', me._resize);
  };

  _windowResizeHandler() {
    const me = this;
    const keys = Object.keys(me.refs);
    keys.map(t => {
      try {
        me.refs[t].resize();
      } catch (err) {

      }
    })
  }

  componentWillUnmount() {
    this._clearTokens();
  };
}

export default Industry;
