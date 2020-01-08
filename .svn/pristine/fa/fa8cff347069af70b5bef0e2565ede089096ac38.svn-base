/**
 * params 为保证重新发送请求的参数和选项框里的时间一致，对其深拷贝，再操作
 */

import React from 'react';
import { HashRouter } from 'react-router-dom';
import Panel from '../../components/panel/Panel';
import * as api from '../../api/api-intelligent-analysis';

/* css */
import './intelligent-analysis.css';

import Modal from '../../components/modal/Modal';

/* 事故时间趋势分析 */
import Line from '../../components/linechart/line';
import SelectTrend from '../../components/selecttrend/selecttrend';
import SingleBar from '../../components/bar/SingleBar';

/* 时间选择 */
import IntelligentAnalysisTimeSelect from '../../components/hubei-time-select/IntelligentAnalysisTimeSelect';
/* 事故选择 */
import AccidentSelect from '../../components/accident-select/accidentselect';
/*事故区域分析*/
import DivBar from '../../components/bar/DivBar';
/* 中心图 */
import IntelligentAnalysisCenter from '../../components/intelligent-analysis-center/IntelligentAnalysisCenter';
/*事故行业分布 */
import RoseMap from '../../components/roseMap/roseMap'
/*事故级别分布 */
import PieChart from '../../components/pieCharts/PieChart'
/* 大数据分析结果 */
import BigDataAnalysisResult from '../../components/modal/BigDataAnalysisResult';

/* 格式化参数 */
import { setParams } from '../../tool/tool.js';
let params = setParams();


/*
 * 事故智能分析
 * @author joseph_xin
 */
class IntelligentAnalysis extends React.Component {
	_tokens = [];

	constructor() {
		super();
		let me = this;
		me.state = {
			user:sessionStorage.getItem('loginData')? JSON.parse(sessionStorage.getItem('loginData')).data.organization.organizationLevel :"10086",
			tabIndex:0,
			title:'事故行业分布'
		}
		/* 事故时间趋势分析 */
		me.accidentTimeTrend = {
			width: "9rem",
			height: "2.2rem",
			left: "0.4rem",
			top: "6.5rem"
		};

		/* 事故天气分析 */
		me.accidentWeatherTrend = {
			width: "9rem",
			height: "2.2rem",
			left: "9.8rem",
			top: "6.5rem"
		};

		/*事故行业分布*/
		me.accidentType = {
			width: "4.5rem",
			height: "2.4rem",
			left: "14.30rem",
			top: "3.7rem"
		};

		/*事故区域分析*/
		me.accidentArea = {
			width: "4.5rem",
			height: "5.18rem",
			left: "0.4rem",
			top: "0.9rem"
		};

		/*事故级别分布*/
		me.accidentLevel = {
			width: "4.5rem",
			height: "2.4rem",
			left: "14.30rem",
			top: "0.9rem"
		};

		me._resize = me._windowResizeHandler.bind(this);
	}

