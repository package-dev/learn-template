import { Log } from '@utils/LogColor'
import React, { Component } from 'react'
import { Animated, Dimensions, Modal, Text, View } from 'react-native'
import Animations from './Animations'
import Loader2 from './Loader2'
export class LoadingApp extends Component {
  static _ref = null

  static setRef(ref = {}) {
    LoadingApp._ref = ref
  }

  static getRef() {
    return LoadingApp._ref
  }

  static clearRef() {
    LoadingApp._ref = null
  }
  /**
   *
   * @param {Object} options
   */
  static show() {
    if (LoadingApp._ref) LoadingApp._ref.show()
  }

  static hide() {
    if (LoadingApp._ref) LoadingApp._ref.hide()
  }

  constructor(props) {
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
  show(options) {
    this._setState(prevState => ({
      ...prevState,
      visible: true,
      ...options,
    }))
  }

  hide() {
    this._setState(prevState => ({
      ...prevState,
      visible: false,
    }))
  }

  _setState(reducer) {
    return new Promise(resolve => this.setState(reducer, () => resolve()))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { message, buttons, title, visible, actionForAll } = nextProps
    this.setState({ message, buttons, title, visible, actionForAll })
  }

  render() {
    return (
      <Modal
        onRequestClose={this.hide}
        visible={this.state.visible == true}
        transparent
      // statusBarTranslucent={true}
      // animationType='fade'

      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000090',
          }}>
          <View
            style={{
              width: Dimensions.get('screen').width * 0.25,
              height: Dimensions.get('screen').width * 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Animations.Loader2 />
          </View>
        </View>
      </Modal>
    )
  }
} 