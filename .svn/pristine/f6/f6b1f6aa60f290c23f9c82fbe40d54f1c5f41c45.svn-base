import React, {
	Component
} from 'react';
import echarts from "echarts";
import { cloneFn } from '../../tool/tool.js';
import './DoubleBar.css';

class DoubleBar extends Component {
	constructor(props) {
		super(props);
		let me = this;
		me.state = {};
	};

	_setData(d) {
		let me = this;
		me.lock = true;
		me.setState({
			data: d
		})
	};

	render() {
		let me = this;
		const props = me.props;
		if(!me.state.data) {
			return false
		}
		const _width = parseFloat(props.width) * 100;
		const styleObj = {
			width: '1.5rem',
			height: '1.8rem',
			position: "absolute",
			top: '1.75rem',
			left: (.02 * _width + 49 + 18) / 100 + 'rem',
		};
		const styleObjZebra = {
			width: (.96 * _width) / 100 + 'rem',
		};
		const styleObj1 = {
			left: '2.7rem',
		};
		const styleObj2 = {
			left: '4.7rem',
		};
		const styleObj3 = {
			left: '6.6rem',
		};
		
		return(
			<div className={'frame-style'}>
        <div className={'parent-list'}>
          {
            me.state.data.type.map((s, index) => {
            	let ratio=me.state.data.ratioNum[index];
              return (
                <div className='parent-list-wrap' key={index}>
                  <dl className={'parent-list-item'}>
                    <dt>{s}</dt>
                    <dd><span className={s=="同比上升" ? 'odd' : 'even'}>{ratio}</span><i>{(ratio!='净增' && ratio!='--') ? '%' : ''}</i></dd>
                  </dl>
                </div>
              )
            })
          }
        </div>
        
        <div className={'zebra-stripe'} style={{...styleObj, ...styleObjZebra}}></div>
        <div ref="bar0" style={styleObj}></div>
        <div ref="bar1" style={{...styleObj, ...styleObj1}}></div>
        <div ref="bar2" style={{...styleObj, ...styleObj2}}></div>
        <div ref="bar3" style={{...styleObj, ...styleObj3}}></div>
      </div>
		)
	};

	chartUnit = ['起', '万元', '人', '人'];

