import React from 'react';
import * as api from '../../api/api-accident-overview';
/* css */
import './accident-overview.css';
/* components */
import Panel from '../../components/panel/Panel';
import Modal from '../../components/modal/Modal';
/* 中上部-整体情况 */
import OverallSituation from '../../components/overall-situation/OverallSituation';
/*事故级别分布 */
import PieChart from '../../components/pieCharts/PieChart'
/* 事故区域分布 */
import DivBar from '../../components/bar/DivBar';
/** 事故行业分布*/
// import IndustryAnalysis from '../../components/bar/industryAnalysis'
/* 事故同比 */
import DoubleBar from '../../components/bar/DoubleBar'
/* 时间组件 */
import AccidentOverviewTimeSelect from '../../components/hubei-time-select/AccidentOverviewTimeSelect';
/*事故类型分布 */
import RoseMap from '../../components/roseMap/roseMap';
/**事故级分布别同比 */
import DistributionChart from '../../components/water/distributionChart'
/* 弹框title */
import TimeAndTotal from '../../components/modal/TimeAndTotal';

/* 格式化参数 */
import { setParams } from '../../tool/tool.js';
let params = setParams({
	industry: 'ALL'
});
/*
 * 事故总览
 * @author joseph_xin
 */
class AccidentOverview extends React.Component {
	constructor(props) {
		super(props);
		let me = this;
		me.state = {};
		me._tokens = [];

		/* 事故区域分布 */
		me.accidentOverview = {
			width: '4.5rem',
			height: '3.8rem',
			left: '0.4rem',
			top: '0.4rem'
		};

		/* 事故级别分布 */
		me.accidentLevel = {
			width: '4.5rem',
			height: '3.8rem',
			left: '14.26rem',
			top: '0.4rem'
		};

		/* 事故行业分布 */
		me.industry = {
			width: '4.5rem',
			height: '3.8rem',
			left: '14.26rem',
			top: '4.8rem'
		};

		/* 事故类型分布 */
		me.accidentType = {
			width: '4.5rem',
			height: '3.8rem',
			left: '0.4rem',
			top: '4.8rem'
		};

		/* 事故同比 */
		me.accidentCompared = {
			width: '9rem',
			height: '3.8rem',
			left: '5.1rem',
			top: '4.8rem'
		};

		me._resize = me._windowResizeHandler.bind(this);
	};

	_click(name, e) {
		let me = this;
		let modal = me.refs.modalRef;
		modal.open();
	}

	_clicks(name, e) {
		let me = this;
		let modals = me.refs.modalRefs;
		modals.open();
	}

	/* 中心图组件的ref */
	overallSituationRef = undefined;

