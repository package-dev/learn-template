import {ViewCore} from '../index'
import React, {Component} from 'react'
import {Animated, Modal, Text, View} from 'react-native'
// import {Alert, AlertIOS} from './Alert'
import Loader1 from './Loader1'
import Loader2 from './Loader2'
export default class LoadingEVN extends Component {
  static _ref = null

  static setRef (ref = {}) {
    LoadingEVN._ref = ref
  }

  static getRef () {
    return LoadingEVN._ref
  }

  static clearRef () {
    LoadingEVN._ref = null
  }
  /**
   *
   * @param {Object} options
   */
  static show (options) {
    if (LoadingEVN._ref) LoadingEVN._ref.show(options)
  }

  static hide () {
    if (LoadingEVN._ref) LoadingEVN._ref.hide()
  }

  constructor (props) {
    super(props)

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this._setState = this._setState.bind(this)
    this.state = {
      visible: this.props.visible,
      title: this.props.title,
      message: this.props.message,
      buttons: this.props.buttons,
    }
  }
  /**
   *
   * @param {Object} options
   */
  show (options) {
    this._setState(prevState => ({
      ...prevState,
      visible: true,
      ...options,
    }))
  }

  hide () {
    this._setState(prevState => ({
      ...prevState,
      visible: false,
    }))
  }

  _setState (reducer) {
    return new Promise(resolve => this.setState(reducer, () => resolve()))
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const {message, buttons, title, visible, actionForAll} = nextProps
    this.setState({message, buttons, title, visible, actionForAll})
  }

  render () {
    return (
      <Alert visible={this.state.visible} onRequestClose={this.hide}>
        <Loader1 />
        {/* <Loader2 /> */}
      </Alert>
    )
  }
}
const Alert = ({onRef, visible = false, children, ...rest}) => {
  return (
    <Modal
      ref={onRef}
      visible={visible}
      {...rest}
      transparent={true}
      statusBarTranslucent={true}
      animationType='fade'>
      <ViewCore flex1 midle backgroundColor='#9E9E9E1C'>
        {children}
      </ViewCore>
    </Modal>
  )
}
