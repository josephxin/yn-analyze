/**
 * 简单表格
 * xf
 */
import React, { Component } from 'react';

class AccidentCompanyEasy extends Component {
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
  componentDidUpdate() {
    let node = document.querySelector(".node-wrap");
    if (node) { node.remove() }
  }
  render() {
    let me = this;
    let nodeWrap = document.createElement("div");
    nodeWrap.classList = "node-wrap";
    if (me._flag) {
      if (me.state.data.length === 0) { return <div className={"component-loading"} >暂无数据</div> }
      return (
        <div style={me.props.style} >
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
                if (len > .95 * (me.props.style.width - 150)) {
                  node = <p title={s} className="accident-company-content-easy" >{s}</p>
                } else {
                  node = <p className="accident-company-content-easy" >{s}</p>
                }
                return (
                  <li key={i}>
                    <p>{i + 1}. </p>
                    {node}
                  </li>
                )
              })
            }
          </ul>
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
export default AccidentCompanyEasy;