	render() {
		let me = this;
		return(
			<div className={'main-wrap'}>
        <Panel title={"事故区域分布"} style={me.accidentOverview}>
          <div className={'atAll'} onClick={me._click.bind(this)}>全部</div>
          <DivBar ref={'accidentOverviews'}/>
        </Panel>

        <Panel title={"事故行业分布"} style={me.industry}>
          <div className={'atAll'} onClick={me._clicks.bind(this)}>全部</div>
          <DivBar ref={'industry'} />
        </Panel>

        <Modal content={"事故区域分布"} width={"7.5rem"} height={"6.7rem"} marginTop={'0rem'}  ref="modalRef">
          <div className="accidentNumber">
            <DivBar ref={'dialogsAtall'} name={'frame-size'} />
            <TimeAndTotal ref={'accidentAreaModalTitleRef'} />
          </div>
        </Modal>

        <Modal content={"事故行业分布"} width={"7.5rem"} height={"6.7rem"} ref="modalRefs">
          <DivBar ref={'dialogsAtalls'} name={'frame-size'} />
          <TimeAndTotal ref={'accidentIndustryModalTitleRef'} />
        </Modal>

        <Modal content={"事故类型分布"} width={"7.5rem"} height={"6.7rem"} ref="accidentTypeModalRef">
          <DivBar ref={'divBarRef'} name={'frame-size'} />
          <TimeAndTotal ref={'accidentTypeModalTitleRef'} />
        </Modal>

        <Panel title={"事故类型分布"} style={me.accidentType}>
          <div className={'atAll'} onClick={me._accidentTypeClick.bind(this)}>全部</div>
          <RoseMap ref="accidentType" width={446} height={328} cssName={'ulColor'}></RoseMap>
        </Panel>

        <Panel title={"事故级别分布"} style={me.accidentLevel}>
          <div className={'distribution active'} onClick={me._switchoverChart.bind(this, 'withRateChart')} ref="distributionRef">
          	分布
          </div>
          <div className={'withRate'} onClick={me._switchoverChart.bind(this, 'distributionChart')} ref="withRateRef">
            同比
          </div>
          <div className={'frame-style'} ref="withRateChart">
            <PieChart ref="accidentLevel" width={446} height={328} type={1} keyworld={1} cssName={'ulColor'}></PieChart>
          </div>
          <div className={'frame-style'} ref="distributionChart" style={{ display: 'none' }}>
            <DistributionChart ref="distribution"></DistributionChart>
          </div>
        </Panel>

        {/* 中上部-整体情况 */}
        <OverallSituation width={'9rem'} height={'3.46rem'} top={'0.74rem'} ref={ref => {
          me.overallSituationRef = ref;
        }} />

        {/* 查询 */}
        <AccidentOverviewTimeSelect
          style={{
            top: '0.24rem',
            width: '8.74rem',
            height: '0.32rem'
          }}
          fontSize={'0.14rem'}
          selectColor={'#bfe9ff'}
          onChange={me.timeChange.bind(this)}
        />
        
        <Panel title={"事故同比"} style={me.accidentCompared}>
          <DoubleBar width={'7.58rem'} height={'2.29rem'} left={'0.49rem'} top={'1.71rem'} ref={"accidentCompared"} />
        </Panel>
      </div>
		)
	}

	/*
	 * 查询按钮
	 * @params {obj} => {startDate} 起始时间, {endDate} 结束时间, {industry} 行业
	 * */
	timeChange(obj) {
		let me = this;
		me._clearTokens();
		// Object.assign(params, obj);
		me.obj = obj;
		me.componentDidMount();
	}

	/* 事故类型分布 - 全部按钮 */
	_accidentTypeClick() {
		this.refs.accidentTypeModalRef.open();
	}

