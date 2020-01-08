/*
 * author  辛志强
 *
 * 回调函数里setState(display:"block")
 * */

import React, {
	Component
} from 'react';
/* css */
import { Select, Radio, Table, Icon, Modal, message } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { YNloading } from '../../tool/tool.js';

import * as api from '../../api/api-intelligent-analysis';
import './BigDataAnalysisResult.css';
import BigBar from '../bar/BigBar'
//console.log(jsPDF);
const Option = Select.Option;
const RadioGroup = Radio.Group;

/* 格式化参数 */
let setYearOptions = () => {
	let date = new Date();
	let year = date.getFullYear();
	let firstYear = 2000;
	let num = year - firstYear;
	//console.log(num);
	let arr = [];
	for(let i = 0; i <= num; i++) {
		arr[i] = firstYear + i;
	}
	return arr;
}
let yearOptions = setYearOptions();
//console.log(yearOptions);

let setArrow = function(flag, rate) {
	if(flag == 1) {
		return(
			<div>
				{rate + ' '}
				<Icon type="arrow-up" theme="outlined" style={{color: '#f83757'}} />
			</div>
		)
	} else if(flag == -1) {
		return(
			<div>
				{rate + ' '}
				<Icon type="arrow-down" theme="outlined" style={{color: '#4cbf86'}} />
			</div>
		)
	} else {
		return(
			<div>
				{rate}
			</div>
		)
	}
}

const districtColumns = [{
		title: '地区',
		dataIndex: 'areaName',
		key: 'areaName',
	},
	{
		title: '事故起数',
		dataIndex: 'accidentNum',
		key: 'accidentNum',
	},
	{
		title: '起数同比',
		dataIndex: 'basisAccidentNumRate',
		key: 'basisAccidentNumRate',
	},
	{
		title: '死亡人数',
		dataIndex: 'death',
		key: 'death',
	},
	{
		title: '人数同比',
		dataIndex: 'basisDeathRate',
		key: 'basisDeathRate',
	}
]

