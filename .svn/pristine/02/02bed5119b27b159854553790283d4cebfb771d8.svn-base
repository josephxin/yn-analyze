import React from 'react';
import { Common } from '../../components/common/common';
/* css */
import './select.css'

/*
* 下拉框组件 简单封装
* @author msh
* 注 _setList 可以自定义取值规则
* @props list {Array} 内容,list[0] 会被默认显示
* @props name {String} 组件名 warn时使用
* @props onSelectChange {Function} callBack 事件回调
* */
class Select extends React.Component {
  _width = undefined;
  _height = undefined;
  _top = undefined;
  _left = undefined;
  _bottom = undefined;
  _right = undefined;

  isRealUpdate = false;

  /*_setSelectedText(name) {
    this.isRealUpdate = true;
    this.setState({
      active: name
    })
  };*/

  _itemClick(obj, index) {
    let me = this;

    me.isRealUpdate = true;

    me.setState({
      active: obj.label
    });
    let propsEventChange = me.props.onSelectChange;
    if (!propsEventChange || typeof propsEventChange !== 'function') {
      throw new Error(`The props.onSelectChange of the Select component ${me.props.name || ''} is not correct.`)
    } else {
      propsEventChange(obj.value, index);
    }
  }

  _setList(arr, fn) {
    let me = this;

    me.isRealUpdate = true;

    let list = arr;

    /* 如果定义了arr的取值规则执行 */
    if (fn && typeof fn === 'function') {
      list = arr.map(fn);
    }

    /* 监测是否符合数组 */
    if (!(list instanceof Array)) {
      console.warn(`The arr params of the function _setList of the Select component ${me.props.name || ''} is not correct or the fn params is not correct , So I assign it to an empty array`);
      list = [];
    }

    /* 如果和state中存储的list相同 不执行*/
    if (list === me.oldList) {
      return;
    }

    me.oldList = list;

    me.setState({
      list: list,
      active: list[0].label
    })
  }

  _clickHere() {
    let me = this;

    me.isRealUpdate = true;

    let flag = !me.state.show;

    me.setState({
      show: flag
    });
  }

  _addEventListener(e) {
    let me = this;

    me.isRealUpdate = true;

    let flag = Common.hasClass(e.target, me._id) || Common.hasClass(e.target.parentNode, me._id);
    if (!flag) {
      me.setState({
        show: false
      })
    }
  }

  constructor(props) {
    super(props);
    let me = this;

    let list = props.list;

    if (!(list instanceof Array)) {
      list = [];
    }
		
		me.oldList = list;
		
    me._id = Common.randomID(12);

    me._width = props.width || 160;
    me._height = props.height || 38;
    me._top = props.top || 0;
    me._left = props.left || 0;
    me._bottom = props.bottom || 0;
    me._right = props.right || 0;

    me._eventFunction = me._addEventListener.bind(me);

    me.state = {
      list: list,
      show: false,
      active: list[0] ? list[0].label : ''
    };
  }

  render() {
    let me = this;
    let _height = me._height;
    let innerHeight = _height;
    let activeText = me.state.active;

    let flag = me.state.show;
    if (!me.isRealUpdate) return false;
    return (
      <div className={'select-box'} style={{
        width: me._width,
        height: _height,
        top: me._top,
        left: me._left || "",
        bottom: me._bottom,
        right: me._right
      }}>
        <div className={`show-here ${me._id}`} style={{
          width: me._width,
          height: _height,
          lineHeight: `${innerHeight}px`,
          // paddingRight: _height
          fontSize: me.props.fontSize || '0.16rem'
        }} onClick={me._clickHere.bind(this)}>
          <span>{activeText}</span>
          <i style={{ height: innerHeight, width: innerHeight }} className={flag ? 'showi' : 'hidei'}></i>
        </div>
        <ul className={`select ${flag ? 'slidedown' : 'slideup'} dialog-box-wrap`} style={{
          top: _height
        }}>
          {
            me.state.list.map((t, i) => {
              return (
                <li
                  key={`list_${i}`}
                  onClick={me._itemClick.bind(this, t, i)}
                  style={{
                    lineHeight: `${innerHeight}px`,
                    fontSize: me.props.fontSize || 14
                  }}
                >
                  {t.label}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  componentDidMount() {
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
