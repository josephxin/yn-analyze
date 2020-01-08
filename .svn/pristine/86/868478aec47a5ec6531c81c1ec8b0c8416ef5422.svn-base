import React from 'react';
import echarts from "echarts";


/*
* @author zhy
* */
class CirclePieChart extends React.Component {
  constructor(props) {
    super(props)
    let me = this;
    me.state = {};
  }
  _setData(d) {
    let me = this;
    me.setState({
      data: d
    })
  }

  render() {
    let me = this;
    return (
      <div className="fillBarBox">
        <div ref="pieChart" style={{
          width: this.props.width,
          height: this.props.height
        }}></div>
      </div>
    )
  }

  componentWillMount() {
  }

  componentDidMount() {
    let me = this;
    me.chart = echarts.init(this.refs.pieChart);
    me.option = {
      legend: {
        width: "310",
        bottom: '2%',
        textStyle: {
          color: "#fff",
          fontSize: "12"
        },
        icon: 'circle',
        data: []
      },
      series: [
        {
          type: 'pie',
          radius: ['20%', '35%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: true,
          labelLine: {
            normal: {
              length: 35,
              length2: 90,
            }
          },
          data: [
          ]
        },
        {
          type: 'pie',
          radius: ['20%', '35%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: '{c}\n家'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold',
                color: '#fff'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
          ]
        }
      ]
    };
  }

  resize() {
    this.chart.resize();
  }

  componentDidUpdate() {
    let me = this;

    let colors = [
      { borderColor: '#02e8f5', color: ['#00e0ee', '#0198d3'] },
      { borderColor: '#ffea72', color: ['#e6bd0b', '#91a12e'] },
      { borderColor: '#36bb88', color: ['#36bb88', '#14e494'] }
    ]
    me.option.legend.width = "";

    if (me.state.data) {
      me.option.series[0].data = me.state.data.series.map(function (d, i) {
        if (i > 1) { i = 1 }
        return {
          value: d.value,
          name: d.name,
          itemStyle: {
            normal: {
              // borderColor: colors[i].borderColor,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: colors[i].color[0]
                }, {
                  offset: 1, color: colors[i].color[1]
                }],
                globalCoord: false
              }
            }
          },
          label: {
            normal: {
              // formatter: "占比{a|{d}}%" + '\n' + "{b}{b|{c}}起",
              align: 'left',
              formatter: `{a|{c}${me.state.data.unit}}{c|({d}%)}\n{b|{b}}`,
              padding: [0, -80],
              fontSize: '12',
              color: "#fff",
              lineHeight: 30,
              rich: {
                a: {
                  // color: '#f00',
                  color: '#fff',
                  fontSize: 22,
                },
                b: {
                  fontSize: 12,
                  color: '#fff',
                },
                c: {
                  color: colors[0].borderColor,
                  fontSize: 12,
                }
              }
            }
          }
        }
      })

      me.option.series[1].data = me.state.data.series.map(function (d, i) {
        if (i > 1) { i = 1 }
        return {
          value: d.value,
          name: d.name,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: `{c}\n${me.state.data.unit}`
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold',
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              // borderColor: colors[i].borderColor,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: colors[i].color[0]
                }, {
                  offset: 1, color: colors[i].color[1]
                }],
                globalCoord: false
              }
            }
          }
        }
      })
      me.option.legend.data = me.state.data.legend;
      me.chart.setOption(me.option);
      me.chart.resize();
    }
  }
  componentWillUnmount() {
    this.chart.dispose();
  };
}
export default CirclePieChart;
