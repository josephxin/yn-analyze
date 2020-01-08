import React from 'react';
import ReactDOM from 'react-dom';
import {Spin, Icon} from 'antd';

/* 加载中指示器 */
const antIcon = <Icon type="loading" spin/>;

const YNloading = {
	loadingCount: 0,
	show() {
		if (this.loadingCount <= 0) {
			ReactDOM.render(
				<Spin size="large" indicator={antIcon} tip="数据加载中……"/>,
				document.getElementById("loading-wrap")
			);
		}
		this.loadingCount++;
	},
	hide() {
		if (this.loadingCount <= 0) return;
		this.loadingCount--;
		if (this.loadingCount === 0) {
			ReactDOM.unmountComponentAtNode(document.getElementById("loading-wrap"));
		}
	},
};

const YNloading2 = {
	loadingCount: 0,
	show() {
		if (this.loadingCount <= 0) {
			ReactDOM.render(
				<Spin size="large" indicator={antIcon} tip="系统验证中……"/>,
				document.getElementById("loading")
			);
		}
		this.loadingCount++;
	},
	hide() {
		if (this.loadingCount <= 0) return;
		this.loadingCount--;
		if (this.loadingCount === 0) {
			ReactDOM.unmountComponentAtNode(document.getElementById("loading"));
		}
	},
};

const cloneFn = function (obj) {
	if (obj === null) return null;
	if (typeof obj !== 'object') return obj;
	if (obj.constructor === Date) return new Date(obj);
	if (obj.constructor === RegExp) return new RegExp(obj);
	var newObj = new obj.constructor(); //保持继承链
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) { //不遍历其原型链上的属性
			var val = obj[key];
			newObj[key] = typeof val === 'object' ? cloneFn(val) : val; // 使用arguments.callee解除与函数名的耦合
		}
	}
	return newObj;
};

//固定本年
/*const setParams = (obj) => {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	month = month >= 10 ? month : `0${month}`;
	let day = '01';
	// 传参数年和月时，返回月末的时间
	let end = new Date(year, Number(month)).toJSON().substring(0, 10);
	return {
		startDate: [year, '01', day].join('-'),
		endDate: end,
		...obj
	}
};
const setParams2 = (obj) => {
	let startData = new Date()
	let startFullYear = startData.getFullYear()
	let startMonth = startData.getMonth() + 1;
	startMonth = startMonth >=10 ? startMonth: `0${startMonth}`
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	month = month >= 10 ? month : `0${month}`;
	return {
		startDate: [startFullYear, '01'].join('-'),
		endDate: [year, month].join('-'),
		...obj
	}
};*/





//往前推一年
const setParams = (obj) =>{
	let startData = new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1)
	let date = new Date()
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	month = month >= 10 ? month : `0${month}`;
	let end = new Date(year, Number(month)).toJSON().substring(0, 10);
	return {
		startDate: formatDate(startData),
		endDate: end,
		...obj
	}
}
const setParams2 = (obj) => {
	let startData = new Date(new Date().getFullYear(), new Date().getMonth() - 11)
	let startFullYear = startData.getFullYear()
	let startMonth = startData.getMonth() + 1;
	startMonth = startMonth >=10 ? startMonth: `0${startMonth}`
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	month = month >= 10 ? month : `0${month}`;
	return {
		startDate: [startFullYear, startMonth].join('-'),
		endDate: [year, month].join('-'),
		...obj
	}
};

//格式化日期
const formatDate = (date)=> {
  let myyear = date.getFullYear()
  let mymonth = date.getMonth() + 1
  let myweekday = date.getDate()

  if (mymonth < 10) {
    mymonth = '0' + mymonth
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday
  }
  return (myyear + '-' + mymonth + '-' + myweekday)
}
export {
	YNloading,
	YNloading2,
	cloneFn,
	setParams,
	setParams2
}