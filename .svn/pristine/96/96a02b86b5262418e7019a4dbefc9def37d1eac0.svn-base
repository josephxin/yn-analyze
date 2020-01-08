import React from 'react';
import './intelligent-analysis-center.css';

let titles = ['行业', '级别', '时间', '天气', '月份', '城市']; //默认值
const titles2 = ['类型', '级别', '时间', '天气', '月份', '城市']; //相互切换值
const titles3 = ['行业', '级别', '时间', '天气', '月份', '城市']; //相互切换值 

const centerData = {
	name: '---',
	value: "..."
};

/*
 * 事故智能分析中心图
 * @author joseph_xin
 * */
class IntelligentAnalysisCenter extends React.Component {
	constructor() {
		super();
		let me = this;
		me.state = {
			active: 0,
			...centerData,
			data: []
		};
		me.IEClass = me.iEVersion() == -1 ? '' : 'activeIe' 
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
		let name = me.state.name;
		let _data = me.state.data;
		return(
			<div className={'intelligent-analysis-center'}>
        <div className={'intelligent-analysis-center-bg'}>
        {/*onClick={me._handleClick.bind(this, name)}*/}
          <div ref={'value'} className={'iac-content'}></div>
        </div>
        <div ref={'analysisContent'} className={'intelligent-analysis-content'}>
          {
            _data.map((t, i) => {
              let tempMax, tempMin;
              if (t.classify === '月份') { tempMax = t.maxName + '月'; tempMin = t.minName + '月'; }
              if (t.classify === '时间') { tempMax = t.maxName + '时'; tempMin = t.minName + '时' }
              return (
                <div className={`intelligent-content-item${i} intelligent-content-item`}
                  key={`msh-intelligent-key${i}`}>
                  <div className={'intelligent-content-item-title'}>{titles[i]}</div>
                  <p className={'clearFix'}>
                    <span className={'linear-color-font1 marginR5'} title={t.maxName.length>8?t.maxName:''}>{tempMax || t.maxName}</span>
                   	 最多
                  </p>
                  <p className={'clearFix'} style={{ marginBottom: 10 }}>
                    <span className={'linear-color-font1 marginR5'}>{t.maxNum}</span>
                    <span>起，占</span>
                    <span className={'linear-color-font1 marginL5'}>{t.maxScale}%</span>
                  </p>
                  <p className={'clearFix'}>
                    <span className={'linear-color-font2 marginR5'} title={t.minName.length>8?t.minName:''}>{tempMin || t.minName}</span>
                   	 最少
                  </p>
                  <p className={'clearFix'} style={{ marginBottom: 10 }}>
                    <span className={'linear-color-font2 marginR5'}>{t.minNum}</span>
                    <span>起，占</span>
                    <span className={'linear-color-font2 marginL5'}>{t.minScale}%</span>
                  </p>
                </div>
              )
            })
          }
        </div>
      </div>
		)
	}

	/* 切换动画 */
	ani() {
		let me = this;
		let dom = me.refs.analysisContent.children;
		let className = 'intelligent-content-item';
		let len = dom.length;
		for(let i = 0; i < len; i++) {
			let item = dom[i];
			if(item)
				item.className = `${className + `-${i}`} ${className}`
		}

		setTimeout(function() {
			for(let i = 0; i < len; i++) {
				let item = dom[i];
				if(item)
					item.className = `${className + `${i}`} ${className}`
			}
		}, 50);
	}

	/* 传入中心图的数据 */
	setData(obj) {
		//console.log(obj)
		this.setState({
			...obj
		});
		//console.log(this.state)
	}

	/* 传入周围的六个图的数据 */
	setInfoData(res,falg) {
		/*console.log('传入周围的六个图的数据',res,falg)*/
		this.ani();
		let data = [];
		if(!falg){
			titles = titles2
		}else{
			titles = titles3
		}
		res.map((t, i) => {
			let index = titles.indexOf(t.classify);
			data[index] = t;
		});
		this.setState({
			data
		});
	}

	/* 中心点击事件 */
	_handleClick(name) {
		let _click = this.props._click;
		if(_click && typeof _click === 'function') {
			_click(name);
		}
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate() {
		let me = this;
		let name = me.state.name ? me.state.name : '---';
		let value = me.state.value;
		me.refs.value.innerHTML = `<p><span class="iac-text-shadow ${me.IEClass}">${value}</span><span class="unit">起</span></p><p class="text-btn" title="${name}">${name}</p>`
	}
}

export default IntelligentAnalysisCenter;