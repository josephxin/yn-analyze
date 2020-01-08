/**
 * 简单表格
 * zll
 */
import React, {
	Component
} from 'react';
import './trapezoid.css';
import trapezoid1 from './trapezoid1.png';
import trapezoid2 from './trapezoid2.png';
import trapezoid3 from './trapezoid3.png';
import trapezoid4 from './trapezoid4.png';
class Trapezoid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			currentIndex:0
		};
		this.img = [trapezoid1, trapezoid2, trapezoid3, trapezoid4];
		this._flag = false;
	}
	_setData(d) {
		this._flag = true;
		this.setState({
			data: d
		})
	}
	showType(i,e) {
		console.log(e,i);
		if(i != this.state.currentIndex) {
			this.setState({
				currentIndex: i
			});
		}
		this.props.showType(e.target.innerText)
	}
	render() {
		let me = this;
		//console.log(this.state)
		if(this._flag) {
			if(me.state.data.length === 0) {
				return <div className={"component-loading"} >暂无数据</div>
			}
			return(
				<div style={this.props.style}>
          <ul className={'number'}>
            {
              this.state.data.accident.map((v, i) => {
                return (
                  <li style={{
                    background: `url(${this.img[i]}) no-repeat center center`,
                    backgroundSize: 'contain'
                  }} key={i}>{v}</li>
                )
              })
            }
          </ul>
          <ul className={'content'}>
            {
              this.state.data.content.map((v, i) => {
              	//console.log(v)
              	if(v){
	                let len = v.length;
	                if (len > 9) {
	                  return <li title={v} onClick={me.showType.bind(me,i)} key={i} className={`word-hidden ${i===me.state.currentIndex? "active" : null }`}>{v}</li>
	                } else {
	                  return <li key={i} onClick={me.showType.bind(me,i)} className={i===me.state.currentIndex?"active":null}>{v}</li>
	                }
                }
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
export default Trapezoid;