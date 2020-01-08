import React from 'react';
import './hot-word-module.css';
import * as api from '../../api/api-association-analysis';
/* 词云 */
import WordCloud from '../../components/word-cloud/WordCloud';
import TimeSelect from '../../components/hubei-time-select/IntelligentAnalysisTimeSelect';

/* 格式化参数 */
import {setParams} from '../../tool/tool.js';

class HotWordModule extends React.Component {
	params = setParams();

	constructor() {
		super();
	}

	render() {
		let me = this;
		let scale = window._scaler;
		//let sizeRange = 35*scale < 14 ? 14 : 35*scale
		//let gridSize = 34 * window._scaler;
		let gridSize = 24* window._scaler;
		return (
			<div className={'hot-word-module frame-style'}>
				<TimeSelect
					style={{
						top: '.6rem',
						left: '0',
						width: '5.7rem',
						height: '.32rem'
					}}
					fontSize={'.14rem'}
					selectColor={'#bfe9ff'}
					onChange={me.timeChange.bind(this)}
				/>
				<WordCloud
					ref={ref => {
						me.wordCloudRef = ref;
					}}
					top={'1rem'}
					left={0}
					width={'6rem'}
					height={'2.7rem'}
					sizeRange={[20*scale,35*scale]}
					gridSize={gridSize}
					_chartClick={me.wordCloudClick.bind(this)}
				/>
			</div>
		)
	}

	/* 事件选择事件 */
	timeChange(obj) {
		let me = this;
		//console.log('aaaaa',me.params,obj)
		me.params = Object.assign(me.params, obj);
		//查询是需要清除下标不然点击后再查询会有多个白色
		delete me.params.index;
		me.componentDidUpdate();
		// me.callback();
	}

	/* 词云点击事件 */
	wordCloudClick(obj) {
		let me = this;
		let word = obj.data.name;
		let index = obj.dataIndex;
		me.params = Object.assign(me.params, {
			word,
			index
		});
		me.callback()
	}

	/*
	 * 随机生成汉字
	 * 用正则好很多 但是不会 - -...
	 * */
	randomUniCode() {
		let me = this;
		let data = [];
		const total = 10;
		for (let i = 0; i < total; i++) {
			let size = Math.round(2 + Math.random() * 2);
			let name = unescape(me.getName(size).replace(/\\u/g, '%u'));
			data.push({
				name,
				value: Math.random() * 1000
			})
		}

		return data;
	}

