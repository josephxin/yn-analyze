import React, { Component } from 'react';
import echarts from "echarts";

import lineBG from '../../image/chart/line-bg.png'

class Line extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = { show: "block" };
  };

  _setData(d) {
    let me = this;
    me.lock = true;
    me.setState({
      data: d
    })
  };

  _show() {
    this.setState({
      show: "block"
    })
  };

  _hidden() {
    this.setState({
      show: "none"
    })
  };

  render() {
    let me = this;
    let width = Number(me.props.width.slice(0, -3)) * window._fontSize;
    let height = Number(me.props.height.slice(0, -3)) * window._fontSize;
    return (
      <div style={{ display: me.state.show }}>
        <div style={{
          width: .76 * width / window._fontSize + 'rem' || 600,
          height: (.67 * height - (18 + 4)) / window._fontSize + 'rem' || 400,
          position: "absolute",
          bottom: (.05 * height + (18 + 4)) / window._fontSize + 'rem' || 10,
          left: (.07 * width + (32 - 13)) / window._fontSize + 'rem' || 10,
          background: `url(${lineBG}) no-repeat`,
          backgroundSize: "100% 100%"
        }} ref={'bgRef'}></div>
        <div
          ref="line"
          style={{
            width: me.props.width || 600,
            height: me.props.height || 400,
            position: "absolute",
            bottom: 0,
            left: '-.15rem',
            display: this.props.display
          }}>
        </div>
      </div>
    )
  };

  componentDidMount() {
    let me = this;
    const scale = window._scaler;
    me.chart = echarts.init(this.refs.line);
    me.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "#12ffff",
            width: 2
          }
        },
        formatter: function (e) {
          let xname = me.props.xaxisName;
          let yname = me.props.yname;
          return `<div>
              <p>${xname}: ${e[0].data[0]} 分</p>
              <p>${yname}: ${e[0].data[1]} 家</p>
            <div>`
        }
      },
      title: {
        subtext: "(家)",
        left: "6.5%",
        top: "16%",
        subtextStyle: {
          color: "rgba(0,206,255,1)",
          fontSize: 14
        }
      },
      legend: {
        data: [],
        icon: "rect",
        // top: "12px",
        itemHeight: 4,
        itemWidth: 15,
        shadowBlur: 5,
        textStyle: {
          color: "rgba(0,206,255,1)"
        },
      },
      grid: {
        top: '28%',
        left: '7%',
        right: '15%',
        bottom: '5%',
        containLabel: true
      },
      textStyle: {
        color: "rgba(0,206,255,1)"
      },
      color: ["rgba(0,255,255,1)"],
      xAxis: [
        {
          type: 'value',
          name: this.props.xaxisName,
          nameTextStyle: {
            fontSize: 14 * scale
          },
          nameGap: 36 * Number(window._scaler),
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,249,255,0)'
            },
            symbol: this.props.arrow ? ["none", "arrow"] : [],
            symbolSize: [5, 8]
          },
          axisLabel: {
            fontSize: 14 * Number(window._scaler)
          },
          nameTextStyle: {
            color: "rgba(0,206,255,1)"
          },
          axisTick: false,
          axisLabel: {
            margin: 12 * Number(window._scaler),
          },
          boundaryGap: true
        }
      ],
      yAxis: [
        {
          type: 'value',
          nameTextStyle: {
            fontSize: 14 * scale
          },
          splitNumber: 2,
          axisLabel: {
            fontSize: 14 * scale
          },
          axisTick: false,
          splitLine: {
            show: false,
          },
          axisLabel: {
            fontSize: 14 * scale,
            margin: 36 * scale,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0)"
            }
          },
          nameTextStyle: {
            color: "rgba(0,206,255,1)"
          },
        }
      ],
      series: [
        {
          name: '结果',
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbol: 'image://./static/image/chart/line-dot.png',
          symbolSize: [15, 15],
          data: [
            [20, 20],
            [30, 30],
            [35, 19],
            [40, 33],
            [50, 50],
            [60, 77],
            [63, 80],
            [70, 88],
            [73, 90],
            [75, 100],
            [80, 150],
            [85, 100],
            [90, 33]
          ],
          markPoint: {
            symbolSize: [43, 57],
            symbolOffset: [0, "-50%"],
            data: [
              {
                type: 'max',
                name: '最大值',
                symbol: 'image://./static/image/chart/max.png',
                label: {
                  normal: {
                    color: "rgba(255,144,0,.8)",
                    position: "insideTop",
                    distance: 13,
                    fontSize: 16,
                    fontWeight: "bold"
                  }
                }
              },
              {
                type: 'min',
                name: '最小值',
                symbol: 'image://./static/image/chart/min.png',
                label: {
                  normal: {
                    color: "rgba(0,162,255,.8)",
                    position: "insideTop",
                    distance: 13,
                    fontSize: 16,
                    fontWeight: "bold"
                  }
                }
              }
            ],
            itemStyle: {
              normal: {
                color: {

                }
              }
            },
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,255,.7)'
                }, {
                  offset: 1, color: 'rgba(0,255,255,0)'
                }],
              }
            }
          },
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: "rgba(0,206,255,1)",
              shadowBlur: 10,
              shadowOffsetY: 5
            }
          }
        }
      ]
    };
    me.chart.setOption(me.option, true);
  };

  resize() {
    this.chart.resize();
    this._resize();
  }

  _resize() {
    const me = this;
    const ref = me.refs.bgRef;
    let width = Number(me.props.width.slice(0, -3)) * window._fontSize;
    let height = Number(me.props.height.slice(0, -3)) * window._fontSize;
    ref.style.width = .76 * width / window._fontSize + 'rem';
    ref.style.height = (.67 * height - (18 + 4)) / window._fontSize + 'rem';
    ref.style.bottom = (.05 * height + (18 + 4)) / window._fontSize + 'rem';
    ref.style.left = (.07 * width + (32 - 13)) / window._fontSize + 'rem';
  }

  componentDidUpdate() {
    let me = this;
    // if (!me.lock) { return };
    // me.lock = false;
    // me.option.series[0].name = me.state.data.name;
    // me.option.xAxis[0].data = me.state.data.axis;
    // me.option.xAxis[0].name = me.state.data.axisname;
    // me.option.series[0].data = me.state.data.data;
    me.chart.setOption(me.option, true);
    me.chart.resize();
  };

  componentWillUnmount() {
    if (this.chart) { this.chart.dispose(); }
  };
};

export default Line;
