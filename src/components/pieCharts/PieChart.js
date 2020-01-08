import React from 'react';
import echarts from "echarts";

import './pieChart.css'
/*
 * @author 辛志强
 * */
class PieChart extends React.Component {
	constructor(props) {
		super(props);
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
		let data = me.state.data
		//console.log(data)
		let cssName = me.props.cssName || 'ulColor'
		return(
			<div className="fillBarBox pieChart">
				<ul className={cssName}>
					{
						data && data.colors== "true" ? data.series.map((item,i)=>{
							return  (
								<li key={i}>
									<p className={'pColor'}></p>
									<p className={'pColorTwo'}>{item.name}</p>
								</li>
							)
						}) :''
					}
				</ul>
			
		        <div className="echarts-position" ref="pieChart"
		          style={{
		            width: this.props.width / 100 + "rem",
		            height: this.props.height / 100 + "rem",
		            top: me.props.right ? '0.35rem' : '',
		          }}></div>
      		</div>
		)
	}

	componentWillMount() {}

	componentDidMount() {
		let me = this;
		const scale = window._scale;
		me.chart = echarts.init(this.refs.pieChart);
		
		me.option = {
			tooltip: {
				trigger: 'item',
				formatter: function(params) {
					return params.name + (me.props.keyworld ? "事故:" : '') + params.value + "起"
				},
			},
			grid: {
				top: '2%'
			},
			legend: {
				show: false,
				width: me.props.width * scale,
				top: me.props.right ? '0%' : '4%',
				textStyle: {
					color: "#fff",
					fontSize: 12,
				},
				selected: {},
				icon: 'rect',
				itemWidth: 20*scale,
				itemHeight: 10*scale,
				data: []
			},
			series: [{
				//z: 0,
				name: '',
				type: 'pie',
				center: ['50%', me.props.right ? '45%' : '60%'],
				radius: ['18%', '19%'],
				hoverAnimation: false,
				label: {
					normal: {
						position: 'center',
						show: false
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
					value: 0,
					itemStyle: {
						normal: {
							color: '#00a1be' //颜色填充
						}
					},
					tooltip: {
						show: false
					}
				}]
			}, {
				type: 'pie',
				center: ['50%', me.props.right ? '45%' : '60%'],
				radius: ['20%', '35%'],
				roseType: me.props.right ? 'area' : '', //'area'为定角南丁格尔图，'radius'为不定角南丁格尔图
				avoidLabelOverlap: true, //防止标签重叠策略
				labelLine: {
					normal: {
						length:20 * scale,
						length2: 100 * scale,
					}
				},
				data: []
			}]
		};

		let callback = me.props._click;
		if(callback && typeof callback === 'function') {
			me.chart.on('click', callback);
		}
	}

	componentDidUpdate() {
		let me = this;
		const scale = window._scale;
		if(me.state.data) {
			let colors = [];
			if(me.state.data.colors === "true") {
				colors = [{
					borderColor: '#5ed15f',
					color: ['#127148', '#04b053']
				}, {
					borderColor: '#edb764',
					color: ['#828326', '#ded810']
				}, {
					borderColor: '#f59761',
					color: ['#a0671d', '#dd9711']
				}, {
					borderColor: '#f37466',
					color: ['#6f262c', '#c94028']
				}]
			} else {
				me.option.legend.show = true
				colors = [{
						borderColor: '#ff9000',
						color: ['#986a2b', '#e09e12']
					}, {
						borderColor: '#f3c37d',
						color: ['#9ca528', '#d6d911']
					},
					{
						borderColor: '#26c897',
						color: ['#2c9232', '#29af26']
					}, {
						borderColor: '#03d5f6',
						color: ['#029de0', '#01d2ee']
					},
					{
						borderColor: '#07a2ff',
						color: ['#144eec', '#2a76dd']
					}, {
						borderColor: '#60d599',
						color: ['#029a71', '#02c483']
					}
				]
			}
			me.option.series[1].data = me.state.data.series.map(function(d, i) {
				let color = colors[i] || colors[0];
				console.log(d)
				let fn = "占比{a|{d}}%" + '\n' + "{hr|}" + '\n' + "{b}" + (me.props.keyworld ? "事故:" : '') + "{b|{c}}起"
				if(me.props.isScale){
					fn = (p)=>{
						let title = me.props.keyworld ? "事故:" : ''
						let str = `占比{a|${p.data.scale}}%\n{hr|}\n${p.data.name}${title}{b|${p.data.value}}起`
						return str
					}
				}
				return {
					value: d.value,
					name: d.name,
					scale:d.scale ? d.scale : "",
					itemStyle: {
						normal: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: color.color[0]
								}, {
									offset: 1,
									color: color.color[1]
								}],
								globalCoord: false
							}
						},
					},
					label: {
						normal: {
							formatter: fn, 
							padding: [0, -100 * scale],
							fontSize: 12,
							color: "#fff",
							lineHeight: 5,
							rich: {
								a: {
									color: color.color[1],
									fontSize: 18 * scale,
									lineHeight: 15 * scale
								},
								b: {
									color: color.color[1],
									fontSize: 18 * scale,
									lineHeight: 15 * scale
								},
								hr: {
									width: '100%',
									borderWidth: 0.5,
									height: 0
								}
							},
						}
					},
					labelLine: {
						normal: {
							show: true,
						},
						lineStyle: {
							color: color.color[1]
						},
						emphasis: {
							show: true
						}
					},
				}
			})
			var opt = me.option.series[1];
			for(let i = 0; i < opt.data.length; i++) {
				if(opt.data[i] && opt.data[i].value === 0) {
					opt.data[i].labelLine.normal.show = false;
					opt.data[i].labelLine.emphasis.show = false;
					opt.data[i].labelLine.normal.length = 0;
					opt.data[i].labelLine.normal.length2 = 0;
					opt.data[i].label.normal.show = false;
				}
			}
			me.option.legend.data = me.state.data.legend;
			me.chart.setOption(me.option, true);
			me.chart.resize();
			/*if(!(me.state.data.colors === "true")){
				me.chart.dispatchAction({
					type: 'highlight',
					seriesIndex: 1,
					dataIndex:0,
				});
			}*/
			
		}
	}

	resize() {
		this.chart.resize();
		this.componentDidMount();
		this.componentDidUpdate();
	}

	componentWillUnmount() {
		this.chart.dispose();
	};
}

export default PieChart;