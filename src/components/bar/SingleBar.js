import React, { Component } from 'react';
import echarts from "echarts";

import lineBG from '../../image/chart/line-bg.png'

class SingleBar extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      show: 'none'
    };
  };

  _setData(d) {

    let me = this;
    me.lock = true;
    me.setState({
      data: d,
    })
  };
  _show() {
    this.setState({
      show: 'block'
    })
  }
  _hide() {
    this.setState({
      show: 'none'
    })
  }
  render() {
    let me = this;
    let width = Number(me.props.width.slice(0, -3)) * window._fontSize;
    let height = Number(me.props.height.slice(0, -3)) * window._fontSize;

    return (
      <div className={'frame-style frame-size-time'} style={{ display: me.state.show }}>
        <div style={{
          width: (.8 * width - 32 - 4 + 36) / window._fontSize + 'rem',
          height: '1.2rem',
          position: "absolute",
          bottom: (.05 * height + 18 + 4) / window._fontSize + 'rem',
          left: (.07 * width + 32 - 15) / window._fontSize + 'rem',
          background: `url(${lineBG}) no-repeat`,
          backgroundSize: "100% 100%"
        }} ref={'bgRef'}></div>
        <div
          ref="bar"
          style={{
            width: me.props.width,
            height: me.props.height,
            zIndex: 20,
            position: "absolute",
            bottom: 0,
            left: "-0.15rem",
          }}>
        </div>
      </div>
    )
  };

  componentDidMount() {
    let me = this;
    const scale = window._scale;
    me.chart = echarts.init(this.refs.bar);
    me.option = {
      title: {
        subtext: "(起)",
        left: "6.5%",
        top: "0%",
        subtextStyle: {
          color: "rgba(0,206,255,1)",
          fontSize: 14*scale
        }
      },
      legend: {
        data: [],
        icon: "rect",
        itemHeight: 4*scale,
        itemWidth: 15*scale,
        shadowBlur: 5*scale,
        textStyle: {
          color: "rgba(0,206,255,1)"
        },
      },
      grid: {
        top: '28%',
        left: '6.5%',
        right: '9.5%',
        bottom: '8%',
        containLabel: true
      },
      textStyle: {
        color: "rgba(0,206,255,1)"
      },
      color: ["rgba(0,255,255,1)"],
      xAxis: {
        type: 'category',
        boundaryGap: true,
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(0,249,255,1)'
          },
        },
        axisTick: {
        	show: false,
          interval: 0,
        },
        axisLabel: {
          interval: 0,
          rotate: me.props.type === 2 ? 0 : -30,
          showMinLabel: true,
          showMaxLabel: true,
          color: '#fff',
          fontSize: 12*scale,
          margin: 6*scale,
          // formatter: function (e) {
          //   const len = e.length;
          //   let label = e;
          //   if (len > 3) {
          //     label = e.slice(0, 3) + '<br>' + e.slice(3);
          //   }
          //   return label;
          // }
        },
        splitLine: {
          show: false,
        },
        data: []
      },
      yAxis: [
        {
          type: 'value',
          name: this.props.yaxisName,
          nameTextStyle: {
            fontSize: 14*scale
          },
          position: 'left',
          nameGap: 15*scale,
          axisTick: false,
          splitLine: {
            show: false,
          },
         	splitNumber:4,
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(0,249,255,1)'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12*scale
            }
          },
        }
      ],
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['rgba(37,104,164,0.2)', 'rgba(255,151,0,0.2)', 'rgba(37,104,164,0.2)', 'rgba(37,104,164,0.2)'];
                return colorList[params.dataIndex];
              }
            }
          },
          barWidth: '30%',
          data: [],
          animation: false
        },
        {
          name: '',
          type: 'bar',
          barWidth: '30%',
          barGap: '-100%',
          data: [],
          label: {
            show: true,
            // position: 'insideBottom',
            // offset: [0, 0],
            // formatter: function (d) {
            //   return d;
            //   console.log(d);
            // }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#00a2ff' },

                  { offset: 0, color: '#00fffc' }
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#ffc000' },
                  { offset: 0, color: '#ff9000' }
                ]
              )
            }
          }
        },
      ]
    };
    me.chart.setOption(me.option, true);
  };

  _resize() {
    const me = this;
    const ref = me.refs.bgRef;
    let width = parseFloat(me.props.width) * window._scaler * 100;
    let height = parseFloat(me.props.height) * window._scaler * 100;
    ref.style.width = (.85 * width - 32 - 4) / (window._scaler * 100) + 'rem';
    ref.style.height = (.74 * height - 18 - 4) / (window._scaler * 100) + 'rem';
    ref.style.bottom = (.06 * height + 22) / (window._scaler * 100) + 'rem';
    ref.style.left = (.07 * width + 32 + 4) / (window._scaler * 100) + 'rem';
  }

  componentDidUpdate() {
    let me = this;
    if (!me.lock) { return };
    me.lock = false;
    me.objDta = {
      switch: me.state.data.switch,
      arage: me.state.data.arage
    }

    me.option.tooltip = {
      trigger: 'item',
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        if (me.objDta.switch === false) {
          let res = '<div style="width:150px;height:100;background:#022971;font-size: 10px;padding: 10px;white-space: pre-wrap; line-height: 28px";>' +
            '<span style="font-size: 10px">' + params[0].name + '天气 </span><br/>' +
            '<span><b class="odd" style="font-size: 18px">' + params[0].seriesName + '</b> 事故</span><br/>' +
            '<span style="font-size: 10px">数量为<b class="odd" style="font-size: 18px"> ' + params[0].data.value + '</b> 起</span><br/>' +
            '</div>';
          return res;
        } else {
          let res = '<div style="width:80px;height:50;background:#182d74;font-size: 18px;padding: 10px;white-space: pre-wrap; line-height: 28px">' +
            '<span style="fontSize:16">' + params[1].name + '</span>: ' +
            '<span style="background: linear-gradient(to left, #ff9000, #ffc000);-webkit-background-clip: text;color: transparent">' +
            params[1].data.value + '</span>' +
            '</div>';
          return res
        }
      },
    }
    let dataShadow = [];
    for (let i = 0; i < me.state.data.seriesData.length; i++) {
      dataShadow.push(500);
    }
    if (me.objDta.arage === false) {
      me.option.series[0].data = []
    } else {
      me.option.series[0].data = dataShadow;
    }
    me.option.series[1].name = me.state.data.seriesName;
    me.option.xAxis.data = me.state.data.Xdata;
    me.option.series[1].data = me.state.data.seriesData.map((t, i) => {
      return {
        value: t
      };
    });
    me.chart.setOption(me.option, true);
  };

  resize() {
    this.chart.resize();
    this._resize();
  }

  componentWillUnmount() {
    if (!this.chart) { return }
    this.chart.dispose();
  };
};

export default SingleBar;
