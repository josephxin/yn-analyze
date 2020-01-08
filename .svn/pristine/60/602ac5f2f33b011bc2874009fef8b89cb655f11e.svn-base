/**
 * 简单表格
 * xf
 */
import React, { Component } from 'react';
import "./companyinfo.css";
const companyData = [
  { id: "ENTNAME", name: "企业名称" },
  { id: "AREANAME", name: "行政区域" },
  { id: "CREATEDATE", name: "注册时间" },
  // { id: "CREATEDATE", name: "成立时间" },
  // { id: "OVERTIME", name: "营业期限" },
  { id: "ZCDZ", name: "注册地址" },
  // { id: "QYWZ", name: "企业网址" },
  // { id: "TYSHXYDM", name: "统一社会信用代码" },
  { id: "YZBM", name: "邮政编码" },
  { id: "DZYX", name: "邮箱" },
  // { id: "ZCH", name: "工商注册号" },
  // { id: "QYJYZT", name: "企业经营状态" },
  // { id: "QYLX", name: "企业类型" },
  // { id: "QYXZ", name: "企业性质" },
  // { id: "FZRQ", name: "发证日期" },
  { id: "PRINCIPAL", name: "法人代表姓名" },
  { id: "LXDH", name: "企业电话" },
  { id: "PRNAME", name: "安全负责人" },
  { id: "PRTEL", name: "安全负责人移动电话" },
  { id: "ENROLDEPT", name: "登记机构" },
  // { id: "ECONOMYTYPE", name: "经济类型" },
  { id: "INITCAPITAL", name: "注册资金(万元)" },
  // { id: "QYLX", name: "注册类型" },
  { id: "OPERATION", name: "经营范围" },
  // { id: "HYFL", name: "所属行业" },
  // { id: "QYZSJGBM", name: "行业主管部门" },
  { id: "DIMENSIONS", name: "企业规模" },
  // { id: "SCJYDZ", name: "生产经营地址" },
  { id: "FLOORSPACE", name: "占地面积(m²)" },
  { id: "CYRYSL", name: "从业人数(人)" },
  { id: "CSE_NUMBER", name: "注册安全工程师人数(人)" },
  { id: "FIXEDASSET", name: "固定资产总值(万元)" },
  // { id: "xxx", name: "职工人数(人)" },
  // { id: "xxx", name: "临时用工人数(人)" },
  // { id: "xxx", name: "从业人数接受本单位安全培训人数" },
  // { id: "xxx", name: "应缴交社保工伤保险人数" },
  // { id: "xxx", name: "实际缴社会工伤保险人数" },
  // { id: "", name: "" },
  // { id: "xxx", name: "其中持证人数(人)" },
  // { id: "xxx", name: "特种作业人数(人)" },
  // { id: "xxx", name: "特种执业作战人数(人)" },
  // { id: "xxx", name: "安全管理人员人数(人)" },
  // { id: "xxx", name: "上年度营业额(万元)" },
  // { id: "xxx", name: "一线生产人数(除行政、后勤外)" },
  // { id: "xxx", name: "安全生产标准化达标" },
  { id: "WSS_LEVEL", name: "标准化等级" },
  // { id: "xxx", name: "主要原材料" },
  // { id: "xxx", name: "ooo" },
  // { id: "WHFL", name: "危化分类" },
  { id: "ENTLEVEL", name: "监管分级" },
  // { id: "REGULATC", name: "是否重点监管企业" },
  // { id: "JGFZLL", name: "监管分类子类" },
];

class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ key: "xxxxxxxx", value: "ooooooooo" }]
    };
    this._flag = false;
  };

  _setData(d) {
    this._flag = true;
    let arr = [];
    companyData.forEach((s, i) => {
      let temp = {};
      if (s.id === "REGULATC") {
        temp.state = Boolean(d[s.id]);
      }
      temp.key = s.name;
      temp.value = d[s.id];
      if (s.id === "DIMENSIONS") {
        let arr = ["微型", "小型", "中型", "大型"];
        temp.value = arr[Number(d[s.id]) + 1];
      }
      arr.push(temp);
    });
    this.setState({
      data: arr
    })
  };

  //测试生成数组
  // xxx() {
  //   let temp = { key: "xxxxxxxx", value: "ooooooooo" };
  //   let temps = { key: "xxxxxxxx", value: "ooooooooo", state: 1 };
  //   let tempm = { key: "所属行业：", value: "湖北省科技发展有限公司 一一路441号-5 xxxxxxx 32789090127388939 孙证明 2009-03-21 " };
  //   let arr = [];
  //   for (let i = 0; i < 48; i++) {
  //     arr.push(temp)
  //   }
  //   arr[32] = tempm;
  //   arr.push(temps)
  //   arr.push(temp)
  //   return arr
  // }

  _setNone(d) {
    this.lockE = true;
    this.setState({
      error: d
    });
  }

  render() {
    let me = this;
    let data = me.state.data;
    if (me._flag) {
      this._flag = false;
      if (me.state.data.length === 0) { return <div className={"component-loading"} >暂无数据</div> }
      return (
        <div style={me.props.style} >
          <div style={{
            width: parseFloat(me.props.style.width) / 4 + 'rem',
            height: me.props.style.height
          }} className="company-info-bg company-info-bgl" ></div>
          <div style={{
            width: parseFloat(me.props.style.width) / 4 + 'rem',
            height: me.props.style.height,
            left: 2 * parseFloat(me.props.style.width) / 4 + 'rem'
          }} className="company-info-bg company-info-bgr" ></div>
          <ul className="company-info-content dialog-box-wrap" >
            {
              data.map((s, i) => {
                let node = (
                  <li key={i}>
                    <p>{s.key}</p>
                    <p>{s.value}</p>
                  </li>
                );
                if (s.state) {
                  node = (
                    <li key={i}>
                      <p>{s.key}</p>
                      <p><span className={s.state === 1 ? "active" : ""} >是</span><span className={s.state === 2 ? "active" : ""}>否</span></p>
                    </li>
                  )
                }
                return node
              })
            }
          </ul>
        </div>
      )
    } else if (me.lockE) {
      this.lockE = false;
      return <div className={"component-loading"}>暂无数据</div>;
    } else {
      return (
        <div className={"component-loading"}>加载中……</div>
      )
    }
  }
}
export default CompanyInfo;
