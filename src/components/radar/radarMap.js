import React from 'react';
import echarts from "echarts";


/*
* @author zhy
* */
class RadarMap extends React.Component {
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
        <div ref="pieChart" style={{ width: this.props.width, height: this.props.height, position: "absolute", top: "70px" }}></div>
      </div>
    )
  }
  componentDidMount() {
    let me = this;
    me.chart = echarts.init(this.refs.pieChart);
    me.option = {
      tooltip: {
        trigger: 'axis'
      },
      radar: [
        {
          indicator: [],
          radius: 100,
          center: ['50%', '50%'],
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#049153', '#049153', '#a3ac29', '#a3ac29', '#c75533', '#c75533']
            }
          },
          axisLine: {
            show: false
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(7,149,76,0.4)', 'rgba(255,255,255,0.1)', 'rgba(162,169,40,0.4)', 'rgba(5,49,119,0.1)', 'rgba(193,97,80,0.5)']
            }
          }
        },
      ],
      series: [
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          symbol: 'none',
          itemStyle: {
            normal: {
              areaStyle: { type: 'default' },
              borderColor: '#00cafe',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#01cae5'  // 0% 处的颜色
                }, {
                  offset: 1, color: '#014ee6' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          data: [
            {
              value: [],
              name: '安全生产形势评估'
            }
          ]
        }
      ]
    };

  }
  componentDidUpdate() {
    let me = this;
    let datas = [];
    if (me.state.data) {
      for (let i = 0; i < me.state.data.indicator.length; i++) {
        datas.push(me.state.data.indicator[i].data)
      }
      me.option.series[0].data[0].value = datas;
      me.option.radar[0].indicator = me.state.data.indicator.map(function (d, i) {
        return { text: d.text, max: d.max, color: '#fff', fontSize: '14px' }
      })
      me.chart.setOption(me.option);
    }

  }
  componentWillUnmount() {
    this.chart.dispose();
  };
}
export default RadarMap;
