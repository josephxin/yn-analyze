import React from 'react';

import Buttoned from '../../image/buttoned.png'

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    const me = this;
    return (
      <div>
        <p style={{
          height: '0.26rem',
          width: '1.2rem',
          lineHeight: '.26rem',
          textAlign: 'center',
          color: '#fff',
          fontSize: '.16rem',
          cursor: 'pointer',
          position: 'absolute',
          top: '.08rem',
          right: '.07rem',
          zIndex: 11,
         // backgroundImage: 'url(./static/image/buttoned.png)',
         backgroundImage: `url(${Buttoned})`,
         
          backgroundSize: '100% 100%'
        }} onClick={me.props.onClick.bind(me)}>企业预测流程</p>
      </div >
    );
  }
};

export default Page;
