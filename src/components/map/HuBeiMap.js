import React from 'react';
import { getLocalPosition } from '@jusfoun-vis/scaler';
import { forge, UiComponent } from '@jusfoun-vis/common';
import EchartsMap from './EchartsMap';
import Geojson from './hubei.json';
import './hubei-map.css';

const levels = ['A级', 'B级', 'C级', 'D级'];
let _areasData = Geojson.features.map(t => {
  return {
    name: t.properties.name,
    value: Math.round(40 + Math.random() * 100),
    level: levels[Math.round(Math.random() * (levels.length - 1))],
    basicsData: Math.round(Math.random() * 100),
    hiddenData: Math.round(Math.random() * 100),
    accidentRiskData: Math.round(Math.random() * 100),
    thingsInternetData: Math.round(Math.random() * 100),
    specialPeriodData: Math.round(Math.random() * 100)
  };
}).sort((a, b) => {
  return a.value - b.value;
});

/*
 * 安全生产评估-区域 地图
 * @author msh
 * */
class HuBeiMap extends React.Component {
  isReadyToMove = false;
  isRealUpdate = false;

  /* 声明监听事件 */
  _addEventListener() {
    this.isReadyToMove = false;
  }

  constructor() {
    super();
    let me = this;
    me.state = {
      top: 0
    };
    me._eventFunction = me._addEventListener.bind(me);
  }

  render() {
    let me = this;
    let top = me.state.top;
    return (
      <div className={'safety-production-map'}>
        <div className={'safety-map-bg'}>
          <div className={'safety-map-inner-circle'}></div>
          <div className={'safety-map-outer-circle'}></div>
        </div>
        <div className={'safety-map-box'} ref={'chartDom'}></div>
        <div className={'visual-map'}>
          <div
            ref={'legendDom'}
            onMouseMove={me.legendMouseMove.bind(this)}
            onClick={me.legendClick.bind(this)}
          >
            <div></div>
            <span
              onMouseDown={me.legendMouseDown.bind(this)}
              style={{
                transform: `translate(0,${top}px)`
              }}
            ></span>
          </div>
          <ul>
            {
              levels.map((t, i) => {
                return (
                  <li key={`visual-map-legend-${i}`}>{t}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let me = this;

    let map = new EchartsMap();
    map.width = 1220;
    map.height = 855;
    map.geoJson = Geojson;
    map.numLayer = 2;
    map.deviation = 1.4;
    map.selectedMode = true;
    map.tooltip = (res) => {
      let data = res.data;
      return [
        data.name,
        ' : ',
        String(data.level).fontcolor('#ffa800').fontsize(4),
        '<br>',
        '安全生产形势评估 : ',
        String(data.value).fontcolor('#35d2ff').fontsize(4),
        '<br>',
        '基础数据 : ',
        String(data.basicsData).fontcolor('#35d2ff').fontsize(4),
        '<br>',
        '隐患数据 : ',
        String(data.hiddenData).fontcolor('#35d2ff').fontsize(4),
        '<br>',
        '事故风险 : ',
        String(data.accidentRiskData).fontcolor('#35d2ff').fontsize(4),
        '<br>',
        '物联网数据 : ',
        String(data.thingsInternetData).fontcolor('#35d2ff').fontsize(4),
        '<br>',
        '特殊时期数据 : ',
        String(data.specialPeriodData).fontcolor('#35d2ff').fontsize(4)
      ].join('');
    };
    map.mapClick = function () {
      me.setMapData();
    };
    me.refs.chartDom.appendChild(map._domElement);
    me.map = map;

    window.addEventListener('mouseup', me._eventFunction, false);
  }

  /* 标尺 鼠标down */
  legendMouseDown() {
    let me = this;
    me.isReadyToMove = true;
  }

  /* 标尺位置 */
  _position = undefined;

  /* 等级对应下标 */
  _index = 0;

  /* 标尺 鼠标move */
  legendMouseMove(event) {
    let me = this;
    if (me.isReadyToMove) {
      let dom = me.refs.legendDom;
      let pages = [event.pageX, event.pageY];
      me._position = getLocalPosition(pages, dom).y;
      me.invalidateProperties();
    }
  }

  /* 标尺 点击事件 */
  legendClick(event) {
    let me = this;
    let dom = me.refs.legendDom;
    let pages = [event.pageX, event.pageY];
    me._position = getLocalPosition(pages, dom).y;
    me.invalidateProperties();
  }

  /* 导入地图数据 */
  setMapData() {
    let me = this;
    let data = me.state.data || _areasData;
    me.map.seriesData = data.map((t, i) => {
      let _index = levels.indexOf(t.level);
      let selected = _index === me._index;
      Object.assign(t, { selected });
      return t;
    });
  }

  /* 更新地图数据 */
  upDateMapData(data) {
    this.isRealUpdate = true;
    this.state.data = data;
    this.setMapData();
  }

  commitProperties() {
    let me = this;
    let max = 76;
    let position = me._position;
    if (position >= max) position = max;
    let index = Math.round(position / max * (levels.length - 1));
    me.setState({
      top: position
    });
    if (me._index !== index) {
      me._index = index;
      me.setMapData();
    }
  }

  componentWillUnmount() {
    let me = this;
    window.removeEventListener('mouseup', me._eventFunction);
    me.map.dispose();
  }
}

forge(HuBeiMap, UiComponent);

export default HuBeiMap;
