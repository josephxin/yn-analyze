import React from 'react';

/*
 * 整体数据-子盒
 * 这里用了panel-title的样式
 * @author 辛志强
 * */
class OverallSituationItem extends React.Component {
	constructor() {
		super();
	}
	iEVersion() {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
        let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            let fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }   
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11  
        }else{
            return -1;//不是ie浏览器
        }
    }
	render() {
		let me = this;
		let props = me.props;
		let type = me.props.type;
		let overAllIcon = 'overall-icon-' + type;
		let overAllBottom = 'overall-icon-bottom-' + type;
		let IEClass = me.iEVersion() == -1 ? '' : 'activeIe' 
		//console.log("IEClass",IEClass)
		//console.log("me.iEVersion()",me.iEVersion())
		
		return(
			<div className={'overall-situation-item'} style={props.style}>
        <div className={'overall-situation-item-title panel-title'}>{props.title}</div>
        <div className={'overall-situation-item-body zebra-stripe'}>
          <div className={'osi-animate-box'}>
            <div className={'osi-animate-top osi-show-top' + ' ' + overAllIcon}></div>
            <div className={'osi-animate-center osi-show-center'}></div>
            <div className={'osi-animate-bottom osi-show-bottom' + ' ' + overAllBottom}></div>
          </div>
          <div className={'overall-situation-item-text'}>
            <div className={'overall-situation-item-num ' + IEClass} text={Math.round(props.value)}>{Math.round(props.value)}</div>
            <div className={'overall-situation-item-unit'}>{props.unit}</div>
          </div>
        </div>
      </div>
		)
	}
}

export default OverallSituationItem;