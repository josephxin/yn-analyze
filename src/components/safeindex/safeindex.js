/**
 * 简单表格
 * xf
 */
import React, { Component } from 'react';
import "./safeindex.css";
const dataArr = ["基础数据", "隐患数据", "事故风险数据", "物联网数据", "特殊时期数据"];
const dataArrId = ["sjjc", "yhsj", "sgfxsj", "wlwsj", "tssqsj"];

class SafeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this._flag = true;
  }
  _setData(d) {
    this._flag = true;
    let arr = [];
    d.forEach((s, i) => {
      let temp = {};
      temp.name = dataArr[i];
      temp.num = d[i][dataArrId[i]];
      temp.trend = d[i].trend;
      arr.push(temp);
    })
    this.setState({
      data: arr
    })
  };

  colorArr = ["rgba(3,254,151,1)", "rgba(0,229,241,1)", "rgba(59,153,255,1)", "rgba(255,240,0,1)", "rgba(255,150,1,1)"];
  render() {
    let me = this;
    if (me._flag) {
      if (me.state.data.length === 0) { return <div className={"component-loading"} >暂无数据</div> }
      return (
        <div style={me.props.style} className="safe-index-list-wrap">
          <p className="safe-index-list-title" >安全生产形势评估</p>
          <ul className="safe-index-list" >
            {
              me.state.data.map((s, i) => {
                let t;
                let num = Number(s.num);
                if (num > 89) { t = 1 } else if (num > 69) { t = 2 } else if (num > 59) { t = 0 } else if (num > 49) { t = 3 } else { t = 4 }
                let url = `./static/image/safeindex/index${t + 1}.png`;
                let color = me.colorArr[t];
                return (
                  <li key={i} style={{ height: me.props.liHeight }} >
                    <div className="item" >
                      <img src={url} alt="logo" style={{
                        width: '.53rem',
                        height: '.71rem'
                      }} />
                      <div>
                        <p>{s.name}</p>
                        <p style={{
                          color: color
                        }}>{s.num === "100.00" ? 100 : s.num}&nbsp;
                          {/* <span style={{
                            display: "inline-block",
                            bottom: 0,
                            right: 0,
                            width: 15,
                            height: 15,
                            backgroundImage: s.trend ? 'url(../../image/up.png)' : 'url(../../image/down.png)',
                          }} className="arrow" ></span> */}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
    } else {
      return (
        <div>加载中……</div>
      )
    }
    this._flag = false;
  }
}
export default SafeIndex;
