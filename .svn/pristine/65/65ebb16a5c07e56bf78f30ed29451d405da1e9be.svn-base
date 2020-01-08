import React from 'react';
import "./AssociationAnalysisItem.css"
import Panel from '../../components/panel/Panel';
import * as api from '../../api/api-association-analysis-item';
/* 易发生该事故企业  */
import AnalysisCompany from '../../components/analysiscompany/analysiscompany';
import CirclePieChart from '../../components/pieCharts/circlePieChart';
/**该隐患相关企业规模分析 */
import SingleBar from '../../components/bar/SingleBar'
// 该隐患相关企业安全分析
import Circle from '../../components/water/circle';
import WaterPolo from '../../components/water/waterPolo';
import { isAbsolute } from 'path';

/*
* 隐患事故关联分析-子页面
* @author msh
 */
class AssociationAnalysisItem extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me._tokens = [];
    // 该隐患相关企业执法分析
    me.accidentLevel = {
      width: 600,
      height: 400,
      left: 1280,
      top: 92
    }
  };

  /* 已发生该事故的企业画像 */
  company = {
    width: 600,
    height: 855,
    top: 92,
    left: 660
  };
  // 该隐患相关企业安全分析
  water = {
    width: 600,
    height: 395,
    top: 552,
    left: 40
  };
  analysiscompany = {
    position: "absolute",
    width: 510,
    height: 510,
    left: 40,
    top: '50%',
    transform: 'translate(0,-50%)'
  };
  /**该隐患相关企业规模分析 */
  scaleAnalysis = {
    position: "absolute",
    width: 600,
    height: 399,
    top: 92,
    left: 42
  };

  /* 该隐患相关企业隐患排查分析*/
  investigation = {
    width: 600,
    height: 395,
    top: 552,
    left: 1280
  };

  toPage() {
    window.location.hash = "association-analysis";
  };

  render() {
    let me = this;
    return (
      <div>
        <div className="association-analysis-item-title">
          <p>隐患企业画像</p>
          <p onClick={me.toPage.bind(this)}>返回</p>
        </div>
        <Panel style={me.scaleAnalysis} title={"该隐患相关企业规模分析"}>
          <SingleBar width={600} height={399} top={-10} ref={'scaleAnalysis'} />
        </Panel>
        <Panel style={me.company} title={"已发生该事故的企业画像 "}>
          <div style={{
            fontSize: 16,
            color: "#bde1ff",
            position: "absolute",
            top: 100,
            left: 40
          }}>具有以下特征的企业更易发生事故：
          </div>
          <AnalysisCompany style={me.analysiscompany} ref={'analysisCompanyRef'} />
        </Panel>
        <Panel title={"该隐患相关企业执法分析"} style={me.accidentLevel}>
          <CirclePieChart width={600} height={400} ref="circlePieChart"></CirclePieChart>
          <div className="circlePieChart"></div>
          <div className="circlePieChartBig"></div>
        </Panel>
        <Panel title={"该隐患相关企业安全分析"} style={me.water}>
          <div className="waterBox" style={{ position: 'absolute', left: 0, bottom: 0, width: '200px', height: '100%' }}>
            <Circle
              style={{ width: '1.4rem', height: '1.4rem', position: 'absolute', left: '30px', top: '110px', zIndex: 10 }}
              ref={'standardizationCircle'}></Circle>
            <WaterPolo width={'0.8rem'} top={'1.4rem'} left={'0.6rem'} ref={'standardizationWater'} />
            <div style={{
              position: 'relative',
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: '14px',
              top: '270px'
            }}>进行过安全标准化
            </div>
          </div>
          <div className="waterBox"
            style={{ position: 'absolute', left: "200px", bottom: 0, width: '200px', height: '100%' }}>
            <Circle
              style={{ width: '1.4rem', height: '1.4rem', position: 'absolute', left: '30px', top: '110px', zIndex: 10 }}
              ref={'safetyCircle'}></Circle>
            <WaterPolo width={'0.8rem'} top={'1.4rem'} left={'0.6rem'} ref={'safetyWater'} />
            <div style={{
              position: 'relative',
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: '14px',
              top: '270px'
            }}>进行过安全培训
            </div>
          </div>
          <div className="waterBox"
            style={{ position: 'absolute', left: "400px", bottom: 0, width: '200px', height: '100%' }}>
            <Circle
              style={{ width: '1.4rem', height: '1.4rem', position: 'absolute', left: '30px', top: '110px', zIndex: 10 }}
              ref={'personnelCircle'}></Circle>
            <WaterPolo width={'0.8rem'} top={'1.4rem'} left={'0.6rem'} ref={'personnelWater'} />
            <div style={{
              position: 'relative',
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: '14px',
              top: '270px'
            }}>配备了安全人员
            </div>
          </div>
        </Panel>
        <Panel title={"该隐患相关企业隐患排查分析"} style={me.investigation}>
          {/* 上右下左原则 */}
          <div style={{
            width: '54%',
            height: '1px',
            backgroundColor: '#025699',
            position: 'absolute',
            top: '50%',
            left: '24%'
          }}></div>
          <div style={{
            width: '1px',
            height: '56%',
            backgroundColor: '#025699',
            position: 'absolute',
            left: '50%',
            top: '22%'
          }}></div>
          <p style={{
            fontSize: '14px',
            color: '#79d2e0',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%,0)',
            top: '40px'
          }}>进行过安全巡查</p>
          <p style={{
            fontSize: '14px',
            color: '#79d2e0',
            position: 'absolute',
            top: '50%',
            transform: 'translate(0,-50%)',
            right: '16px'
          }}>进行过安全自查</p>
          <p style={{
            fontSize: '14px',
            color: '#79d2e0',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%,0)',
            bottom: '40px'
          }}>未进行过安全巡查</p>
          <p style={{
            fontSize: '14px',
            color: '#79d2e0',
            position: 'absolute',
            top: '50%',
            transform: 'translate(0,-50%)',
            left: '16px'
          }}>未进行过安全自查</p>
          <div className="hoverBox" onMouseOver={me._clickHere.bind(this, 'inspectingUnSelfExamination')}
            onMouseOut={me._clickHere2.bind(this, 'inspectingUnSelfExamination')}>
            <Circle style={{ width: '1rem', height: '1rem', position: 'absolute', zIndex: 10 }}
              ref={'inspectingUnSelfExaminationCircle'}></Circle>
            <WaterPolo width={'0.6rem'} top={'0.2rem'} left={'0.2rem'} ref={'inspectingUnSelfExaminationWater'} />
          </div>
          <div className="waterShowInfo" ref="inspectingUnSelfExamination"
            onMouseOver={me._clickHere.bind(this, 'inspectingUnSelfExamination')}
            onMouseOut={me._clickHere2.bind(this, 'inspectingUnSelfExamination')}>
            <div className="triangle"></div>
            发生事故的企业中进行过安全巡查和未进行过安全自查的企业有<span className="counter">745</span>家，占<span>73%</span></div>

          <div className="hoverBox inspectingSelfExaminationBox"
            onMouseOver={me._clickHere.bind(this, 'inspectingSelfExamination')}
            onMouseOut={me._clickHere2.bind(this, 'inspectingSelfExamination')}>
            <Circle style={{ width: '1rem', height: '1rem', position: 'absolute', zIndex: 10 }}
              ref={'inspectingSelfExaminationCircle'}></Circle>
            <WaterPolo width={'0.6rem'} top={'0.2rem'} left={'0.2rem'} ref={'inspectingSelfExaminationWater'} />
          </div>
          <div className="waterShowInfo inspectingSelfExamination" ref="inspectingSelfExamination"
            onMouseOver={me._clickHere.bind(this, 'inspectingSelfExamination')}
            onMouseOut={me._clickHere2.bind(this, 'inspectingSelfExamination')}>
            <div className="triangle"></div>
            发生事故的企业中进行过安全巡查和进行过安全自查的企业有<span className="counter">745</span>家，占<span>73%</span></div>

          <div className="hoverBox unInspectingSelfExaminationBox"
            onMouseOver={me._clickHere.bind(this, 'unInspectingSelfExamination')}
            onMouseOut={me._clickHere2.bind(this, 'unInspectingSelfExamination')}>
            <Circle style={{ width: '1rem', height: '1rem', position: 'absolute', zIndex: 10 }}
              ref={'unInspectingSelfExaminationCircle'}></Circle>
            <WaterPolo width={'0.6rem'} top={'0.2rem'} left={'0.2rem'} ref={'unInspectingSelfExaminationWater'} />
          </div>
          <div className="waterShowInfo unInspectingSelfExamination" ref="unInspectingSelfExamination"
            onMouseOver={me._clickHere.bind(this, 'unInspectingSelfExamination')}
            onMouseOut={me._clickHere2.bind(this, 'unInspectingSelfExamination')}>
            <div className="triangle"></div>
            发生事故的企业中进行过安全自查和未进行过安全巡查的企业有<span className="counter">745</span>家，占<span>73%</span></div>

          <div className="hoverBox unInspectingUnSelfExaminationBox"
            onMouseOver={me._clickHere.bind(this, 'unInspectingUnSelfExamination')}
            onMouseOut={me._clickHere2.bind(this, 'unInspectingUnSelfExamination')}>
            <Circle style={{ width: '1rem', height: '1rem', position: 'absolute', zIndex: 10 }}
              ref={'unInspectingUnSelfExaminationCircle'}></Circle>
            <WaterPolo width={'0.6rem'} top={'0.2rem'} left={'0.2rem'} ref={'unInspectingUnSelfExaminationWater'} />
          </div>
          <div className="waterShowInfo unInspectingUnSelfExamination" ref="unInspectingUnSelfExamination"
            onMouseOver={me._clickHere.bind(this, 'unInspectingUnSelfExamination')}
            onMouseOut={me._clickHere2.bind(this, 'unInspectingUnSelfExamination')}>
            <div className="triangle"></div>
            发生事故的企业中未进行过安全巡查和未进行过安全自查的企业有<span className="counter">745</span>家，占<span>73%</span></div>
        </Panel>
      </div>
    )
  };

  _clickHere(ref) {
    let me = this;
    setTimeout(function () {
      me.refs[ref].style.display = 'block'
    }, 100)

  };

  _clickHere2(ref) {
    let me = this;
    setTimeout(function () {
      me.refs[ref].style.display = 'none'
    }, 100)
  };

  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  };

  getParams() {
    // let dist = {};
    // let arr = window.location.hash.match(/\?(.+)/)[1].split("&");
    // arr.forEach((s, i) => {
    //   let arr = s.match(/(.+)=(.+)/);
    //   dist[arr[1]] = decodeURIComponent(arr[2]);
    // });
    // return dist;
    let dist = {};
    let stroage = window.sessionStorage;
    dist.startDate = stroage.getItem('startDateAsso');
    dist.endDate = stroage.getItem('endDateAsso');
    dist.accidentType = stroage.getItem('accidentTypeAsso');
    return dist;
  };

  componentDidMount() {
    let me = this;
    me.params = me.getParams();
    /*该隐患相关企业执法分析*/
    me._tokens.push(api.lawEnforce.send(me.params).then(res => {
      let accidentLevel = {
        "series": [
          { "value": "0", "name": "曾被执法" },
          { "value": "0", "name": "未被执法过" },
        ],
        "legend": ["曾被执法", "未被执法过"],
      }
      accidentLevel.series = res.data;
      me.refs.circlePieChart._setData(accidentLevel);
    }));

    /*该隐患相关企业安全分析*/
    me._tokens.push(api.safeAnalysis.send(me.params).then(res => {
      let standardization = {
        value: '0',
        color: '#00a8ff'
      };
      for (let i = 0; i < res.data.length; i++) {
        standardization.value = res.data[i].value
        if (res.data[i].name === "进行过安全标准化") {
          me.refs.standardizationCircle.setData(standardization);
          me.refs.standardizationWater.setData(standardization);
        } else if (res.data[i].name === "进行过安全培训") {
          standardization.color = '#36bb88'
          me.refs.safetyCircle.setData(standardization);
          me.refs.safetyWater.setData(standardization);
        } else if (res.data[i].name === "配备了安全人员") {
          standardization.color = '#ffb700'
          me.refs.personnelCircle.setData(standardization);
          me.refs.personnelWater.setData(standardization);
        }
      }
    }));

    /*该隐患相关企业隐患排查分析   上右下左原则*/
    me._tokens.push(api.investigation.send(me.params).then(res => {
      let standardization = {
        value: '0',
        color: '#f6d925'
      };
      for (let i = 0; i < res.data.length; i++) {
        standardization.value = res.data[i].value;
        standardization.rate = res.data[i].rate;
        if (res.data[i].name === "进行过安全巡查未安全自查") {
          me.refs.inspectingUnSelfExaminationCircle.setData(standardization);
          me.refs.inspectingUnSelfExaminationWater.setData(standardization);
        } else if (res.data[i].name === "进行过安全巡查与安全自查") {
          standardization.color = '#00c6fe'
          me.refs.inspectingSelfExaminationCircle.setData(standardization);
          me.refs.inspectingSelfExaminationWater.setData(standardization);
        } else if (res.data[i].name === "未进行过安全巡查与进行过安全自查") {
          standardization.color = '#2d7aff'
          me.refs.unInspectingSelfExaminationCircle.setData(standardization);
          me.refs.unInspectingSelfExaminationWater.setData(standardization);
        } else if (res.data[i].name === "未进行过安全巡查与未进行过安全自查") {
          standardization.color = '#039d74'
          me.refs.unInspectingUnSelfExaminationCircle.setData(standardization);
          me.refs.unInspectingUnSelfExaminationWater.setData(standardization);
        }
      }
    }));

    /* 已发生该事故的企业画像 */
    me._tokens.push(api.analysiscompany.send(me.params).then(res => {
      let data = res.data;
      me.refs.analysisCompanyRef._setData(data);
    }));
    /**该隐患相关企业规模分析 */
    me.refs.scaleAnalysis._hide()
    me._tokens.push(api.enterpriseSale.send(me.params)
      .then(res => {
        let Xdata = [], seriesData = [];
        res.data.map(s => {
          Xdata.push(s.name)
          seriesData.push(s.value)
        })
        let scaleAnalysisData = {
          Xdata: Xdata,
          seriesData: seriesData,
          switch: true
        }
        me.refs.scaleAnalysis._setData(scaleAnalysisData)
      })
    );

  };

  componentWillUnmount() {
    this._clearTokens();
  };
}

export default AssociationAnalysisItem;
