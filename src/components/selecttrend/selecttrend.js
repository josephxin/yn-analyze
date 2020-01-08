import React, { Component } from 'react';
import './selecttrend.css';

/*
* 事故智能分析 折线图 选择按钮
* @author xy
* */
class SelectTrend extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      change: 1
    };
  };

  changeState = 1;
  
  changeData(index, e) {
    let me = this;
    //console.log(index, e);
    if (me.changeState !== index && index) {
      me.changeState = index;
      me.setState({ change: me.changeState });
      me.props.changeData(index);
    };
  };

  render() {
    let me = this;
    return (
      <div className="credic-info" style={{
      	position: "absolute",
        right: '0.07rem',
        top: '0.08rem'
      }}>
        <p className={me.state.change === 1 ? "active" : ""} style={{marginRight: '0.08rem'}} onClick={me.changeData.bind(this, 1)}>{me.props.selected}</p>
        <p className={me.state.change === 2 ? "active" : ""} onClick={me.changeData.bind(this, 2)}>{me.props.select}</p>
      </div>
    )
  };

  componentDidMount() { };

  componentDidUpdate() { };
}

export default SelectTrend;
