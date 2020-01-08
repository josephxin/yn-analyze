/**
 * 简单表格
 * xf
 */
import React, { Component } from 'react';
import "./accidentCompany.css";

class AccidentCompany extends Component {
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
  showRisk(index, e) {
    let me = this;
    me.props.showRisk(e.target.innerText, index);
  }
  showCompany(index, e) {
    let me = this;
    me.props.showCompany(e.target.innerText, index);
  }
  componentDidUpdate() {
    let node = document.querySelector(".node-wrap");
    if (node) { 
    	try{node.removeNode(true); }catch(err){node.remove(); }
    }
  }
  render() {
    let me = this;
   //	console.log(me.props)
   	const scale = window._scale;
   	let sw = me.props.style.width
   	let w;
   	if(sw.indexOf('rem') != -1){
   		let s = sw.slice(0,sw.indexOf('rem'))*100
   		w = 0.95*(s*scale - 40*scale - 50*scale)
   	}else{
   		w = sw
   	}
    let nodeWrap = document.createElement("div");
    //nodeWrap.classList = "node-wrap";  //这样写ie不兼容
    nodeWrap.classList.add("node-wrap")
    //console.log('nodeWrap',nodeWrap)
    if (me._flag) {
      if (me.state.data.length === 0) { return <div className={"component-loading"} >暂无数据</div> }
      return (
      	<div style={me.props.style} className={'accident-company'}>
	      	<ul className="accident-company-title" >
	            <li style={{ width: '0.55rem', paddingLeft: '0.2rem' }}>序号</li>
	            <li style={{ flex: 1, textAlign: "center" }}>相似企业</li>
	        </ul>
	        <div className={'company-style'}>
		        <div className={"component-width"}>
		          <ul className="accident-company-content dialog-box-wrap" >
		            {
		              me.state.data.map((s, i) => {
		                let node;
		                let temp = document.createElement("p");
		                temp.style.display = "inline-block";
		                temp.innerText = s;
		                nodeWrap.appendChild(temp)
		                document.querySelector("body").appendChild(nodeWrap);
		                let len = temp.offsetWidth;
		               // console.log(len,w,len > w)
		                if (len > w) {
		                  node = <p title={s}>{s}</p>
		                } else {
		                  node = <p>{s}</p>
		                }
		                return (
		                  <li key={i} onClick={me.showCompany.bind(this, i)}>
		                    <p>{i + 1}</p>
	                    {node}
	                  </li>
	                )
	              })
	            }
	          </ul>
	        </div>
	        </div>
	    </div>
      )
    } else {
      return (
        <div className={"component-loading"}>加载中…</div>
      )
    }
    this._flag = false;
  }
}
export default AccidentCompany;
