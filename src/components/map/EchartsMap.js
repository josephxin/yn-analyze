import {createElement, setStyles, UiComponent} from '@jusfoun-vis/common';
import echarts from 'echarts';

const REGISTER_MAP_NAME = 'luzhou';

/*
* 基于echarts实现的地图
* @author msh
*
* @params numLayer 层数
* @params geoJson 地图的json
* @params width 盒子宽
* @params height 盒子高
* @params mapData 地图数据
* @params seriesData 地图series数据
* @params selectedAreaName 选中区域名称
* @params mapClick 地图点击回调
* @params isShowLabel 是否显示label
* @params labelFontSize label字体大小
* @params mapSize 地图大小
* @params isShowCenter 是否显示中心点
* @params tooltip 地图浮窗formatter函数x
* @params deviation 每一层偏移量
* */
class EchartsMap extends UiComponent {
  _domElement = undefined;
  _echartsinstance = undefined;

  constructor(props) {
    super();
    let me = this;
    let domElement = createElement('div');
    // setStyles(domElement, option.style);

    me._echartsinstance = echarts.init(domElement);
    me._domElement = domElement;

    me._option = {
      visualMap: {
        show: false,
        min: 0,
        max: 1000,
        inRange: {
          color: ['#007eff', '#0041ff']
        }
      },
      tooltip: {
        formatter: function (d) {
        },
        textStyle: {
          fontSize: 14,
          color: '#fff'
        },
        borderColor: '#00dcdf',
        borderWidth: 1,
        confine: true,
        enterable: true
      },
      geo: [],
      series: []
    };
  }

  _isUpdateStyle = false;
  _isUpDateMapStyle = false;
  _isUpdateMapData = false;
  _isUpdateSeriesData = false;

  /* 存储geoJson内所有区域的名字 */
  _areasName = [];

  /* 层数 */
  _numLayer = 6;
  get numLayer() {
    return this._numLayer;
  }

  set numLayer(value) {
    if (!Number(value)) value = 6;
    this._numLayer = value;
    this._updateMapStyle();
  }

  /* 地图的json */
  _geoJson = undefined;
  get geoJson() {
    return this._geoJson
  }

  set geoJson(geoJson) {
    let me = this;
    me._geoJson = geoJson;
    me._areasName = geoJson.features.map(t => {
      return t.properties.name;
    });
    me._updateMapStyle();
  }

