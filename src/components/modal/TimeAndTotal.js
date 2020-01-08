import React from 'react';

class TimeAndTotal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="accidentNumber-items">
        <i className="accidentNumber-items-time">{this.state.startDate}至{this.state.endDate}</i>
        <span style={{
          position: 'absolute',
          right: 20,
          top: 10
        }}>
          事故总数&nbsp;
          <i className={"odd"} style={{ fontSize: 14 }}>{this.state.totals}</i>&nbsp;起</span>
      </div>
    )
  }
}

export default TimeAndTotal;
