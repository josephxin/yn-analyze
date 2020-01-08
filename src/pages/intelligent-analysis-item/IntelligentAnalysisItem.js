import React from 'react';
import Panel from '../../components/panel/Panel';
import * as api from '../../api/api-intelligent-analysis-item';

// 该隐患相关企业安全分析
import Circle from '../../components/water/circle';
import WaterPolo from '../../components/water/waterPolo';
import CirclePieChart from '../../components/pieCharts/circlePieChart';
/* 易发生该事故企业  */
import AccidentCompanyEasy from '../../components/list/accidentCompanyEasy';
/**该隐患相关企业规模分析 */
import SingleBar from '../../components/bar/SingleBar'
import AnalysisCompany from '../../components/analysiscompany/analysiscompany';
/* 该事故企业风险分析  */
import Line from '../../components/linechart/linevalue';
/*
* 事故智能分析-子页面
* @author msh
 */
class IntelligentAnalysisItem extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me._tokens = [];
    me.params = me.getParams();
    let search = me.params.accidentType;
    me.state = {
      name: search
    };
    me._tokens = [];

    /* 该隐患相关企业执法分析 */
    me.accidentLevel = {
      width: 600,
      height: 400,
      left: 1280,
      top: 112
    }
    me.changeRem(me.accidentLevel);
    /* 该隐患相关企业安全分析 */
    me.water = {
      width: 600,
      height: 400,
      top: 112,
      left: 660
    }
    me.changeRem(me.water);
    /* 该隐患相关企业隐患排查分析 */
    me.investigation = {
      width: 600,
      height: 395,
      top: 580,
      left: 40
    }
    me.changeRem(me.investigation);
    /* 已发生该事故的企业画像 */
    me.companyHas = {
      width: 600,
      height: 395,
      top: 580,
      left: 660
    };
    me.changeRem(me.companyHas);
    // me.analysiscompany = {
    //   position: "absolute",
    //   width: 500,
    //   height: 300,
    //   top: 80,
    //   left: 50
    // };
    // me.changeRem(me.analysiscompany);

    /* 易发生该事故企业 */
    me.company = {
      width: 600,
      height: 395,
      top: 580,
      left: 1280
    };
    me.changeRem(me.company);
    me.accidentCompany = {
      position: "absolute",
      width: 510,
      height: 330,
      left: 50,
      top: 40
    };
    me.changeRem(me.accidentCompany);
    /* 该隐患相关企业规模分析 */
    me.scaleAnalysis = {
      position: "absolute",
      width: 600,
      height: 399,
      top: 112,
      left: 42
    }
    me.changeRem(me.scaleAnalysis);

    me._resize = me._windowResizeHandler.bind(this);
  }

  changeRem(dist) {
    const me = this;
    for (let n in dist) {
      if (n === 'width' || n === 'height' || n === 'left' || n === 'top' || n === 'right') {
        dist[n] = dist[n] / 100 + 'rem';
      }
    }
  }

  toPage() {
    window.location.hash = "intelligent-analysis";
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
  }

  render() {
    let me = this;
    return (
      <div>
        <div className="association-analysis-item-title" >
          <p>{me.state.name}</p>
          <p onClick={me.toPage.bind(this)} >返回</p>
        </div>
        <Panel style={me.scaleAnalysis} title={"该事故相关企业规模分析"}>
          <SingleBar type={2} width={'6rem'} height={'3.99rem'} top={'-.1rem'} ref={'scaleAnalysis'} />
        </Panel>
        <Panel style={me.companyHas} title={"该企业事故趋势分析"}>
          <Line width={'6rem'} height={'4rem'} xaxisName={"风险值"} yname={"企业数"} yaxisName={"( 家 )"} ref="analysisCompanyRef" />
        </Panel>
        <Panel style={me.company} title={"易发生该事故企业  "}>
          <AccidentCompanyEasy style={me.accidentCompany} ref={'accidentCompanyRef'} />
        </Panel>
        <Panel title={"该事故相关企业执法分析"} style={me.accidentLevel}>
          <CirclePieChart width={'6rem'} height={'4rem'} ref="circlePieChart"></CirclePieChart>
          <div className="circlePieChart active"></div>
          <div className="circlePieChartBig active"></div>
        </Panel>
        <Panel title={"该事故相关企业安全分析"} style={me.water}>
          <div className="waterBox" style={{ position: 'absolute', left: 0, bottom: 0, width: '2rem', height: '100%' }}>
            <Circle style={{ width: '1.4rem', height: '1.4rem', position: 'absolute', left: '.3rem', top: '1.1rem', zIndex: 10 }} ref={'standardizationCircle'}></Circle>
            <WaterPolo width={'0.8rem'} top={'1.4rem'} left={'0.6rem'} ref={'standardizationWater'} />
            <div style={{ position: 'relative', width: '100%', textAlign: 'center', color: '#fff', fontSize: '.14rem', top: '2.7rem' }}>进行过安全标准化</div>
          </div>
          <div className="waterBox" style={{ position: 'absolute', left: "2rem", bottom: 0, width: '2rem', height: '100%' }}>
            <Circle style={{ width: '1.4rem', height: '1.4rem', position: 'absolute', left: '.3rem', top: '1.1rem', zIndex: 10 }} ref={'safetyCircle'}></Circle>
            <WaterPolo width={'0.8rem'} top={'1.4rem'} left={'0.6rem'} ref={'safetyWater'} />
            <div style={{ position: 'relative', width: '100%', textAlign: 'center', color: '#fff', fontSize: '.14rem', top: '2.7rem' }}>进行过安全培训</div>
          </div>
          <div className="waterBox" style={{ position: 'absolute', left: "4rem", bottom: 0, width: '2rem', height: '100%' }}>
            <Circle style={{ width: '1.4rem', height: '1.4rem', position: 'absolute', left: '.3rem', top: '1.1rem', zIndex: 10 }} ref={'personnelCircle'}></Circle>
            <WaterPolo width={'0.8rem'} top={'1.4rem'} left={'0.6rem'} ref={'personnelWater'} />
            <div style={{ position: 'relative', width: '100%', textAlign: 'center', color: '#fff', fontSize: '.14rem', top: '2.7rem' }}>配备了安全人员</div>
          </div>
        </Panel>
        <Panel title={"该事故相关企业隐患排查分析"} style={me.investigation}>
          <CirclePieChart width={'6rem'} height={'4rem'} ref="selfCheckRef"></CirclePieChart>
          <div className="circlePieChart active" style={{ marginTop: '-.79rem' }}></div>
          <div className="circlePieChartBig active" style={{ marginTop: '-.325rem' }}></div>
        </Panel>
      </div >
    )
  }

  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  };

  getParams() {
    let dist = {};
    let stroage = window.sessionStorage;
    dist.startDate = stroage.getItem('startDate');
    dist.endDate = stroage.getItem('endDate');
    dist.accidentType = stroage.getItem('accidentType');
    return dist;
  };

  componentDidMount() {
    let me = this;

    /*该隐患相关企业安全分析*/
    me._tokens.push(api.safeAnalysis.send(me.params)
      .then(res => {
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

    /*该隐患相关企业执法分析*/
    // me._tokens.push(api.lawEnforce.send(me.params)
    //   .then(res => {
    //     let lawEnforceData = {
    //       "series": [
    //         { "value": "0", "name": "曾被执法" },
    //         { "value": "0", "name": "未被执法过" },
    //       ],
    //       "legend": ["曾被执法", "未被执法过"],
    //     }
    //     lawEnforceData.series = res.data;
    //     me.refs.circlePieChart._setData(lawEnforceData);
    //   }));
    let lawEnforceData = {
      "series": [
        { "value": "10", "name": "曾被执法" },
        { "value": "10", "name": "未被执法过" },
      ],
      "legend": ["曾被执法", "未被执法过"],
      "unit": "起"
    }
    me.refs.circlePieChart._setData(lawEnforceData);

    /* 存在相似隐患企业 */
    /**该隐患相关企业规模分析 */
    me.refs.scaleAnalysis._hide()
    me._tokens.push(api.accidentScaleAnalysis.send(me.params)
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

    // let scaleAnalysis = {
    //   Xdata: ["大型", "中型", "小型", "微型"],
    //   seriesData: ["200", "421", "240", "180"],
    //   switch: true
    // };
    // me.refs.scaleAnalysis._setData(scaleAnalysis)

    /*该隐患相关企业隐患排查分析   上右下左原则*/
    // me._tokens.push(api.investigation.send(me.params)
    //   .then(res => {
    //     let standardization = {
    //       value: '0',
    //       rate: '0%',
    //       color: '#f6d925'
    //     };
    //     for (let i = 0; i < res.data.length; i++) {
    //       standardization.value = res.data[i].rate;
    //       standardization.rate = res.data[i].value;
    //       if (res.data[i].name === "进行过安全巡查未安全自查") {
    //         me.refs.inspectingUnSelfExaminationCounter.innerHTML = standardization.rate;
    //         me.refs.inspectingUnSelfExaminationPercent.innerHTML = `${standardization.value}%`;
    //         me.refs.inspectingUnSelfExaminationCircle.setData(standardization);
    //         me.refs.inspectingUnSelfExaminationWater.setData(standardization);
    //       } else if (res.data[i].name === "进行过安全巡查与安全自查") {
    //         standardization.color = '#00c6fe'
    //         me.refs.inspectingSelfExaminationCounter.innerHTML = standardization.rate;
    //         me.refs.inspectingSelfExaminationPercent.innerHTML = `${standardization.value}%`;
    //         me.refs.inspectingSelfExaminationCircle.setData(standardization);
    //         me.refs.inspectingSelfExaminationWater.setData(standardization);
    //       } else if (res.data[i].name === "未进行过安全巡查与进行过安全自查") {
    //         standardization.color = '#2d7aff';
    //         me.refs.unInspectingSelfExaminationCounter.innerHTML = standardization.rate;
    //         me.refs.unInspectingSelfExaminationPercent.innerHTML = `${standardization.value}%`;
    //         me.refs.unInspectingSelfExaminationCircle.setData(standardization);
    //         me.refs.unInspectingSelfExaminationWater.setData(standardization);
    //         // console.log(standardization)
    //       } else if (res.data[i].name === "未进行过安全巡查与未进行过安全自查") {
    //         standardization.color = '#039d74'
    //         me.refs.unInspectingUnSelfExaminationCounter.innerHTML = standardization.rate;
    //         me.refs.unInspectingUnSelfExaminationPercent.innerHTML = `${standardization.value}%`;
    //         me.refs.unInspectingUnSelfExaminationCircle.setData(standardization);
    //         me.refs.unInspectingUnSelfExaminationWater.setData(standardization);
    //       }
    //     }
    //   }));

    me._tokens.push(api.investigation.send(me.params)
      .then(res => {
        let selfCheckData = {
          "series": res.data,
          "legend": res.data.map(s => s.name),
          "unit": "家"
        }
        me.refs.selfCheckRef._setData(selfCheckData);
      }));

    /* 已发生该事故的企业画像 */
    // me._tokens.push(api.analysiscompany.send(me.params)
    //   .then(res => {
    //     let data = res.data;
    //     me.refs.analysisCompanyRef._setData(data);
    //   }));

    /* 该事故企业风险分析 */
    me._tokens.push(api.analysiscompany.send(me.params)
      .then(res => {
        // console.log(res)
        let data = me.lineDataDeal(res.data, 1);
        data.name = me.refs.analysisCompanyRef._setData(data);
      }));

    /* 易发生该事故企业 */
    me._tokens.push(api.accidentCompany.send(me.params)
      .then(res => {
        let data = res.data;
        me.refs.accidentCompanyRef._setData(data);
      }));

    window.addEventListener('resize', me._resize);
  }

  _windowResizeHandler() {
    const me = this;
    const keys = Object.keys(me.refs);
    keys.map(t => {
      // console.log(t);
      try {
        me.refs[t].resize();
      } catch (err) {

      }
    })
  }

  /* 折线图数据处理 */
  lineDataDeal(data, name) {
    let arr = data;
    let dist = { axis: [], data: [] };
    arr.forEach((s, i) => {
      dist.axis.push(s.date);
      dist.data.push(s.value);
    });
    return dist;
  };

  componentWillUnmount() {
    this._clearTokens();
  };
}

export default IntelligentAnalysisItem;
