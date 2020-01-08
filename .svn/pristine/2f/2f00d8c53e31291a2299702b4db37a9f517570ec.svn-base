import React from 'react';
import './safety-production.css';
/* 行业 */
import Industry from './Industry';
import Area from "./Area";
/* 区域 */

const tabs = ['行业', '区域'];

const SESSION_STORAGE_ACTIVE = 'hubei-safety-active';

/*
* 安全生产评估
* 其中的 行业和区域 分页拆分为 Industry和Area 两个。
* @author msh
 */
class SafetyProduction extends React.Component {
  constructor() {
    super();
    let me = this;
    let active = window.sessionStorage.getItem(SESSION_STORAGE_ACTIVE);
    if (!active) {
      active = 0
    }
    me.state = {
      active
    };
  }

  render() {
    let me = this;
    let active = me.state.active;
    return (
      <div className={'safety-production'}>
        {/* <ul className={'safety-production-tab'}>
          {
            tabs.map((t, i) => {
              return (
                <li
                  key={`safety-production-tan-${i}`}
                  className={active === i ? 'active' : ''}
                  onClick={me.tabClick.bind(this, i)}
                >{t}</li>
              )
            })
          }
        </ul> */}
        {
          me.createReactDom(active)
        }
      </div>
    )
  }

  createReactDom(index) {
    if (index === 0) {
      return (
        <Industry />
      )
    } else {
      return (
        <Area />
      )
    }
  }

  tabClick(index) {
    window.sessionStorage.setItem(SESSION_STORAGE_ACTIVE, index);
    this.setState({
      active: index
    });
  }
}

export default SafetyProduction;