	getName(size) {
		let codes = '\\u4E00\\u4E59\\u4E8C\\u5341\\u4E01\\u5382\\u4E03\\u535C\\u4EBA\\u5165\\u516B\\u4E5D\\u51E0\\u513F\\u4E86\\u529B\\u4E43\\u5200\\u53C8\\u4E09\\u4E8E\\u5E72\\u4E8F\\u58EB\\u5DE5\\u571F\\u624D\\u5BF8\\u4E0B\\u5927\\u4E08\\u4E0E\\u4E07\\u4E0A\\u5C0F\\u53E3\\u5DFE\\u5C71\\u5343\\u4E5E\\u5DDD\\u4EBF\\u4E2A\\u52FA\\u4E45\\u51E1\\u53CA\\u5915\\u4E38\\u4E48\\u5E7F\\u4EA1\\u95E8\\u4E49\\u4E4B\\u5C38\\u5F13\\u5DF1\\u5DF2\\u5B50\\u536B\\u4E5F\\u5973\\u98DE\\u5203\\u4E60\\u53C9\\u9A6C\\u4E61\\u4E30\\u738B\\u4E95\\u5F00\\u592B\\u5929\\u65E0\\u5143\\u4E13\\u4E91\\u624E\\u827A\\u6728\\u4E94\\u652F\\u5385\\u4E0D\\u592A\\u72AC\\u533A\\u5386\\u5C24\\u53CB\\u5339\\u8F66\\u5DE8\\u7259\\u5C6F\\u6BD4\\u4E92\\u5207\\u74E6\\u6B62\\u5C11\\u65E5\\u4E2D\\u5188\\u8D1D\\u5185\\u6C34\\u89C1\\u5348\\u725B\\u624B\\u6BDB\\u6C14\\u5347\\u957F\\u4EC1\\u4EC0\\u7247\\u4EC6\\u5316\\u4EC7\\u5E01\\u4ECD\\u4EC5\\u65A4\\u722A\\u53CD\\u4ECB\\u7236\\u4ECE\\u4ECA\\u51F6\\u5206\\u4E4F\\u516C\\u4ED3\\u6708\\u6C0F\\u52FF\\u6B20\\u98CE\\u4E39\\u5300\\u4E4C\\u51E4\\u52FE\\u6587\\u516D\\u65B9\\u706B\\u4E3A\\u6597\\u5FC6\\u8BA2\\u8BA1\\u6237\\u8BA4\\u5FC3\\u5C3A\\u5F15\\u4E11\\u5DF4\\u5B54\\u961F\\u529E\\u4EE5\\u5141\\u4E88\\u529D\\u53CC\\u4E66\\u5E7B\\u7389\\u520A\\u793A\\u672B\\u672A\\u51FB\\u6253\\u5DE7\\u6B63\\u6251\\u6252\\u529F\\u6254\\u53BB\\u7518\\u4E16\\u53E4\\u8282\\u672C\\u672F\\u53EF\\u4E19\\u5DE6\\u5389\\u53F3\\u77F3\\u5E03\\u9F99\\u5E73\\u706D\\u8F67\\u4E1C\\u5361\\u5317\\u5360\\u4E1A\\u65E7\\u5E05\\u5F52\\u4E14\\u65E6\\u76EE\\u53F6\\u7532\\u7533\\u53EE\\u7535\\u53F7\\u7530\\u7531\\u53F2\\u53EA\\u592E\\u5144\\u53FC\\u53EB\\u53E6\\u53E8\\u53F9\\u56DB\\u751F\\u5931\\u79BE\\u4E18\\u4ED8\\u4ED7\\u4EE3\\u4ED9\\u4EEC\\u4EEA\\u767D\\u4ED4\\u4ED6\\u65A5\\u74DC\\u4E4E\\u4E1B\\u4EE4\\u7528\\u7529\\u5370\\u4E50\\u53E5\\u5306\\u518C\\u72AF\\u5916\\u5904\\u51AC\\u9E1F\\u52A1\\u5305\\u9965\\u4E3B\\u5E02\\u7ACB\\u95EA\\u5170\\u534A\\u6C41\\u6C47\\u5934\\u6C49\\u5B81\\u7A74\\u5B83\\u8BA8\\u5199\\u8BA9\\u793C\\u8BAD\\u5FC5\\u8BAE\\u8BAF\\u8BB0\\u6C38\\u53F8\\u5C3C\\u6C11\\u51FA\\u8FBD\\u5976\\u5974\\u52A0\\u53EC\\u76AE\\u8FB9\\u53D1\\u5B55\\u5723\\u5BF9\\u53F0\\u77DB\\u7EA0\\u6BCD\\u5E7C\\u4E1D\\u5F0F\\u5211\\u52A8\\u625B\\u5BFA\\u5409\\u6263\\u8003\\u6258\\u8001\\u6267\\u5DE9\\u573E\\u6269\\u626B\\u5730\\u626C\\u573A\\u8033\\u5171\\u8292\\u4E9A\\u829D\\u673D\\u6734\\u673A\\u6743\\u8FC7\\u81E3\\u518D\\u534F\\u897F\\u538B\\u538C\\u5728\\u6709\\u767E\\u5B58\\u800C\\u9875\\u5320\\u5938\\u593A\\u7070\\u8FBE\\u5217\\u6B7B\\u6210\\u5939\\u8F68\\u90AA\\u5212\\u8FC8\\u6BD5\\u81F3\\u6B64\\u8D1E\\u5E08\\u5C18\\u5C16\\u52A3\\u5149\\u5F53\\u65E9\\u5410\\u5413\\u866B\\u66F2\\u56E2\\u540C\\u540A\\u5403\\u56E0\\u5438\\u5417\\u5C7F\\u5E06\\u5C81\\u56DE\\u5C82\\u521A\\u5219\\u8089\\u7F51\\u5E74\\u6731\\u5148\\u4E22\\u820C\\u7AF9\\u8FC1\\u4E54\\u4F1F\\u4F20\\u4E52\\u4E53\\u4F11\\u4F0D\\u4F0F\\u4F18\\u4F10\\u5EF6'.split('\\u');
		codes.shift();
		let len = codes.length;

		let name = '';
		let n = Number(size) || 2;
		for (let i = 0; i < n; i++) {
			let index = Math.round(Math.random() * len);
			name += `\\u${codes[index]}`;
		}

		return name;
	}

	callback() {
		let me = this;
		let callBack = me.props.callback;
		if (callBack && typeof callBack === 'function') {
			callBack(me.params);
		}
	}

	_token = [];

	_clearTokens() {
		this._token.map(token => token.cancel());
		this._token = [];
	}

	componentDidMount() {
		this.componentDidUpdate();
	}
	paramsTitle = {}
	componentDidUpdate() {
		let me = this;
		let scale = window._scaler;
		let params = {
			...me.params
		};
		//console.log('------->>>>',params)
		delete params.name;
		if(
			me.paramsTitle.endDate !== params.endDate || 
		    me.paramsTitle.startDate !== params.startDate
		){
			me._clearTokens();
			Object.assign(me.paramsTitle,params)
			
			me._token.push(api.wordCloud.send(params).then(res => {
				//console.log('词云',res,params)
				/*if(res.data && res.data.length === 0) {
					return
				}*/
				const _data = res.data.slice(0, 20);
				let data = _data.sort((a, b) => {
					return b.value - a.value;
				});
				if (data.length) {
					let max = data[0].value;
					let min = data[data.length - 1].value;
					data.forEach((s, i) => {
						let k = (s.value - min) / (max - min);
						if (i === 0) {
							Object.assign(s, {
								textStyle: {
									normal: {
										fontSize: 40 * scale,
										color: '#fff',
										shadowBlur: 5,
										shadowColor: '#fff'
									},
									emphasis: {
										fontSize: 40* scale,
										color: '#fff',
										shadowBlur: 5,
										shadowColor: '#fff'
									}
								}
							});
						} else {
							Object.assign(s, {
								textStyle: {
									normal: {
										fontSize: (30 + 10 * k)* scale,
										shadowBlur: 5,
										shadowColor: '#fff'
									},
									emphasis: {
										fontSize: (30 + 10 * k)* scale,
										shadowBlur: 5,
										shadowColor: '#fff'
									}
								}
							});
						}
					});
				}
				let word = data[0] ? data[0].name || '' : '';
				me.params.word = word;
				me.wordCloudRef.setData(data);
				me.callback();
			}));
		}
	}

	componentWillUnmount() {
		this._clearTokens();
	}
}

export default HotWordModule;