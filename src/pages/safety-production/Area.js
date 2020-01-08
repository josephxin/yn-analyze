import React from 'react';
import './area.css';
import * as api from '../../api/api-safety-production';
/* Panel */
import Panel from '../../components/panel/Panel';
/* map */
import HuBeiMap from '../../components/map/HuBeiMap';
/* 区域安全生产评估排行*/
//import PictorialBar from '../../components/bar/PictorialBar';
/* 时间选择 */
import TimeSelect from '../../components/hubei-time-select/IntelligentAnalysisTimeSelect';

/*
*  安全生产评估 - 区域页面
*  @author msh
* */

/* 格式化参数 */
import { setParams } from '../../tool/tool.js';
let params = setParams();

class Area extends React.Component {
  constructor() {
    super();
    let me = this;
    me._tokens = [];

    me.mapStyle = {
      width: 1220,
      height: 855,
      top: 50,
      left: 660
    };

    me.areaProdocut = {
      width: 605,
      height: 855,
      top: 50,
      left: 41
    }
  }

  render() {
    let me = this;
    return (
      <div className={'safety-production-area'}>
        <Panel style={me.mapStyle} title={"区域安全生产评估分布"}>
          <HuBeiMap ref={ref => {
            me.huBeiMapRef = ref;
          }} />
        </Panel>
        <Panel style={me.areaProdocut} title={"区域安全生产评估排行"}>
          {/*<PictorialBar width={605} height={860} top={20} ref={'areaProdocuts'} /> */}
        </Panel>
        {/* 时间选择框 */}
        <TimeSelect
          style={{
            top: 90,
            left: 120,
            width: 440,
            height: 26,
            zIndex: 10
          }}
          fontSize={14}
          selectColor={'#bfe9ff'}
          onChange={me.timeChange.bind(this)}
        />
      </div>
    )
  };

  /* 时间选择 */
  timeChange(e) {
    let me = this;
    if (e.startDate === params.startDate && e.endDate === params.endDate) return;
    // Object.assign(params, e);
    me._clearTokens();
    me.obj = e;
    me.componentDidMount();
  }

  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  };

  componentDidMount() {
    let me = this;

    let tempParams = { ...params };
    if (me.obj) { Object.assign(tempParams, me.obj) }

    /* 区域安全生产评估排行 */
    me._tokens.push(api.areaIndustrySafety.send(tempParams).then(res => {
      let arr = [], brr = [];
      res.data.map(s => {
        arr.push(s.name);
        brr.push(s.value)
      });
      let max = Math.max.apply(null, brr)
      let objs = {
        CityName: arr,
        seriesData: brr,
        arrData: [],
        unit: '',
        gridLeft: '35%',
        gridTop: '7%',
        gridBottom: '5%',
        gridRight: '20%',
        widthNum: 106,
        seriesName: 1,
        types: 'item',
        num: max
      };
      me.refs.areaProdocuts._setData(objs)
    }));

    /* 地图 */
    me._tokens.push(api.exponentialDistribution.send(tempParams).then(res => {
      me.huBeiMapRef.upDateMapData(res.data);
    }))

    // let accidentAreaData = {
    //   "status": 200,
    //   "data": [
    //     {
    //       "name": "武汉市",
    //       "value": "4770"
    //     },
    //     {
    //       "name": "黄石市",
    //       "value": "3434"
    //     },
    //     {
    //       "name": "十堰市",
    //       "value": "2890"
    //     },
    //     {
    //       "name": "荆州市",
    //       "value": "2216"
    //     },
    //     {
    //       "name": "宜昌市",
    //       "value": "2201"
    //     },
    //     {
    //       "name": "襄阳市",
    //       "value": "2216"
    //     },
    //     {
    //       "name": "鄂州市",
    //       "value": "2201"
    //     },
    //     {
    //       "name": "荆门市",
    //       "value": "2189"
    //     },
    //     {
    //       "name": "孝感市",
    //       "value": "2098"
    //     },
    //     {
    //       "name": "黄冈市",
    //       "value": "1890"
    //     },
    //     {
    //       "name": "咸宁市",
    //       "value": "1880"
    //     },
    //     {
    //       "name": "随州市",
    //       "value": "1729"
    //     },
    //     {
    //       "name": "恩施市",
    //       "value": "2098"
    //     },
    //     {
    //       "name": "恩施土家族苗族自治州",
    //       "value": "1890"
    //     },
    //     {
    //       "name": "仙桃市",
    //       "value": "1880"
    //     },
    //     {
    //       "name": "天门市",
    //       "value": "1729"
    //     },
    //     {
    //       "name": "潜江市",
    //       "value": "1729"
    //     },
    //     {
    //       "name": "神农架林区",
    //       "value": "2890"
    //     }
    //   ]
    // }
    // console.log(JSON.stringify(accidentAreaData))
    // let arr = [], brr = [];
    // accidentAreaData.data.map(s => {
    //   arr.push(s.name);
    //   brr.push(s.value)
    // })
    // let objs = {
    //   seriesData: arr.reverse(),
    //   b: brr.reverse()
    // }
    // me.refs.areaProdocuts._setData(objs, true)
  }
}

export default Area;
