import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';

import bg1 from '../img/bg1.png';
import bg2 from '../img/bg2.png';
import bg3 from '../img/bg3.png';

import lineBG from '../../image/chart/line-bg.png'

class PictorialBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  _setData(d) {
    let me = this;
    me.flag = true;
    let len = d.CityName.length;
    let height = (len * parseFloat(me.props.height) * window._fontSize / (me.props.lenCount || 18)) / window._fontSize + 'rem';
    if (me.props.len) {
      height = me.props.height;
    }
    let _left = String(d.gridLeft).split('%')[0] === 'undefined' ? 33 : String(d.gridLeft).split('%')[0];
    let _right = String(d.gridRight).split('%')[0] === 'undefined' ? 17 : String(d.gridRight).split('%')[0];
    let _top = String(d.gridTop).split('%')[0] === 'undefined' ? 10 : String(d.gridTop).split('%')[0];
    let _bottom = String(d.gridBottom).split('%')[0] === 'undefined' ? 0 : String(d.gridBottom).split('%')[0];
    me._right = _right / 100;
    me.backgroundPLeft = parseFloat(me.props.width) * _left / 100;
    me.backgroundPTop = parseFloat(me.props.height) * _top / 100;
    me.backgroundPRight = parseFloat(me.props.width) * _right / 100;
    me.backgroundPBottom = parseFloat(me.props.height) * _bottom / 100;

    me.backgroundWidth = parseFloat(me.props.width) - me.backgroundPLeft - me.backgroundPRight;
    me.backgroundHeight = parseFloat(me.props.height) - me.backgroundPTop - me.backgroundPBottom;

