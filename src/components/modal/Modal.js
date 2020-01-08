/*
*
* author  张会冉
*
* name  模态窗口封装
*
* usemethod：
*
* import Modal 后
*
* <Modal content={"标题内容"} width={"800"} height={"600"} ref='回调函数名称' />
*
* 回调函数里setState(display:"block")
*
* */

import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      display: 'none',
    }
  }

  open() {
    this.setState({
      display: 'block'
    })
  }

  close() {
    this.setState({
      display: 'none'
    });
  }

  render() {
    let me = this;
    let boxStyle = Object.assign({
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 800,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.3)'
    }, me.state);

    let bgImg = me.props.type ? 'modalb' : 'modal';
    if (me.props.type === 2) {
      bgImg = 'modalc';
    }
    return (
      <div ref='change' style={boxStyle}>
        <div className={bgImg} style={{
          width: this.props.width,
          height: this.props.height,
          position: 'absolute',
          left: '50%',
          top: '50%',
          zIndex: '9',
          transform: 'translate(-50%,-50%)',
          display: this.state.display
        }}>
          <p style={{
            color: '#fff',
            fontSize: '0.2rem',
            width: '100%',
            height: '0.6rem',
            lineHeight: '0.6rem',
            position: 'absolute',
            top: 0,
            fontWeight: 600,
            textAlign: 'center'
          }}>{this.props.content}</p>
          <span onClick={this.close.bind(this)} style={{
            width: '0.5rem',
            height: '0.5rem',
            position: 'absolute',
            right: 10,
            top: '0.4rem',
            cursor: 'pointer',
            zIndex: 99
          }}></span>
          <div style={{
          	position: 'relative',
          	overflow: 'hidden',
            marginTop: '0.6rem',
            height: 'calc(100% - 0.6rem)'
          }}>
          	{this.props.children}
          </div>
        </div>
      </div>
    )
  }

}

export default Modal;
