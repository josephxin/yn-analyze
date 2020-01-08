import React, { Component } from 'react';
import {
  Scaler,
  MODE_NORMAL,
  MODE_WIDTH,
  MODE_HEIGHT,
  MODE_FULL,
  MODE_NONE,
  MODE_DEBUG
} from '@jusfoun-vis/scaler';

/**
 * React缩放管理器。
 * 注意！为保证各组件处理缩放逻辑的统一，请在2017-12-31之后的所有项目中使用此形式的缩放管理器！
 * @author Molay
 */
class ResizeManager extends Component {
  /**
   * 通用模式，取全屏居中比例。
   * @type {number}
   */
  static MODE_NORMAL = MODE_NORMAL;
  /**
   * 宽度自适应模式。
   * @type {number}
   */
  static MODE_WIDTH = MODE_WIDTH;
  /**
   * 高度自适应模式。
   * @type {number}
   */
  static MODE_HEIGHT = MODE_HEIGHT;
  /**
   * 铺满模式，会产生形变。
   * @type {number}
   */
  static MODE_FULL = MODE_FULL;
  /**
   * 沉默模式，不执行任何操作。
   * @type {number}
   */
  static MODE_NONE = MODE_NONE;
  /**
   * 调试模式，按住shift键双击任意内容区，即可在MODE_NORMAL与MODE_NONE之间切换。
   * @type {number}
   */
  static MODE_DEBUG = MODE_DEBUG;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let me = this;
    let props = me.props;
    let scaler = new Scaler(props.mode, props.fullWidth, props.fullHeight);
    me._scaler = scaler;
    scaler.manage();
  }

  componentWillUnmount() {
    let me = this;
    me._scaler.unmanage();
  }

  render() {
    return false;
  }
}

export default ResizeManager;