  /* chart盒子的宽 */
  _width = undefined;
  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
    this._updateStyle();
  }

  /* chart盒子的高 */
  _height = undefined;
  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
    this._updateStyle();
  }

  /* 地图数据 */
  _mapData = undefined;
  get mapData() {
    return this._mapData;
  }

  set mapData(data) {
    this._mapData = data;
    this._updateMapData();
  }

  /* 选中区域 */
  _selectedAreaName = undefined;
  get selectedAreaName() {
    return this._selectedAreaName;
  }

  set selectedAreaName(name) {
    this._selectedAreaName = name;
    this._updateMapStyle();
  }

  /* 地图click回调 */
  _mapClick = undefined;
  get mapClick() {
    return this._mapClick;
  }

  set mapClick(callback) {
    this._mapClick = callback || function (d) {
    };
    this._updateMapStyle();
  }

  /* 地图label */
  _isShowLabel = false;
  get isShowLabel() {
    return this._isShowLabel;
  }

  set isShowLabel(boolean) {
    this._isShowLabel = boolean;
    this._updateMapStyle();
  }

  /* 地图label字体大小 */
  _labelFontSize = 16;
  get labelFontSize() {
    return this._labelFontSize;
  }

  set labelFontSize(value) {
    this._labelFontSize = value;
    this._updateMapStyle();
  }

  /* 地图大小 */
  _mapSize = '100%';
  get mapSize() {
    return this._mapSize;
  }

  set mapSize(value) {
    this._mapSize = value;
    this._updateMapStyle();
  }

  /* 地图scatter数据 */
  _isShowCenter = false;
  get isShowCenter() {
    return this._isShowCenter;
  }

  set isShowCenter(boolean) {
    this._isShowCenter = boolean;
    this._updateSeriesData();
  }

  /* 地图series数据 */
  _seriesData = false;
  get seriesData() {
    return this._seriesData;
  }

  set seriesData(data) {
    this._seriesData = data;
    this._updateSeriesData();
  }

  /* 地图tooltip */
  _tooltip = undefined;
  get tooltip() {
    return this._tooltip;
  }

  set tooltip(callback) {
    this._tooltip = callback || function (d) {
    };
    this._updateSeriesData();
  }

  /* 每一层偏移量 */
  _deviation = 0.4;
  get deviation() {
    return this._deviation;
  }

  set deviation(value) {
    let n = Number(value);
    if (isNaN(n)) {
      n = 0.4;
    }
    this._deviation = n;
    this._updateMapStyle();
  }

  /* 是否开启多选 */
  _selectedMode = false;
  get selectedMode() {
    return this._selectedMode;
  }

  set selectedMode(boolean) {
    this._selectedMode = boolean;
    this._updateSeriesData();
  }

  /* 更新样式相关 */
  _updateStyle() {
    this._isUpdateStyle = true;
    this.invalidateProperties();
  }

  /* 更新geoJson相关 */
  _updateMapStyle() {
    this._isUpDateMapStyle = true;
    this.invalidateProperties();
  }

  /* 更新地图数据相关 */
  _updateMapData() {
    this._isUpdateMapData = true;
    this.invalidateProperties();
  }

  /* 更新地图数据相关 */
  _updateSeriesData() {
    let center = {
      name: '泸州市',
      coord: [
        105.580755,
        28.890572
      ]
    };
    this._center = center;
    this._isUpdateSeriesData = true;
    this.invalidateProperties();
  }

  /* 处理地图数据 */
  formatMapData() {
    let me = this;
    let d = me._mapData;
    let len = d.length;
    let lines = [];
    let effectScatters = [];
    for (let i = 0; i < len; i++) {
      let fromCity = d[i].fromCity;
      let toCity = d[i].toCity;
      lines.push({
        coords: [fromCity.coord, toCity.coord]
      });
      if (i === 0) {
        effectScatters.push({
          name: toCity.name,
          value: toCity.coord.concat(0)
        })
      }
      effectScatters.push({
        name: fromCity.name,
        value: fromCity.coord.concat(0)
      });
    }
    return {
      lines,
      effectScatters
    };
  }

  _setOption() {
    let me = this;
    me._echartsinstance.resize();
    me._echartsinstance.setOption(me._option, {
      notMerge: true,
      lazyUpdate: false,
      silent: true
    });
    me._echartsinstance.on('click', me._mapClick);
  }

  dispose() {
    this._echartsinstance.dispose();
  }

  commitProperties() {
    let me = this;

    if (me._isUpDateMapStyle) {
      me._isUpDateMapStyle = false;
      let regionFlag = me._areasName.indexOf(me._selectedAreaName) !== -1;
      echarts.registerMap(REGISTER_MAP_NAME, me._geoJson);
      let regions = [];
      let isLabelShow = me._isShowLabel;
      let geo = [];
      let n = me._numLayer;
      let d = me._deviation;
      for (let i = 0; i < n; i++) {
        let flag = i === n - 1;
        geo.push({
          map: REGISTER_MAP_NAME,
          roam: false,
          // aspectScale: 1,
          layoutCenter: [`${50}%`, `${50 - i * d}%`],
          layoutSize: me._mapSize,
          label: {
            normal: {
              show: flag ? isLabelShow : false,
              textStyle: {
                color: '#fff',
                fontSize: me._labelFontSize
              }
            },
            emphasis: {
              show: flag ? isLabelShow : false,
              textStyle: {
                color: '#fff',
                fontSize: me._labelFontSize
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: flag ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(2,61,130,.7)'
                }, {
                  offset: 1, color: 'rgba(2,61,130,.7)'
                }],
                globalCoord: false
              } : 'rgba(2,61,130,.7)',
              borderColor: '#26d7dd',
              borderWidth: 1,
              opacity: 0.1 + i / n * 0.9
            },
            emphasis: {
              areaColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(2,61,130,.7)'
                }, {
                  offset: 1, color: 'rgba(2,61,130,.7)'
                }],
                globalCoord: false
              }
            }
          },
          silent: !flag
        })
      }
      /* 默认选中 */
      if (regionFlag) {
        regions = [{
          name: me._selectedAreaName,
          itemStyle: {
            normal: {
              areaColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(33,242,255,.8)'
                }, {
                  offset: 1, color: 'rgba(0,120,255,.8)'
                }],
                globalCoord: false
              }
            }
          }
        }];
      }
      geo[n - 1].regions = regions;
      me._option.geo = geo;
    }

    if (me._isUpdateStyle) {
      me._isUpdateStyle = false;
      let domElement = me._domElement;
      let style = domElement.style;
      style.width = me._width + 'px';
      style.height = me._height + 'px';
    }

    if (me._isUpdateMapData) {
      me._isUpdateMapData = false;
      let series = [];
      let res = me.formatMapData();
      series.push(
        {
          name: ' Top10',
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.1,
            color: '#fff',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: '',
              width: 0,
              curveness: 0.2
            }
          },
          data: res.lines,
          silent: true
        },
        {
          name: ' Top10',
          type: 'lines',
          zlevel: 2,
          symbol: 'none',
          lineStyle: {
            normal: {
              color: '#2efcfc',
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          data: res.lines,
          silent: true
        },
        {
          name: ' Top10',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'bottom',
              formatter: '{b}',
              textStyle: {
                color: '#fff',
                fontSize: me._labelFontSize
              }
            }
          },
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: function (d) {
                if (d.name === '泸州市') {
                  return '#ff1758'
                } else {
                  return '#03eed0'
                }
              }
            }
          },
          data: res.effectScatters,
          silent: true
        }
      );
      me._option.series = series
    }

    if (me._isUpdateSeriesData) {
      me._isUpdateSeriesData = false;
      let op = me._option;
      let d = me._deviation;
      let series = [];
      let res = [{
        name: me._center.name,
        value: me._center.coord.concat(0)
      }];
      if (me._isShowCenter) {
        series.push(
          {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'bottom',
                formatter: '{b}',
                textStyle: {
                  color: '#f6fd31',
                  fontSize: me._labelFontSize
                }
              }
            },
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#f6fd31'
              }
            },
            data: res,
            silent: true
          }
        );
      }
      series.push(
        {
          name: '',
          type: 'map',
          map: REGISTER_MAP_NAME,
          coordinateSystem: 'geo',
          // aspectScale: 1,
          layoutCenter: ['50%', `${50 - (me._numLayer - 1) * d}%`],
          layoutSize: me._mapSize,
          selectedMode: me._selectedMode,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 14,
                color: '#fff'
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: 14,
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'transparent',
              borderWidth: 1,
              borderColor: '#012abc'
            },
            emphasis: {
              areaColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#fb7c00'
                }, {
                  offset: 1, color: '#ffaf00'
                }],
                globalCoord: false
              },
              borderWidth: 1,
              borderColor: '#ffba00'
            }
          },
          data: me._seriesData
        }
      );
      op.tooltip.formatter = me._tooltip;
      op.series = series;

      let _series = me._seriesData;
      if (!_series) return false;
      let sortSeriesData = _series.sort(function (a, b) {
        return a.value - b.value; // 正序
      });

      let len = sortSeriesData.length;
      let min = sortSeriesData[0].value;
      let max = sortSeriesData[len - 1].value;
      op.visualMap.min = min;
      op.visualMap.max = max;
    }

    me._setOption();
  }
}

export default EchartsMap;