	render() {
		let me = this;
		let tabIndex = me.state.tabIndex
		return(
			<div>
				<div className="tab"> 
					<span className={tabIndex === 0 ? 'active' : ''} onClick={me.tabActive.bind(this,0)}>事故类型分析</span>
					<span className={tabIndex === 1 ? 'active' : ''} onClick={me.tabActive.bind(this,1)}>事故行业分析</span>
				</div>
				<div className={'main-wrap'}>
			        <HashRouter ref={ref => {
			          me.hashRef = ref;
			        }} />
					{/* 增加一个选项啊无语*/}
					
			        {/* 查询 */}
			        <IntelligentAnalysisTimeSelect
			          style={{
			            top: '0.18rem',
			            left: '0.2rem',
			            width: '5.7rem',
			            height: '0.32rem'
			          }}
			          fontSize={'.14rem'}
			          selectColor={'#bfe9ff'}
			          onChange={me.timeChange.bind(this)}
			        />
							
					{/* 事故选择框 */}
			        <AccidentSelect searchAccident={me.searchAccident.bind(this)} ref="accidentSelectRef" />
			        
			        {/* 中心图 */}
			        <IntelligentAnalysisCenter ref={ref => {
			          me.intelligentAnalysisCenterChartRef = ref;
			        }} _click={me.centerChartClick.bind(this)} />
			
			        <Panel style={me.accidentArea} title={"事故区域分析"}>
			          <DivBar ref={'accidentArea'} name={'accident-area'} type={2} />
			        </Panel>
			
			        <Panel title={"事故级别分布"} style={me.accidentLevel}>
			        	<div className={'frame-style frame-size-ia'}>
			        		<PieChart ref="accidentLevel" name={'frame-size-ia'} width={430} height={250} keyworld={1} right={1} cssName={'ulColorTwo'} isScale={true}></PieChart>
			        	</div>
			        </Panel>
			        {/*title={"事故行业分布"}*/}
			        <Panel title={me.state.title}  style={me.accidentType}>
			          <RoseMap ref="accidentType" name={'frame-size-ia'} width={430} height={250} right={1} cssName={'ulColorTwo'}></RoseMap>
			        </Panel>
			        
			        <Panel style={me.accidentTimeTrend} title={"事故时间趋势分析"}>
			          <SelectTrend
			            changeData={me.accidentTimeTrendSelect.bind(this)}
			            selected={"月份"}
			            select={"时间"}
			          />
			          <Line width={'9.1rem'} height={'1.8rem'} xaxisName={"月份"} yaxisName={"( 起 )"} ref="accidentEventTrendRef" />
			        </Panel>
			
			        <Panel style={me.accidentWeatherTrend} title={"事故天气分析"}>
			          <SelectTrend
			            changeData={me.accidentWeatherTrendSelect.bind(this)}
			            selected={"气温"}
			            select={"状态"}
			          />
			          <Line width={'9.1rem'} height={'1.8rem'} xaxisName={"摄氏度"} yaxisName={"( 起 )"} ref="accidentWeatherTrendRef" />
			          <SingleBar width={'9.1rem'} height={'1.8rem'} ref="accidentWeather" />
			        </Panel>
			          
							{/*大数据分析结果*/}
					{
						(me.state.user == '3' || me.state.user == '10086') ?(
							<div className={'my-btn btn'} onClick={me.showDataRes.bind(this)} style={{
					          position: "absolute",
					          top: "0.68rem",
					          left: "5.4rem",
					          paddingLeft: '0.2rem'
					        }}>大数据分析报告
					        </div>
					        
						) : ('')
					}
					{
						(me.state.user == '3' || me.state.user == '10086') ?<BigDataAnalysisResult ref="BigDataAnalysisResultRef" /> : ""
					}
		      </div>
      	</div>
		)
	}

