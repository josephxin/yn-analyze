import React from 'react';
import './hubei-time-select.css';

import TimeSelect from './TimeSelect';
import Select from '../select/Select';

/* 格式化参数 */
import { setParams2} from '../../tool/tool.js';
let params = setParams2({
	industry: 'ALL'
});
/*
 * 事故总览时间组件
 * @author msh
 * */
class AccidentOverviewTimeSelect extends React.Component {
	constructor() {
		super();
		let me = this;
		me.state = params;
	}

	render() {
		let me = this;
		let props = me.props;
		return(
			<div className={'accident-overview-select-box'} style={props.style}>
        <div className={'accident-overview-select-text01'}>自定义时间：</div>
        <TimeSelect
          style={{
            left: '1rem'
          }}
          defaultDate={me.state.startDate}
          callBack={me.startDateClick.bind(this)}
        />
        <div className={'accident-overview-select-text02'}>-</div>
        <TimeSelect
          style={{
            left: '2.76rem'
          }}
          defaultDate={me.state.endDate}
          callBack={me.endDateClick.bind(this)}
        />
        <div className={'accident-overview-select-text03'}>行业：</div>
        <Select
          width={'1.5rem'}
          height={'0.32rem'}
          top={0}
          left={'5.6rem'}
          onSelectChange={me.industrySelectChange.bind(this)}
          ref={ref => {
            me.industrySelectRef = ref;
          }}
        />
        <div className={'select-query my-btn btn'} onClick={me.queryClick.bind(this)}>
        	<img src="./static/image/new/search.png" />
        	<span>查询</span>
        </div>
        <div className={'select-tip'} style={{
          width: '100%',
          backgroundColor: 'rgba(0,88,193,.8)',
          color: '#12ffff'
        }} ref={'selectTip'}>请选择正确的时间</div>
      </div>
		)
	}

	componentDidMount() {
		let me = this;
		let industryArr = [{
				label: '全部',
				value: 'ALL'
			},
			{
				label: '化工',
				value: '1101'
			},
			{
				label: '机械',
				value: '1102'
			},
			{
				label: '建材',
				value: '1103'
			},
			{
				label: '轻工',
				value: '1104'
			},
			{
				label: '冶金',
				value: '1105'
			},
			{
				label: '有色',
				value: '1106'
			},
			{
				label: '道路运输',
				value: '1107'
			},
			{
				label: '工商贸其他',
				value: '1108'
			},
			{
				label: '建筑施工',
				value: '1109'
			},
			{
				label: '金属非金属矿山',
				value: '1110'
			},
			{
				label: '煤矿',
				value: '1111'
			},
			{
				label: '民航飞行',
				value: '1112'
			},
			{
				label: '农业机械',
				value: '1113'
			},
			{
				label: '其他',
				value: '1114'
			},
			{
				label: '水上交通',
				value: '1115'
			},
			{
				label: '烟花爆竹',
				value: '1116'
			},
			{
				label: '渔业船舶',
				value: '1117'
			},
			{
				label: '纺织',
				value: '1118'
			},
			{
				label: '非生产性',
				value: '1119'
			},
			{
				label: '林业',
				value: '1120'
			},
			{
				label: '旅游',
				value: '1121'
			},
			{
				label: '贸易',
				value: '1122'
			},
			{
				label: '石化',
				value: '1123'
			},
			{
				label: '石油',
				value: '1124'
			},
			{
				label: '水利',
				value: '1125'
			},
			{
				label: '医药',
				value: '1126'
			},
			{
				label: '铁路交通',
				value: '1127'
			},
			{
				label: '烟草',
				value: '1128'
			},
			{
				label: '石油天然气',
				value: '1129'
			},
			{
				label: '建筑',
				value: '1130'
			},
			{
				label: '电力',
				value: '1131'
			},
			{
				label: '地质',
				value: '1132'
			},
			{
				label: '军工',
				value: '1133'
			}
		];
		me.industrySelectRef._setList(industryArr);
		let params = setParams2({
			industry: 'ALL'
		});
		me.setState({
			params
		})
	}

	startDateClick(n) {
		let me = this;
		let state = me.state;
		state.startDate = n;
	}

	endDateClick(n) {
		let me = this;
		let state = me.state;
		state.endDate = n;
	}

	industrySelectChange(e) {
		//console.log(e)
		let me = this;
		let state = me.state;
		state.industry = e;
	}

	queryClick() {
		let me = this;
		let callBack = me.props.onChange;
		let res = { ...me.state
		};
		res.startDate += '-01';
		let year = Number(res.endDate.slice(0, 4));
		let month = Number(res.endDate.slice(5, 7));
		res.endDate = new Date(year, month).toJSON().substring(0, 10);
		let selected = new Date(res.endDate) - new Date(res.startDate);

		if(selected < 0) {
			me.refs.selectTip.classList.add('active');
			setTimeout(() => {
				me.refs.selectTip.classList.remove('active');
			}, 1500);
			return
		}
		if(callBack && typeof callBack === 'function') {
			console.log(res)
			callBack(res);
		}
	}
}

export default AccidentOverviewTimeSelect;