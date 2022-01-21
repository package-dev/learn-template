import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Alert, AlertIOS} from './Alert'

export default class AlertMessage extends Component {
  static _ref = null

  static setRef (ref = {}) {
    AlertMessage._ref = ref
  }

  static getRef () {
    return AlertMessage._ref
  }

  static clearRef () {
    AlertMessage._ref = null
  }
  /**
   *
   * @param {Object} options
   */
  static show (options) {
    if (AlertMessage._ref) AlertMessage._ref.show(options)
  }

  static hide () {
    if (AlertMessage._ref) AlertMessage._ref.hide()
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
        <AlertIOS
          title={this.state.title}
          message={this.state.message}
          buttons={this.state.buttons}
          actionForAll={this.hide}
          {...this.props}
        />
      </Alert>
    )
  }
}
