import React, {
	Component
} from 'react';
import './accidentselect.css'

class AccidentSelect extends Component {
	constructor(props) {
		super(props);
		let me = this;
		me.state = {
			tab: 1,
			isSelect: 0
		};
		me.lock = false;
		me.data = ["道路运输", "车辆伤害", "触电", "爆破", "高处坠落", "锅炉爆炸", "火药爆炸"];
		me.datas = ["道路运输", "车辆伤害", "触电", "爆破", "高处坠落", "锅炉爆炸", "火药爆炸", "道路运输", "车辆伤害", "触电", "爆破", "高处坠落", "锅炉爆炸", "火药爆炸", "道路运输", "车辆伤害", "触电", "爆破", "高处坠落", "锅炉爆炸", "火药爆炸", "道路运输", "车辆伤害", "触电", "爆破", "高处坠落", "锅炉爆炸", "火药爆炸", "道路运输", "车辆伤害", "触电", "爆破", "高处坠落", "锅炉爆炸", "火药爆炸"];
	}

	_setData(d) {
		let me = this;
		let data = d.slice(0, 7);
		me.datas = d;
		me.data = data;
		this.setState({
			data: me.data
		})
	};

	_isSelect(index) {
		this.setState({
			isSelect: index
		})
	};

	createlist() {
		let me = this;
		let data = me.state.data;
		if(!data) return false;
		return(
			<ul ref="list">
        {
          data.map((s, i) => {
            return (
              <li key={i} className={me.state.isSelect === i ? "active" : ""} >
                <span>{i + 1}</span><p onClick={me.itemSelect.bind(this, i, s)}><span title={s}>{s}</span></p>
              </li>
            )
          })
        }
      </ul>
		)
	};

	getInfo(e) {
		let me = this;
		if(me.state.tab) {
			me.open()
		} else {
			me.close();
		}
	};

	open() {
		let me = this;
		me.setState({
			data: me.datas,
			tab: 0
		});
	};

	close(e) {
		let me = this;
		me.setState({
			data: me.data,
			tab: 1
		});
	};

	itemSelect(index, name, e) {
		let me = this;
		console.log(index, name, e, me.item);
		if(me.item !== e.target.innerText) {
			me.item = name;
			me.props.searchAccident(me.item);
			me.setState({
				isSelect: index
			})
		}
		//me.close();
	};

	render() {
		let me = this;
		let tab = me.state.tab;
		{/*onMouseLeave={me.close.bind(this)}*/}
		return(
			<div className={`accident-select ${tab ? '' : 'active'}`} style={{
        width: '11.5rem',
        right: '0.4rem',
        top: '0'
      }} ref="wrap">
        {
          me.createlist()
        }
        <div className="accident-select-btn my-btn btn" onClick={this.getInfo.bind(this)}>
        	<img src="./static/image/new/look_all.png" alt=""/>
        	<span>{tab ? '查看全部' : '折叠全部'}</span>
        </div>
      </div>
		);
	};
}

export default AccidentSelect;