	showDataRes() {
		let me = this;
		let modal = me.refs.BigDataAnalysisResultRef;
		modal.open();
	}
	tabActive(index){
		let me = this
		console.log('index',index)
		let t = ''
		if(index !== me.state.tabIndex){
			if(index == 0){
				t = '事故行业分布'
			}else {
				t = '事故类型分布'
			}
			me.setState({
				tabIndex:index,
				title:t
			},()=>{
				//改变值不能直接获取 获取到的是上次的值  只能等回调后再获取
				me.componentDidMount();
    		})
		}
		//执行
	}
	
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	};

	/* 时间tab 默认值1 => 月 */
	indexTimeTrend = 1;

	/* 数据请求 */
	updateXHR(tempParams) {
		//console.log(tempParams);
		let me = this;
		
		/* 事故信息-中心图 */
		me._tokens.push(api.accidentOverview.send(tempParams).then(res => {
			if(window.debugging) console.log('事故信息-中心图', res);
			me.intelligentAnalysisCenterChartRef.setData(Object.assign({}, res.data[0]));
		}));
		
		/* 事故概况 事故中心图-周围的六个图 */
		me._tokens.push(api.accidentOverviewInformation.send(tempParams).then(res => {
			if(window.debugging) console.log('事故中心图-周围的六个图', res);
			let flag = me.state.tabIndex === 0 ? true : false
			if(res.data && res.data.length === 0) {
				me.intelligentAnalysisCenterChartRef.setInfoData([],flag);
				return
			}
			if(res.code === 9) {
				me.intelligentAnalysisCenterChartRef.setInfoData([],flag);
				return
			}
			res.data.forEach((s, i) => {
				if(s.maxName === s.minName) {
					s.minName = "--";
					s.minNum = "--";
					s.minScale = "--";
				}
				if(s.maxName == null){
					s.maxName = ''
				}
			});
			me.intelligentAnalysisCenterChartRef.setInfoData(res.data,flag);
		}));
		
		/* 事故区域分析 */
		me._tokens.push(api.accidentAreaAnalysis.send(tempParams).then(res => {
			if(window.debugging) console.log('事故区域分析', res);
			if(res && res.code === 200) {
				let arr = [],
					brr = [];
				res.data.map(s => {
					arr.push(s.name);
					brr.push(s.value)
				});
				let max = Math.max.apply(null, brr)
				let objs = {
					CityName: arr,
					seriesData: brr,
					arrData: [],
					unit: ' 起',
					gridLeft: '35%',
					gridTop: '7%',
					gridBottom: '0%',
					gridRight: '30%',
					widthNum: 106,
					seriesName: 1,
					types: 'item',
					num: max
				};
				me.refs.accidentArea._setData(res.data);
			}
		}));
		
		/* 事故级别分布 */
		me._tokens.push(api.accidentLevel.send(tempParams).then(res => {
			if(window.debugging) console.log('事故级别分布', res);
			let accidentLevel = {
				"series": [{
					name: '一般',
					value: 0,
					scale:0
				}, {
					name: '较大',
					value: 0,
					scale:0
				}, {
					name: '重大',
					value: 0,
					scale:0
				}, {
					name: '特别重大',
					value: 0,
					scale:0
				}],
				"legend": ['一般', '较大', '重大', '特别重大'],
				"colors": "true"
			};
			
			res.data.forEach((s, i) => {
				let temp = s.name.slice(0, -2);
				s.name = temp;
				let index = accidentLevel.legend.indexOf(temp);
				accidentLevel.series[index] = s;
			});
			//if (window.debugging) console.log(accidentLevel, accidentLevel.series[0]);
			me.refs.accidentLevel._setData(accidentLevel, true);
		}));
		
		/* 事故行业分布 */
		me._tokens.push(api.accidentIndustry.send(tempParams).then(res => {
			if(window.debugging) console.log('事故行业分布', res);
			let accidentIndustryData = {
				"series": [],
				"legend": [],
				"colors": "false"
			}
			accidentIndustryData.series = res.data.slice(0, 4);
			accidentIndustryData.legend = res.data.map(function(d) {
				return d.name
			});
			me.refs.accidentType._setData(accidentIndustryData, false);
		}))
		
		/* 事故时间趋势分析 */
		let temp = { ...tempParams
		};
		temp.type = me.indexTimeTrend;
		me._tokens.push(api.accidentEventTrend.send(temp).then(res => {
			if(window.debugging) console.log('事故时间趋势分析', res);
			//{let res={"code":200,"msg":"success","total":null,"data":[{"date":"01","value":107},{"date":"02","value":64},{"date":"03","value":109},{"date":"04","value":117},{"date":"05","value":80},{"date":"06","value":4}]}
			if (res.code==200) {
				res.data.forEach((item, i)=>{
					item.date=item.name;
					delete item.name;
				})
				//console.log(res.data);
				let data = me.lineDataDeal(res.data, me.indexTimeTrend);
				data.name = temp.accidentType;
				me.refs.accidentEventTrendRef._setData(data);
			}
		}));

		/* 事故天气分析-折线图 */
		me._tokens.push(api.accidentWeatherTrend.send(tempParams).then(res => {
			if(window.debugging) console.log('事故天气分析-气温', res);
			if (res.code==200){
				let data = me.lineDataDeal(res.data);
				data.axisname = "摄氏度";
				data.name = tempParams.accidentType;
				me.refs.accidentWeatherTrendRef._setData(data);
			}
		}));
		
		/* 事故天气分析-天气状态 */
		me._tokens.push(api.accidentWeatherTab.send(tempParams).then(res => {
			if(window.debugging) console.log('事故天气分析-天气状态', res);
			if (res.code==200){
				let Xdata = [],
					seriesData = []
				res.data.map(s => {
					Xdata.push(s.name)
					seriesData.push(s.value)
				})
				let accidentWeatherData = {
					Xdata: Xdata,
					seriesData: seriesData,
					switch: false,
					arage: false,
					seriesName: tempParams.accidentType
				}
				me.refs.accidentWeather._setData(accidentWeatherData)
			}
		}));
	}

	addColor(data, name) {
		let reg = new RegExp(`${name}`, "g");
		let res = data.replace(reg, `<span> ${name} </span>`);
		return res;
	}
	
	componentWillUnmount() {
		this._clearTokens();
		//取消root元素的高度
		//document.getElementById('root').style.height='';
	};
	
	componentDidMount() {
		let me = this;
		let tempParams = { ...params
		};
		
		//if (window.debugging) console.log(params, tempParams, me.obj);
		if(me.obj) {
			Object.assign(tempParams, me.obj)
		}

		let d = { ...tempParams
		};
		delete d.accidentType;
		delete d.departmentIndustry
		//console.log(d);
		console.log(me.state.tabIndex)
		if(me.state.tabIndex === 0){
			/* 事故选择框  类型*/
			me._tokens.push(api.accidentSelect.send(d).then(res => {
				if(window.debugging) console.log('事故选择框', res);
				if(res && res.code === 200) {
					me.refs.accidentSelectRef._setData(res.data);
					me.refs.accidentSelectRef._isSelect(0);
					tempParams.accidentType = res.data[0]; //赋值
					me.tempParams = tempParams;
					me.updateXHR(tempParams);
				}
			}));
		}else{
			/*事故选择框  行业*/
			me._tokens.push(api.accidentIndustrySelect.send(d).then(res => {
				if(window.debugging) console.log('事故选择框 类型', res);
				if(res && res.code === 200) {
					me.refs.accidentSelectRef._setData(res.data);
					me.refs.accidentSelectRef._isSelect(0);
					tempParams.departmentIndustry = res.data[0]; //赋值改名
					me.tempParams = tempParams;
					me.updateXHR(tempParams);
				}
			}));
		}
		window.addEventListener('resize', me._resize);
		
		//设置root元素的高度
		//document.getElementById('root').style.height='14rem';
	}

	_windowResizeHandler() {
		const me = this;
		const keys = Object.keys(me.refs);
		keys.map(t => {
			try {
				me.refs[t].resize();
			} catch(err) {

			}
		})
	}

	/* 中心图点击事件 */
	centerChartClick(name) {
		//跳转页面了
		let me = this;
		let history = me.hashRef.history;
		let storage = window.sessionStorage;
		storage.setItem('startDate', me.tempParams.startDate);
		storage.setItem('endDate', me.tempParams.endDate);
		storage.setItem('accidentType', me.tempParams.accidentType);
		storage.setItem('historyId', name);
		history.replace('/intelligent-analysis-item');
	}
	
	/* 事故时间趋势分析 */
	accidentTimeTrendSelect(name) {
		//console.log(name);//1, 2
		let me = this;
		me.typeName = name;
		if(name === 1) {
			let temp = { ...me.tempParams
			};
			me.indexTimeTrend = 1;
			temp.type = 1;
			me._tokens.push(api.accidentEventTrend.send(temp).then(res => {
				if(window.debugging) console.log('事故时间趋势分析-月份', res);
				//{let res={"code":200,"msg":"success","total":null,"data":[{"date":"01","value":107},{"date":"02","value":64},{"date":"03","value":109},{"date":"04","value":117},{"date":"05","value":80},{"date":"06","value":4}]}
				if (res.code==200) {
					res.data.forEach((item, i)=>{
						item.date=item.name;
						delete item.name;
					})
					let data = me.lineDataDeal(res.data, name);
					data.name = temp.accidentType;
					me.refs.accidentEventTrendRef._setData(data);
				}
			}));
		} else if(name === 2) {
			let temp = { ...me.tempParams
			};
			me.indexTimeTrend = 2;
			temp.type = 2;
			me._tokens.push(api.accidentEventTrend.send(temp).then(res => {
				if(window.debugging) console.log('事故时间趋势分析-时间', res);
				//{let res={"code":200,"msg":"success","total":null,"data":[{"date":"00","value":11},{"date":"01","value":2},{"date":"02","value":11},{"date":"03","value":6},{"date":"04","value":9},{"date":"05","value":23},{"date":"06","value":24},{"date":"07","value":37},{"date":"08","value":26},{"date":"09","value":21},{"date":"10","value":22},{"date":"11","value":23},{"date":"12","value":18},{"date":"13","value":31},{"date":"14","value":33},{"date":"15","value":23},{"date":"16","value":38},{"date":"17","value":21},{"date":"18","value":21},{"date":"19","value":24},{"date":"20","value":18},{"date":"21","value":22},{"date":"22","value":8},{"date":"23","value":6}]}
				if (res.code==200) {
					res.data.forEach((item, i)=>{
						item.date=item.name;
						delete item.name;
					})
					let data = me.lineDataDeal(res.data, name);
					data.name = temp.accidentType;
					me.refs.accidentEventTrendRef._setData(data);
				}
			}));
		}

	};

	/* 事故天气分析 */
	accidentWeatherTrendSelect(name) {
		let me = this;
		if(name === 1) {
			me.refs.accidentWeatherTrendRef._show();
			me.refs.accidentWeather._hide();
		}
		if(name === 2) {
			me.refs.accidentWeatherTrendRef._hide();
			me.refs.accidentWeather._show();
		}
	};

	/* 折线图数据处理 */
	lineDataDeal(data, name) {
		let arr = data;
		if(data.length > 12 && name === 1) {
			arr = data.slice(-12)
		}
		let dist = {
			axis: [],
			data: []
		};
		arr.forEach((s, i) => {
			dist.axis.push(s.date);
			dist.data.push(s.value);
		});
		if(name === 1) {
			dist.axisname = "月份";
		} else if(name === 2) {
			dist.axisname = "( 时 )";
		}
		return dist;
	};
	
	/* 时间查询 */
	timeChange(e) {
		let me = this;
		if(e.startDate === me.tempParams.startDate && e.endDate === me.tempParams.endDate) return;
		// Object.assign(params, e);
		me._clearTokens();
		me.obj = e;
		me.componentDidMount();
	};

	/* 事故选择框点击事件 */
	searchAccident(name) {
		let me = this;
		if(me.state.tabIndex === 0){
			if(name === me.tempParams.accidentType) return;
			Object.assign(me.tempParams, {
				accidentType: name
			});

			me._clearTokens();
			me.updateXHR(me.tempParams);
		}else{
			if(name === me.tempParams.departmentIndustry) return;
			Object.assign(me.tempParams, {
				departmentIndustry: name
			});

			me._clearTokens();
			me.updateXHR(me.tempParams);
		}
	};
}

export default IntelligentAnalysis;