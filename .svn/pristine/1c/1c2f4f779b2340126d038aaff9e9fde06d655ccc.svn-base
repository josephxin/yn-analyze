import React from 'react';
import './overall-situation.css';

import OverallSituationItem from './OverallSituationItem';

const styles = [
  { top: 0, left: 0 },
  { top: 0, right: 0 },
  { bottom: 0, left: 0 },
  { bottom: 0, right: 0 }
];

const data = [
  {
    name: '事故总起数',
    value: 1669,
    unit: '起'
  },
  {
    name: '直接经济损失',
    value: 4159,
    unit: '万元'
  },
  {
    name: '死亡人数',
    value: 1603,
    unit: '人'
  },
  {
    name: '受伤人数',
    value: 644,
    unit: '人'
  }
];

/*
* 事故总览-中上部-整体情况
* @author msh
* */
class OverallSituation extends React.Component {
  isRealUpdate = false;

  constructor() {
    super();
    let me = this;
    me.state = { data };
  }

  upDate(data) {
    let me = this;
    me.isRealUpdate = true;
    me.setState({ data });
  }

  render() {
    let me = this;
    const props = me.props;
    //console.log(me.isRealUpdate);
    if (!me.isRealUpdate) return false;
    me.isRealUpdate = false;
    let _data = me.state.data;
    const width = props.width;
    const height = props.height;
    const top = props.top;
    return (
      <div
        style={{
          width,
          height,
          top
        }}
        className={'overall-situation'}
      >
        {
          _data.map((t, i) => {
            let style = styles[i];
            return (
              <OverallSituationItem
                key={`overall-situation-${i}`}
                style={style}
                type={i}
                title={t.name}
                value={t.value}
                unit={t.unit}
              />
            )
          })
        }
      </div>
    );
  }

  componentDidUpdate() {
  }
}

export default OverallSituation;