    me.style = {
      width: '100%',
      height: height,
      position: 'absolute',
      top: me.props.top,
      background: `url(${lineBG}) no-repeat`,
      backgroundSize: `${me.backgroundWidth}rem ${me.backgroundHeight}rem`,
      backgroundPosition: `${me.backgroundPLeft}rem ${me.backgroundPTop}rem`
    };
    me.setState({
      data: d,
      height: height
    })
  };

  render() {
    let me = this;
    return (
      <div style={me.style}>
        <div ref="echartsDom" className={'bar-dom'} style={{
          width: this.props.width,
          height: this.state.height,
          position: 'absolute'
        }}></div>
      </div>
    )
  }

  componentDidUpdate() {
    let me = this;
    if (me.flag) {
      me.flag = false
    } else {
      return
    }
    if (!me.state.data) {
      return
    }
    me.myCharts = echarts.init(me.refs.echartsDom);
    me.myCharts.resize();
    // window.addEventListener('resize', me.bindResize);
    let datas = me.state.data;
    let image;
    me.objData = {
      labelOffset: me.state.data.labelOffset, /* 事故数量*/
      positionOffset: me.state.data.positionOffset, /**事故占比 */
      flages: me.state.data.flages,
      gridLeft: me.state.data.gridLeft,
      gridRight: me.state.data.gridRight,
      gridTop: me.state.data.gridTop,
      gridBottom: me.state.data.gridBottom,
      widthNum: me.state.data.widthNum,
      ancy: me.state.data.ancy,
      arrData: me.state.data.arrData,
      unit: me.state.data.unit,
      seriesName: me.state.data.seriesName,
      types: me.state.data.types,
      num: me.state.data.num,
      fontSize: me.state.data.fontSize
    };

    const scale = window._scale;
    me.option = {
      title: {
        text: ''
      },
      legend: null,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        extraCssText: 'z-index: 1',
        position: function (point, params, dom, rect, size) {
          // 固定在顶部
          if (Number(point[1]) < 20) {
            return [point[0] + 20, point[1] + 5];
          }
          return [point[0] + 20, point[1] - 30];
        },
        // position: function (d) { if (Number(d[1]) > 150) { return 'right' } },
        formatter: function (params) {
          return params[0].data._cityName;
        }
      },
      grid: {
        // containLabel: true,
        left: me.objData.gridLeft || "35%",
        right: me.objData.gridRight || "15%",
        top: me.objData.gridTop || "10%",
        bottom: me.objData.gridBottom || "0%",
      },
      yAxis: [
        {
          data: datas.Ydata || me.objData.arrData,
          inverse: true,
          position: 'left',
          // offset: (me.objData.labelOffset || 20) * scale,
          offset: 0,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          triggerEvent: true,
          axisLabel: {
            textStyle: {
              color: function (value, index) {
                switch (index + 1) {
                  case 1:
                    value = "#ae3a42";
                    break;
                  case 2:
                    value = "#df8019";
                    break;
                  case 3:
                    value = "#ffd800";
                    break;
                  default:
                    value = "#ffffff";
                    break;
                }
                return value;
              },

              fontSize: (me.props.fontSize || 14) * scale
            },
            formatter: function (d) {
              return d + [
                '{d|起}'
              ].join('\n')
            },
            rich: {
              d: {
                color: '#fff',
                fontSize: me.props.fontSize || 12,
                padding: [0, 5, 0, 5],
                align: 'center',
              }
            }
          }
        },
      ],
      xAxis: [
        {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        }
      ],
      series: [
        {
          //for shadow
          type: 'pictorialBar',
          name: '',
          stack: '总量',
          label: {
            normal: {
              show: true,   //事故占比
              // position: [me.objData.offsetName | -150, -3],
              position: 'insideRight',
              offset: [60 * (1 + me._right * 1) * scale, -1.5],
              textStyle: {
                fontSize: me.props.fontSize || 14,
              },
              formatter: function (d) {
                let value;
                if (d.seriesName === 0) {
                  value = Number(d.data.a);
                } else {
                  value = Number(d.data.a);
                }
                return value + [
                  `{d|${me.objData.unit}}`
                ].join('');
              },
              rich: {
                d: {
                  color: '#fff'
                }
              }
            }
          },
          barWidth: "7px",
          animation: false,
          itemStyle: {
            normal: {
              color: 'red',
              //barBorderRadius:10
            }
          },
          data: []
        },
        {
          type: 'bar',
          stack: '总量',
          symbol: 'path://M0,0 L20,0 L20,4 L0,4 L0,0 z', //M0,10 L10,10 L5,0 L0,10 z
          name: '',
          tooltip: {
            trigger: 'item' || me.objData.types,
            formatter: function (d, i) {
              return d.data._cityName
            }
          },
          label: {
            normal: {
              show: true,//事故名称
              textStyle: {
                color: 'red',
                fontSize: me.props.fontSize * scale || 16 * scale
              },
              // position: [(me.objData.positionOffset || -150) * scale, -3],
              position: [(me.objData.positionOffset || -150) * scale, -3],
              formatter: function (d) {
                let images;
                let str;
                let ind;
                if (d.seriesName === 0) {
                  ind = ''
                } else if (d.seriesName === 1) {
                  ind = d.dataIndex + 1
                }

                if (d.data._cityName.length > 4) {
                  str = d.data._cityName.slice(0, 4) + "..."
                } else {
                  str = d.data._cityName
                }
                return ['{num|' + (ind) + '}', '{value|' + str + '}'].join('\n');
              },
              rich: {
                num: {
                  color: '#fff',
                  align: 'left',
                  padding: [-13, 0, 0, 5]
                }
              }
            }
          },
          barWidth: '7px',
          data: []
        }
      ]
    };

    // let findBig = (n) => {
    //   let s = String(n);
    //   s = s.split('.')[0];
    //   let len = s.length - 1;
    //   let res = '1';
    //   for (let i = 0; i < len; i++) {
    //     res += '0';
    //   }
    //   res = parseInt(n) + parseInt(res) / 2;
    //   return res;
    // }


    //  let percent;
    let max1 = Math.max.apply(null, datas.seriesData);//最大值
    //   datas.seriesData.map((s,i)=>{
    //     return  percent=Math.round(max1/100)*s
    //   })

    //阴影
    let dataShadow = [];
    let colorList = ['#ae3a42', '#df8019', '#ffd800', '#fff',];
    for (let i = 0; i < datas.seriesData.length; i++) {
      dataShadow.push(
        {
          value: me.objData.num || 100,
          _cityName: datas.CityName[i],
          a: (datas.seriesData[i]),
          label: {
            normal: {
              show: true,   //事故名称
              color: colorList[i],
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(255,256,254,0)'
            }
          }
        }
      );
    }
    /*颜色 */
    let arr = [];
    let colorText = ['#ae3a42', '#df8019', '#ffd800', '#fff'];
    let bgs = [bg1, bg2, bg3, ''];
    let colorListGap = [
      { startColor: '#eb461f', endColor: '#ff952d' },
      { startColor: '#ff9000', endColor: '#ffd200' },
      { startColor: '#ffbc48', endColor: '#fffeac' },
      { startColor: '#00a2ff', endColor: '#00fffc' }
    ];
    datas.seriesData.map((s, i) => {
      let startColor, endColor;
      if (i > 2) {
        startColor = colorListGap[3].startColor;
        endColor = colorListGap[3].endColor
      } else {
        startColor = colorListGap[i].startColor;
        endColor = colorListGap[i].endColor
      }
      arr.push({
        _cityName: datas.CityName[i],
        value: datas.seriesData[i],
        label: {
          normal: {
            color: colorText[i],
            rich: {
              value: {
                color: '#ffffff',
                width: (me.objData.widthNum || 60) * scale,
                height: (me.props.fontSize === 20 ? 32 : 26) * scale,
                fontSize: (me.props.fontSize === 20 ? 16 : 14) * scale,
                lineHeight: 10,
                align: 'center',
                backgroundColor: {
                  image: bgs[i]
                }
              }
            },
          }
        },
        itemStyle: {
          normal: {
            color: {
              type: 'bar',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: startColor },
                { offset: 1, color: endColor }
              ],
              globalCoord: false
            }
          }
        }
      });
    });
    me.option.series[1].name = me.state.data.seriesName;
    me.option.series[0].name = me.state.data.unitName;
    me.option.series[0].data = dataShadow;
    me.option.series[1].data = arr;
    me.myCharts.setOption(me.option);
    me.myCharts.on("click", function (e) {
      if (e.componentType === 'yAxis') return;
      let temp = e.data._cityName === me.oldname;
      if (me.props.accidentPatternClick && !temp) {
        me.props.accidentPatternClick(e.data._cityName);
        me.oldname = e.data._cityName;
      }
    })
  }

  oldname = undefined;

  componentWillUnmount() {
    if (!this.myCharts) {
      return
    }
    this.myCharts.dispose();
  }

  resize() {
    this.myCharts.resize();
  }
}

export default PictorialBar;