	componentDidUpdate() {
		let me = this;
		if(!me.lock) {
			return
		}
		me.lock = false;
		me.chart0 = echarts.init(this.refs.bar0);
		me.chart1 = echarts.init(this.refs.bar1);
		me.chart2 = echarts.init(this.refs.bar2);
		me.chart3 = echarts.init(this.refs.bar3);
		me.option0 = {
			tooltip: {
				trigger: 'axis',
				show: true,
				axisPointer: {
					type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
					shadowStyle: {
						opacity: 0.4
					}
				},
				formatter: function(params) {
					
					let thisYearStart = params[0].seriesName,
						thisYearEnd = params[1].seriesName;
					let lastYearStart = thisYearStart.slice(0, 4) - 1 + thisYearStart.slice(4, thisYearStart.length);
					let lastYearEnd = thisYearEnd.slice(0, 4) - 1 + thisYearEnd.slice(4, thisYearEnd.length);
					
					let nameStart = params[0].name;
					let index = '';
					if(nameStart== '事故总起数'){
						index = '起'
					}else if(nameStart== '直接经济损失'){
						index = '万元'
					}else if(nameStart== '死亡人数'){
						index = '人'
					}else if(nameStart== '受伤人数'){
						index = '人'
						//me.chartUnit[params[1].dataIndex]
						//me.chartUnit[params[0].dataIndex]
					}
					
					let res = '<div style="background:#1b2f77;font-size: 0.14rem;padding: 0.1rem; line-height: 0.28rem;">' +
						'<span>' + lastYearStart + ' 至 ' + lastYearEnd + '</span><br/>' +
						'<span>' + params[0].axisValue + '：<b class="even" style="font-size: .18rem;">' + parseInt(params[0].value) + '</b>' + index + '</span><br/>' +
						'<span>' + thisYearStart + ' 至 ' + thisYearEnd + ' </span><br />' +
						'<span>' + params[1].axisValue + '：<b class="odd" style="font-size: .18rem;">' + parseInt(params[1].value) + '</b>' + index + '</span><br/>' +
						'</div>';
					return res;
				}
			},
			legend: {
				data: [],
				icon: "rect",
				itemHeight: 4,
				itemWidth: 15,
				shadowBlur: 5,
				textStyle: {
					color: "rgba(0,206,255,1)"
				},
			},
			grid: {
				top: '0%',
				left: '-35%',
				right: '0%',
				bottom: '5%',
				containLabel: true
			},
			textStyle: {
				color: "rgba(0,206,255,1)"
			},
			color: ["rgba(0,255,255,1)"],
			xAxis: [{
				type: 'category',
				axisTick: false,
				axisLine: {
					show: false,
				},
				axisLabel: {
					color: '#fff',
					fontSize: 12,
					margin: 12
				},
				splitArea: {
					show: false,
					interval: 'auto',
					areaStyle: {
						color: '#044ea7',
					}
				},
				splitLine: {
					show: false,
					lineStyle: {
						borderRight: '30px',
						type: 'solid',
						color: 'rgba(58,114,169,0.4)'
					}
				},
				data: me.state.data.Xdata.slice(0, 1)
			}],
			yAxis: [{
				type: 'value',
				axisTick: true,
				splitLine: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: false
				},
			}],
			series: [{
					name: '',
					type: 'bar',
					barWidth: 12,
					data: me.state.data.seriesData2.slice(0, 1),
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: '#00fffc'
									},
									{
										offset: 1,
										color: '#00a2ff'
									}
								]
							)
						},
					}
				},
				{
					name: '',
					type: 'bar',
					barWidth: 12,
					data: me.state.data.seriesData1.slice(0, 1),
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: '#bfc732'
									},
									{
										offset: 1,
										color: '#a7ba46'
									}
								]
							)
						}
					}
				},
			]
		};
		
		me.option0.series[0].name = me.state.data.startData;
		me.option0.series[1].name = me.state.data.endData;
		
		me.option1 = cloneFn(me.option0);
		me.option1.xAxis[0].data=me.state.data.Xdata.slice(1, 2)
		me.option1.series[0].data=me.state.data.seriesData2.slice(1, 2)
		me.option1.series[1].data=me.state.data.seriesData1.slice(1, 2)
		me.option2 = cloneFn(me.option0);
		me.option2.xAxis[0].data=me.state.data.Xdata.slice(2, 3)
		me.option2.series[0].data=me.state.data.seriesData2.slice(2, 3)
		me.option2.series[1].data=me.state.data.seriesData1.slice(2, 3)
		
		me.option3 = cloneFn(me.option0);
		me.option3.xAxis[0].data=me.state.data.Xdata.slice(3)
		me.option3.series[0].data=me.state.data.seriesData2.slice(3)
		me.option3.series[1].data=me.state.data.seriesData1.slice(3)
		
		//console.log(me.option0, me.option1, me.option0==me.option1);
		
		me.chart0.setOption(me.option0, true);
		me.chart1.setOption(me.option1, true);
		me.chart2.setOption(me.option2, true);
		me.chart3.setOption(me.option3, true);
	};

	resize() {
		this.chart0.resize();
		this.chart1.resize();
		this.chart2.resize();
		this.chart3.resize();
	}

	componentWillUnmount() {
		if(this.chart0) {
			this.chart0.dispose();
		}
		if(this.chart1) {
			this.chart1.dispose();
		}
		if(this.chart2) {
			this.chart2.dispose();
		}
		if(this.chart3) {
			this.chart3.dispose();
		}
	};
}

export default DoubleBar;