	/* 事故级别分布 - 切换 */
	_switchoverChart(chartsName) {
		if(chartsName === 'withRateChart') {
			this.refs.withRateChart.style.display = 'block';
			this.refs.distributionChart.style.display = 'none';
			this.refs.distributionRef.className = 'distribution active';
			this.refs.withRateRef.className = 'withRate';
		} else {
			this.refs.distributionChart.style.display = 'block';
			this.refs.withRateChart.style.display = 'none';
			this.refs.distributionRef.className = 'distribution';
			this.refs.withRateRef.className = 'withRate active';
		}
	}

	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	};

	componentDidMount() {
		let me = this;
		//不要改变params,每次切换页面时间框会初始化而params不会   params
		let tempParams = { ...params
		};
		if(me.obj) {
			Object.assign(tempParams, me.obj)
		}
		let accidentIndustryAnalysisParams = { ...params
		};
		delete accidentIndustryAnalysisParams.industry;

		/**事故级别分布同比 */
		me._tokens.push(api.distribution.send(tempParams).then(res => {
			if (window.debugging) console.log('事故级别分布同比', res);
			let test = {
				startDate: tempParams.startDate,
				endDate: tempParams.endDate,
				data: res.data.map(function(d, i) {
					let colors = '';
					if(d.rateType === "同比下降") {
						colors = "#00aeff"
					} else {
						colors = "#ff9700"
					}
					return {
						thisValue: d.thisValue,
						ThisName: d.ThisName,
						rate: d.rate,
						color: colors,
						lastValue: d.lastValue,
						rateType: d.rateType,
						lastName: d.lastName,
						lastStartDate: d.lastStartDate,
						lastEndDate: d.lastEndDate
					};
				})
			};
			me.refs.distribution.setData(test)
		}));

		/* 事故区域分布 */
		me._tokens.push(api.accidentAreaAnalysisDialogs.send(tempParams).then(res => {
			if (window.debugging) console.log('事故区域分布', res);
			if(!res.data) {
				return
			}
			let resData = res.data.slice(0, 8)
			let cityName = [],
				CityNum = [],
				cityRate = [];
			resData.map(s => {
				cityName.push(s.name);
				CityNum.push(s.value);
				cityRate.push(s.rate);
			});
			let objs = {
				CityName: cityName,
				Ydata: CityNum,
				seriesData: cityRate,
				labelOffset: 20,
				unit: '%',
				seriesName: 0,
				unitName: 0,
				gridRight: '16%',
			};
			me.refs.accidentOverviews._setData(resData);
		}));

		/* 事故行业分布 accidentIndustryAnalysisParams*/
		me._tokens.push(api.accidentIndustryAnalysisDialogs.send(tempParams).then(res => {
			if (window.debugging) console.log('事故行业分布', res);
			let me = this;
			let resData = res.data.slice(0, 8)
			let cityNames = [],
				CityNums = [],
				cityRates = [];
			resData.map(s => {
				cityNames.push(s.name);
				CityNums.push(s.value);
				cityRates.push(s.rate);
			});
			let objData = {
				CityName: cityNames,
				Ydata: CityNums,
				seriesData: cityRates,
				labelOffset: 20,
				unit: '%',
				seriesName: 0,
				unitName: 0,
				types: 'item'
			};

			me.refs.industry._setData(resData);
		}));

		/* 事故区域分布 - 弹框 */
		me._tokens.push(api.accidentAreaAnalysisDialogs.send(tempParams).then(res => {
			if (window.debugging) console.log('事故区域分布 - 弹框', res);
			let cityNameDialog = [],
				CityNumDialog = [],
				cityRateDialog = [];
			res.data.map(s => {
				cityNameDialog.push(s.name);
				CityNumDialog.push(s.value);
				cityRateDialog.push(s.rate);
			});
			let objDatas = {
				CityName: cityNameDialog,
				Ydata: CityNumDialog,
				seriesData: cityRateDialog,
				labelOffset: -8,
				positionOffset: -165,
				gridLeft: '25%',
				gridTop: '4%',
				gridBottom: '2%',
				gridRight: '10%',
				widthNum: 100,
				unit: '%',
				seriesName: 1,
				unitName: 0
			};
			me.refs.accidentAreaModalTitleRef.setState({
				totals: res.total,
				startDate: tempParams.startDate,
				endDate: tempParams.endDate,
			})
			me.refs.dialogsAtall._setData(res.data);
		}));

		/* 事故行业分布 - 弹框 */
		me._tokens.push(api.accidentIndustryAnalysisDialogs.send(tempParams).then(res => {
			if (window.debugging) console.log('事故行业分布 - 弹框', res);
			let cityNamesDialogs = [],
				CityNumsDialogs = [],
				cityRatesDialogs = [];
			res.data.sort(function(a, b) {
				return b.rate - a.rate;
			});
			res.data.map(s => {
				cityNamesDialogs.push(s.name);
				CityNumsDialogs.push(s.value);
				cityRatesDialogs.push(s.rate);
			});
			let objDataDialogs = {
				CityName: cityNamesDialogs,
				Ydata: CityNumsDialogs,
				seriesData: cityRatesDialogs,
				positionOffset: 400,
				labelOffset: -8,
				positionOffset: -165,
				gridLeft: '27%',
				gridTop: '4%',
				gridBottom: '3%',
				gridRight: '10%',
				widthNum: 100,
				unit: '%',
				seriesName: 1,
				unitName: 0,
				types: 'item'
			};
			me.refs.accidentIndustryModalTitleRef.setState({
				totals: res.total,
				startDate: tempParams.startDate,
				endDate: tempParams.endDate
			})
			me.refs.dialogsAtalls._setData(res.data);
		}));

		/* 事故同比 */
		me._tokens.push(api.onYearBasie.send(tempParams).then(res => {
			if (window.debugging) console.log('事故同比', res);
			let Xdata = [],
				seriesData1 = [],
				seriesData2 = [],
				ratioNum = [],
				type = [];
			res.data.map(s => {
				Xdata.push(s.name);
				seriesData1.push(Math.round(s.newVale));
				seriesData2.push(Math.round(s.oldValue));
				ratioNum.push(s.rate);
				type.push(s.type)
			});
			let objYearData = {
				Xdata: Xdata,
				seriesData1: seriesData1,
				seriesData2: seriesData2,
				ratioNum: ratioNum,
				type: type,
				startData: tempParams.startDate,
				endData: tempParams.endDate,
			};
			//console.log(objYearData);
			me.refs.accidentCompared._setData(objYearData)
		}));

		/* 事故类型分布 */
		me._tokens.push(api.accidentTypeData.send(tempParams).then(res => {
			if (window.debugging) console.log('事故类型分布', res);
			let accidentTypeData = {
				"series": [],
				"legend": []
			};
			accidentTypeData.series = res.data.slice(0, 4)
			accidentTypeData.legend = res.data.map(function(d) {
				return d.name
			});
			me.refs.accidentType._setData(accidentTypeData);
			/* 事故类型分布  弹窗*/
			let cityNamesDialogs = [],
				CityNumsDialogs = [],
				cityRatesDialogs = [];
			res.data.sort(function(a, b) {
				return b.rate - a.rate;
			});
			res.data.map(s => {
				cityNamesDialogs.push(s.name);
				CityNumsDialogs.push(s.value);
				cityRatesDialogs.push(s.rate);
			});
			let objDataDialogs = {
				CityName: cityNamesDialogs,
				Ydata: CityNumsDialogs,
				seriesData: cityRatesDialogs,
				positionOffset: 400,
				labelOffset: -8,
				positionOffset: -165,
				gridLeft: '27%',
				gridTop: '4%',
				gridBottom: '2%',
				gridRight: '10%',
				widthNum: 100,
				unit: '%',
				seriesName: 1,
				unitName: 0
			};
			me.refs.accidentTypeModalTitleRef.setState({
				totals: res.total,
				startDate: tempParams.startDate,
				endDate: tempParams.endDate
			})
			me.refs.divBarRef._setData(res.data);
		}));

		/* 事故级别分布 */
		me._tokens.push(api.accidentLevel.send(tempParams).then(res => {
			if (window.debugging) console.log('事故级别分布', res)
			let accidentLevel = {
				"series": [],
				"legend": ['一般', '较大', '重大', '特别重大'],
				"colors": "true"
			};
			res.data.forEach((s, i) => {
				let temp = s.name.slice(0, -2);
				s.name = temp;
				let index = accidentLevel.legend.indexOf(temp);
				accidentLevel.series[index] = s;
			});

			me.refs.accidentLevel._setData(accidentLevel, true);
		}));

		/* 中心 */
		me._tokens.push(api.overviewData.send(tempParams).then(res => {
			if (window.debugging) console.log('中心区域数据', res);
			me.overallSituationRef.upDate(res.data);
		}));

		window.addEventListener('resize', me._resize);
	};

	_windowResizeHandler() {
		const me = this;
		const keys = Object.keys(me.refs);
		//console.log(me, me.refs);//组件卸载之后值为{}
		keys.map(t => {
			// console.log(t);
			try {
				me.refs[t].resize();
			} catch(err) {

			}
		})
	}

	componentWillUnmount() {
		this._clearTokens();
	};
}

export default AccidentOverview;