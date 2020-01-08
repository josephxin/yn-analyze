import React from 'react';
import { Common } from '../../components/common/common';

/*
* 下拉组件
* @author msh
* */
class Select extends React.Component {
  isRealUpdate = false;

  constructor(props) {
    super(props);
    let me = this;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    me._id = Common.randomID(12);

    me.nowYear = year;
    me.state = {
      show: false,
      showDate: me.props.defaultDate || [year, '-', month].join(''),
      defaultYear: undefined,
      monthActive: undefined
    };
    me._eventFunction = me._addEventListener.bind(me);
  }

  _addEventListener(e) {
    let me = this;
    me.isRealUpdate = true;
    let flag = Common.hasClass(e.target, me._id) ||
      Common.hasClass(e.target.parentNode, me._id) ||
      Common.hasClass(e.target, 'time-select-year-prev') ||
      Common.hasClass(e.target, 'time-select-year-content') ||
      Common.hasClass(e.target, 'time-select-year-next');
    if (!flag) {
      me.setState({
        show: false
      })
    }
  }

  _setShowDate(d) {
    this.setState({
      showDate: d
    })
  }

  render() {
    let me = this;
    let props = me.props;
    return (
      <div className={'hubei-select'} style={props.style}>
        <div
          className={`hubei-select-changed ${me._id}`}
          style={{
            lineHeight: props.style.height + 'px'
          }}
          onClick={me.selectChangedClick.bind(this)}
        >
          {
            me.state.showDate
          }
          <span className={me.state.show ? 'select-changed-up' : 'select-changed-down'}></span>
        </div>
        {
          me.createSelectDom()
        }
      </div>
    )
  }

  /* 显示隐藏下拉内容 */
  selectChangedClick() {
    let flag = !this.state.show;
    this.setState({
      show: flag
    })

  }

  /* 月份选择 */
  monthChange(i) {
    let me = this;
    
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let clickCallBack = me.props.callBack;
    let monthActive = i + 1;
    if(me.state.defaultYear == year){
			if(monthActive > month){
				monthActive = me.state.monthActive
			}
		}

    let showDate = [
      me.state.defaultYear,
      '-',
      monthActive < 10 ? '0' + monthActive : monthActive
    ].join('');
		
    me.setState({
      monthActive,
      showDate,
      show: false
    });

    if (clickCallBack && typeof clickCallBack === 'function') {
      clickCallBack(showDate);
    }
  }

  /* 上一年 */
  yearPrev() {
    let me = this;
    let defaultYear = --me.state.defaultYear;
    // let monthActive = undefined;
    me.setState({
      defaultYear,
      // monthActive
    })
  }

  /* 下一年 */
  yearNext() {
    let me = this;
    let nowYear = me.nowYear;
    let defaultYear = ++me.state.defaultYear;
    if (defaultYear > nowYear) {
      defaultYear = nowYear;
    }
    // let monthActive = undefined;
    me.setState({
      defaultYear,
      // monthActive
    })
  }

  /*
  * 处理props的日期
  * 返回 {defaultYear, monthActive}
  * */
  handleDate(n) {
    let me = this;
    let state = me.state;
    let defaultDate = me.props.defaultDate;
    let dates = defaultDate.split('-');

    let defaultYear = state.defaultYear;
    let monthActive = state.monthActive;

    if (!defaultYear) {
      defaultYear = dates[0] || me.nowYear;
    }
    if (!monthActive) {
      monthActive = Number(dates[1]);
    }

    let res = {
      defaultYear,
      monthActive
    };

    Object.assign(state, res);

    return res;
  }

  /*
  * 生成下拉内容
  * */
  createSelectDom() {
    let me = this;     
    let items;
    let date1 = new Date();
    let year = date1.getFullYear();
    let month = date1.getMonth() + 1;
    if(me.state.defaultYear == year){
			 items = me.createArr(12,month) 
		}else{
			 items = me.createArr(12,12);
		}
    let date = me.handleDate();
    return (
      <div className={`time-select-box ${me.state.show ? 'time-select-box-show' : 'time-select-box-hide'}`}>
        <div className={'time-select-year'}>
          <span className={'time-select-year-prev'} onClick={me.yearPrev.bind(this)}></span>
          <span className={'time-select-year-content'}>{date.defaultYear}</span>
          <span className={'time-select-year-next'} onClick={me.yearNext.bind(this)}></span>
        </div>
        <ul>
          {
            items.map((t, i) => {
              let month = i + 1;
              month = month < 10 ? `0${month}` : month;
              return (
                <li
                  key={`msh-select${i}`}
                  className={`${(i + 1) === date.monthActive ? 'active' : ''}${t == 'false' ? 'disabled':''}` }
                  onClick={me.monthChange.bind(this, i)}
                >
                  {month}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  /*
  * 生成指定个数的数组
  * 数组可以被map、forEach
  *  */
  createArr(n,x) {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
    	if(i < x ){
    		arr[i] = '';
    	}else{
    		arr[i] = 'false';
    	}
    }
    return arr;
  }

  componentDidUpdate() {
    let me = this;
    let flag = me.state.show;
    if (!flag) {
      window.removeEventListener('click', me._eventFunction, false);
    } else {
      window.addEventListener('click', me._eventFunction, false);
    }
  }

  componentWillUnmount() {
    let me = this;
    me.setState({
      show: false
    });
    window.removeEventListener('click', me._eventFunction, false);
  }
}

export default Select;