const monthAnalyzeColumns = [{
		title: '时间',
		dataIndex: 'type',
		key: 'type',
	},
	{
		title: '总计',
		children: [{
				title: '事故起数',
				dataIndex: 'number',
				key: 'number',
			},
			{
				title: '同比%',
				dataIndex: 'ctrate',
				key: 'ctrate',
				render: (text, record) => {
					//console.log(text, record);
					return setArrow(record.ctflag, record.ctrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'chrate',
				key: 'chrate',
				render: (text, record) => {
					return setArrow(record.chflag, record.chrate)
				},
			},
			{
				title: '死亡人数',
				dataIndex: 'death',
				key: 'death',
			},
			{
				title: '同比%',
				dataIndex: 'dtrate',
				key: 'dtrate',
				render: (text, record) => {
					return setArrow(record.dtflag, record.dtrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'dhrate',
				key: 'dhrate',
				render: (text, record) => {
					return setArrow(record.dhflag, record.dhrate)
				},
			},
		]
	},
	{
		title: '较大事故',
		children: [{
				title: '事故起数',
				dataIndex: 'jnumber',
				key: 'jnumber',
			},
			{
				title: '同比%',
				dataIndex: 'jctrate',
				key: 'jctrate',
				render: (text, record) => {
					return setArrow(record.jctflag, record.jctrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'jchrate',
				key: 'jchrate',
				render: (text, record) => {
					return setArrow(record.jchflag, record.jchrate)
				},
			},
			{
				title: '死亡人数',
				dataIndex: 'jdeath',
				key: 'jdeath',
			},
			{
				title: '同比%',
				dataIndex: 'jdtrate',
				key: 'jdtrate',
				render: (text, record) => {
					return setArrow(record.jdtflag, record.jdtrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'jdhrate',
				key: 'jdhrate',
				render: (text, record) => {
					return setArrow(record.jdhflag, record.jdhrate)
				},
			},
		]
	},
	{
		title: '重大事故',
		children: [{
				title: '事故起数',
				dataIndex: 'znumber',
				key: 'znumber',
			},
			{
				title: '同比%',
				dataIndex: 'zctrate',
				key: 'zctrate',
				render: (text, record) => {
					return setArrow(record.zctflag, record.zctrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'zchrate',
				key: 'zchrate',
				render: (text, record) => {
					return setArrow(record.zchflag, record.zchrate)
				},
			},
			{
				title: '死亡人数',
				dataIndex: 'zdeath',
				key: 'zdeath',
			},
			{
				title: '同比%',
				dataIndex: 'zdtrate',
				key: 'zdtrate',
				render: (text, record) => {
					return setArrow(record.zdtflag, record.zdtrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'zdhrate',
				key: 'zdhrate',
				render: (text, record) => {
					return setArrow(record.zdhflag, record.zdhrate)
				},
			},
		]
	},
	{
		title: '一般事故',
		children: [{
				title: '事故起数',
				dataIndex: 'cnumber',
				key: 'cnumber',
			},
			{
				title: '同比%',
				dataIndex: 'cctrate',
				key: 'cctrate',
				render: (text, record) => {
					return setArrow(record.cctflag, record.cctrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'cchrate',
				key: 'cchrate',
				render: (text, record) => {
					return setArrow(record.cchflag, record.cchrate)
				},
			},
			{
				title: '死亡人数',
				dataIndex: 'cdeath',
				key: 'cdeath',
			},
			{
				title: '同比%',
				dataIndex: 'cdtrate',
				key: 'cdtrate',
				render: (text, record) => {
					return setArrow(record.cdtflag, record.cdtrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'cdhrate',
				key: 'cdhrate',
				render: (text, record) => {
					return setArrow(record.cdhflag, record.cdhrate)
				},
			},
		]
	},
	{
		title: '特别重大事故',
		children: [{
				title: '事故起数',
				dataIndex: 'mnumber',
				key: 'mnumber',
			},
			{
				title: '同比%',
				dataIndex: 'mctrate',
				key: 'mctrate',
				render: (text, record) => {
					return setArrow(record.mctflag, record.mctrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'mchrate',
				key: 'mchrate',
				render: (text, record) => {
					return setArrow(record.mchflag, record.mchrate)
				},
			},
			{
				title: '死亡人数',
				dataIndex: 'mdeath',
				key: 'mdeath',
			},
			{
				title: '同比%',
				dataIndex: 'mdtrate',
				key: 'mdtrate',
				render: (text, record) => {
					return setArrow(record.mdtflag, record.mdtrate)
				},
			},
			{
				title: '环比%',
				dataIndex: 'mdhrate',
				key: 'mdhrate',
				render: (text, record) => {
					return setArrow(record.mdhflag, record.mdhrate)
				},
			},
		]
	}
]

const monthAnalyzeColumnsOne = monthAnalyzeColumns.slice(0, 3)
const monthAnalyzeColumnsTwo = monthAnalyzeColumns.slice(0, 1).concat(monthAnalyzeColumns.slice(3))
//console.log(monthAnalyzeColumnsOne, monthAnalyzeColumnsTwo);

class BigDataAnalysisResult extends Component {
	_tokens = [];
	currentYear = yearOptions[yearOptions.length - 1];
	dateObj = {
		startDate: this.currentYear + '-01-01',
		endDate: this.currentYear + '-06-30'
	};

	constructor() {
		super();
		this.state = {
			display: 'none',
			timeFrame: 1, //上半年为1，下半年为2
			visible: false, //选中导出格式对话框
			fileFormat: 'pdf', //文件格式
			reportTitle: '', //安全生产形势
			reportContent: [], //行业分析
			districtData: [], //地区分析数据
			districtDataIntro: [], //地区分析简述
			monthAnalyzeData: [], //月度分析数据
		}
	}

	_windowResizeHandler() {
		const me = this;
		//console.log(this, me.refs);
		const keys = Object.keys(me.refs);
		keys.map(t => {
			try {
				me.refs[t].resize();
			} catch(err) {

			}
		})
	}

	componentDidMount() {
		let me = this;
		me.updateXHR(this.dateObj);

		//window.addEventListener('resize', this._windowResizeHandler.bind(this));
	}

	componentWillUnmount() {
		this._clearTokens();
	};

	render() {
		let me = this;
		let boxStyle = Object.assign({
			zIndex: 800,
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			background: 'rgba(0,9,23,0.9)',
			overflow: 'hidden',
    		overflowY: 'auto',
		}, {
			display: me.state.display
		});

		return(
			<div className="analysis-result" style={boxStyle} onClick={this.close.bind(this)}>
        <div className="dialog">
        	<div className="dialog-title">
						<div className="base-info-tilte">大数据分析结果</div>
						<div className="trapezoid-big"></div>
						<div className="trapezoid-smll"></div>
						<hr className="dialog-title-line" />
						<div className="close-analysis-result">×</div>
					</div>
					
					<div className="panel2">
		        <span className="panel2-crow"></span>
		        <span className="panel2-crow"></span>
		        <div className="analysis-result-content">
		        	<header>
			        	<Select defaultValue={this.currentYear} style={{ width: 160, marginRight: 50, float: 'left' }} onChange={this.handleYear.bind(this)}>
			        		{
			        			yearOptions.map((t, i) => {
				        			return (
				        				<Option value={t} key={i}>{t} 年</Option>
				        			)
				        		})
			        		}
						    </Select>
		        		<RadioGroup style={{ lineHeight: '32px', float: 'left' }} onChange={this.handleTimeFrame.bind(this)} value={this.state.timeFrame}>
					        <Radio value={1}>上半年</Radio>
					        <Radio value={2}>下半年</Radio>
					      </RadioGroup>
					      <div className="query-btn my-btn btn fl" onClick={this.handleSelect.bind(this)}><img src="./static/image/new/search.png" /><span>查询</span></div>
					       {/*style={{display: 'none'}}*/}
					      <div className="query-btn my-btn btn fr" onClick={this.showModal.bind(this)}><img src="./static/image/new/export_report.png" /><span>导出报告</span></div>
					      <Modal
				          title="导出设置"
				          visible={this.state.visible}
				          onOk={this.confirmExport.bind(this)}
				          onCancel={this.cancelExport.bind(this)}
				          okText="确认"
          				cancelText="取消"
          				width="7rem"
				        >
				          <div className="export-format">
				          	<span className="fl">选择导出格式</span>
				          	<RadioGroup className="fl" onChange={this.selectFileFormat.bind(this)} value={this.state.fileFormat}>
							        <Radio value="pdf">pdf</Radio>
							        <Radio value="word">word</Radio>
							      </RadioGroup>
				          </div>
				        </Modal>
		        	</header>
		        	
		        	<div className="part-line"></div>
		        	
		        	<div id="main">
		        		<h2 className="production-safety-situation">安全生产形势 </h2>
	        			<p className="paragraph" dangerouslySetInnerHTML={{__html: me.state.reportTitle}}></p>
	        			
			        	<section>
			        		<h4 className="small-title"><img src="./static/image/new/item_symbol.png" /><span>行业分析</span></h4>
			        		<div className="text-content" id="industry-analyze">
			        			{
			        				me.state.reportContent.map((item, i)=>{
			        					return (
			        						<p className="paragraph" key={i} dangerouslySetInnerHTML={{__html: item}}></p>
			        					)
			        				})
			        			}
			        		</div>
			        	</section>
			        	
			        	<section>
			        		<h4 className="small-title"><img src="./static/image/new/item_symbol.png" /><span>地区分析</span></h4>
			        		<div className="text-content">
			        			<Table id="district-analyze-table" columns={districtColumns} dataSource={me.state.districtData} rowKey={record => record.areaName} pagination={false} locale={{'emptyText':'暂无数据'}}/>
			        			{
			        				me.state.districtDataIntro.map((item, i)=>{
			        					return (
			        						<p className="paragraph" key={i} dangerouslySetInnerHTML={{__html: item}}></p>
			        					)
			        				})
			        			}
			        		</div>
			        	</section>
			        	
			        	<section>
			        		<h4 className="small-title"><img src="./static/image/new/item_symbol.png" /><span>事故伤害类型</span></h4>
			        		<BigBar ref={"count"}></BigBar>
			        		<div style={{height: '0.45rem'}}></div>
			        		<BigBar ref={"death"}></BigBar>
			        	</section>
			        	
			        	<section>
			        		<h4 className="small-title"><img src="./static/image/new/item_symbol.png" /><span>月度分析</span></h4>
			        		<div className="text-content">
			        			<Table className="month-analyze-table table-width" id="table-month" columns={monthAnalyzeColumns} dataSource={me.state.monthAnalyzeData} rowKey={record => record.type} pagination={false} locale={{'emptyText':'暂无数据'}} />
			        			<Table className="month-analyze-table" id="table-month-one" columns={monthAnalyzeColumnsOne} dataSource={me.state.monthAnalyzeData}  rowKey={record => record.type} pagination={false} locale={{'emptyText':'暂无数据'}} />
			        			<Table className="month-analyze-table" id="table-month-two" columns={monthAnalyzeColumnsTwo} dataSource={me.state.monthAnalyzeData} rowKey={record => record.type} pagination={false} locale={{'emptyText':'暂无数据'}} />
			        		</div>
			        	</section>
		        	</div>
		        </div>
		      </div>
        </div>
      </div>
		)
	}

	open() {
		this.setState({
			display: 'block'
		})
		/*需要加定时器,等dom渲染完成*/
		setTimeout(() => {
			this.refs.count.resize()
			this.refs.death.resize()
		})
	}

	close(e) {
		//console.log(e, e.target,e.target.className);
		if(e.target.className == 'analysis-result' || e.target.className == 'close-analysis-result') {
			this.setState({
				display: 'none'
			});
		}
	}

	handleYear(value) {
		//console.log(value);
		this.currentYear = value;
	}

	/*选择上半年,下半年*/
	handleTimeFrame(e) {
		//console.log('radio checked', e.target.value);
		this.setState({
			timeFrame: e.target.value,
		});
	}

	/*查询*/
	handleSelect(e) {
		//console.log('handleSelect', this.currentYear, this.state.timeFrame);
		let timeFrame = this.state.timeFrame;

		if(timeFrame == 1) {
			this.dateObj.startDate = this.currentYear + '-01-01';
			this.dateObj.endDate = this.currentYear + '-06-30';
		} else if(timeFrame == 2) {
			this.dateObj.startDate = this.currentYear + '-07-01';
			this.dateObj.endDate = this.currentYear + '-12-31';
		}
		//console.log(this.dateObj);
		this.updateXHR(this.dateObj);
	}

	showModal() {
		this.setState({
			visible: true
		});

	}

	confirmExport() {
		this.setState({
			visible: false
		})

		let fileFormat = this.state.fileFormat
		if(fileFormat == 'pdf') {
			var dom = document.getElementById('main');
			var industryAnalyze = document.getElementById('industry-analyze');
			var districtAnalyzeTable = document.getElementById('district-analyze-table');
			var tableMonth = document.getElementById('table-month');
			var tableMonthOne = document.getElementById('table-month-one');
			var tableMonthTwo = document.getElementById('table-month-two');
			dom.style.background = "#204b90";
			industryAnalyze.style.maxHeight = "initial";
			districtAnalyzeTable.style.maxHeight = "initial";
			tableMonth.style.display = "none";
			tableMonthOne.style.display = "block";
			tableMonthTwo.style.display = "block";
			//显示loading
			YNloading.show()

			html2canvas(dom).then(canvas => {
				var contentWidth = canvas.width;
				var contentHeight = canvas.height;
				//console.log(contentWidth, contentHeight);
				//一页pdf显示html页面生成的canvas高度;
				var pageHeight = contentWidth / 592.28 * 841.89;
				//未生成pdf的html页面高度
				var leftHeight = contentHeight;
				//页面偏移
				var position = 0;
				//a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
				var imgWidth = 595.28;
				var imgHeight = 592.28 / contentWidth * contentHeight;

				var pageData = canvas.toDataURL('image/jpeg', 1.0);

				var pdf = new jsPDF('', 'pt', 'a4');
				//console.log(pdf);
				//有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
				//当内容未超过pdf一页显示的范围，无需分页
				if(leftHeight < pageHeight) {
					pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
				} else {
					while(leftHeight > 0) {
						pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
						leftHeight -= pageHeight;
						position -= 841.89;
						//避免添加空白页
						if(leftHeight > 0) {
							pdf.addPage();
						}
					}
				}

				pdf.save("大数据分析结果.pdf");
				dom.style.background = "";
				industryAnalyze.style.maxHeight = "";
				districtAnalyzeTable.style.maxHeight = "";
				tableMonth.style.display = "block";
				tableMonthOne.style.display = "none";
				tableMonthTwo.style.display = "none";
				message.success('导出成功!');
				YNloading.hide()
			})
		} else if(fileFormat == 'word') {
			//message.info('暂不支持导出为word格式!');
			
			window.open(window.BASEURL_01 + '/intelligent-analysis/exportBigDataWord?startDate=' + this.dateObj.startDate + '&endDate=' + this.dateObj.endDate);
		}
	}

	cancelExport() {
		this.setState({
			visible: false
		})
	}

	selectFileFormat(e) {
		this.setState({
			fileFormat: e.target.value,
		});
	}

	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	};

	/* 数据请求 */
	updateXHR(tempParams) {
		//console.log(tempParams);
		let me = this;

		/* 弹窗-安全生产形势 */
		me._tokens.push(api.bigDatazong.send(tempParams).then(res => {
			if(window.debugging) console.log('弹窗-安全生产形势', res);
			if(res.code == 200) {
				me.setState({
					reportTitle: res.data[0]
				})
			}
		}))

		/* 弹窗-行业分析 */
		me._tokens.push(api.bigDataIndustry.send(tempParams).then(res => {
			if(window.debugging) console.log('弹窗-行业分析', res);
			if(res.code == 200) {
				me.setState({
					reportContent: res.data
				})
			}
		}))

		/* 弹窗-地区分析表格 */
		me._tokens.push(api.districtAnalyze.send(tempParams).then(res => {
			if(window.debugging) console.log('弹窗-地区分析表格', res);
			if(res.code == 200) {
				let districtData = JSON.parse(JSON.stringify(res.data));
				/*districtData.map((item, i) => {
					if(item.basisAccidentNumFlag == -1 && item.basisAccidentNumRate != 0) {
						item.basisAccidentNumRate = '-' + item.basisAccidentNumRate;
					} else if(item.basisAccidentNumFlag == 0 && item.basisAccidentNumRate == 100) {
						item.basisAccidentNumRate = 0;
					}
					if(item.basisDeathFlag == -1 && item.basisDeathRate != 0) {
						item.basisDeathRate = '-' + item.basisDeathRate;
					} else if(item.basisDeathFlag == 0 && item.basisDeathRate == 100) {
						item.basisDeathRate = 0;
					}
				})*/
				me.setState({
					districtData: districtData
				})
			}
		}));

		/* 弹窗-地区分析简述 */
		me._tokens.push(api.districtAnalyzeIntro.send(tempParams).then(res => {
			if(window.debugging) console.log('弹窗-地区分析简述', res);
			if(res.code == 200) {
				me.setState({
					districtDataIntro: res.data
				})
			}
		}));

		/* 弹窗-事故伤害类型*/
		me._tokens.push(api.bigDataAccidentType.send(tempParams).then(res => {
			if(window.debugging) console.log('弹窗-事故伤害类型', res);
			if(res.code == 200) {
				let countNumber = []; //起数
				let deathNumber = []; //死亡
				let Xdata = []; //x 轴
				let hurtData = JSON.parse(JSON.stringify(res.data));
				hurtData.map((item, i) => {
					if(item.number > 0) {
						countNumber.push(item.number)
						deathNumber.push(item.death)
						Xdata.push(item.type)
					}
				})
				let countObj = {
					Xdata: Xdata,
					countNumber: countNumber,
					title: '伤害类型起数(工矿商贸事故)',
				}

				let deathObj = {
					Xdata: Xdata,
					countNumber: deathNumber,
					title: '伤害类型死亡人数(工矿商贸事故)',
				}
				//console.log(me.refs.count)
				me.refs.count._setData(countObj)
				me.refs.death._setData(deathObj)
			}
		}));

		/* 弹窗-月度分析 */
		me._tokens.push(api.monthAnalyze.send(tempParams).then(res => {
			if(window.debugging) console.log('弹窗-月度分析', res);
			if(res.code == 200) {
				me.setState({
					monthAnalyzeData:res.data
				})
			}
		}));
	}
}

export default BigDataAnalysisResult;