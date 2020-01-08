/**
 * 简单表格
 * xf
 */
import React, {Component} from 'react';
import "./premunition.css";

class Premunition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this._flag = false;
	}
	_setData(d) {
		this._flag = true;
		this.setState({
			data: d
		})
	}
	render() {
		let me = this;
		if(me._flag) {
			if(me.state.data.length === 0) {
				return <div className={"component-loading"} >暂无数据</div>
			}
			return(
				<div className={"frame-style"}>
          <ul className="accident-premunition" >
            {
              me.state.data.map((s, i) => {
                return (
                  <li key={i}>
                    <p>{s}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
			)
		} else {
			return(
				<div className={"component-loading"}>加载中…</div>
			)
		}
		this._flag = false;
	}
}
export default Premunition;