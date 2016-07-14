
import React, { Component } from 'react'
import _ from 'lodash'
import Header from './header'
import Config from './config'
import Timer from './timer'
import Toolbar from './toolbar'
import SE from './se'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = this.getDefaultState()
  }

  getDefaultState() {
    return {
      limit: this.props.choices[0].total,
      restTimeClassName: '',
      running: false
    }
  }

  render() {
    return (
      <div className={'rest-time ' + this.state.restTimeClassName} onClick={this.handleClickScreen.bind(this)}>
        <Header />
        <SE ref="se" sound={this.props.sound} />
        <Timer ref="timer" limit={this.state.limit} onTick={this.handleTick.bind(this)} onLimit={this.handleLimit.bind(this)} />
        <Toolbar>
          <button disabled={this.state.running} onClick={this.handleClickStart.bind(this)}>Start</button>
          <Config disabled={this.state.running} choices={this.props.choices} onChange={this.handleChangeLimit.bind(this)} />
          <button onClick={this.handleClickStop.bind(this)}>Stop</button>
        </Toolbar>
      </div>
    )
  }

  handleClickScreen() {
    this.refs.se.load()
  }

  handleClickStart() {
    this.refs.timer.start()
    this.setState({ running: true })
  }

  handleClickStop() {
    this.refs.timer.stop()
    this.setState({ running: false })
  }

  handleChangeLimit(limit) {
    this.setState({
      limit
    })
  }

  handleTick(past) {
    this.setState({
      restTimeClassName: this.getRestTimeClass(past)
    })
  }

  handleLimit() {
    this.refs.se.play()
    this.setState(_.pick(this.getDefaultState(), 'restTimeClassName', 'running'))
  }

  // いい感じに閾値調整して下さい
  // 0 <= rest <= 1
  // rest = 残時間のパーセンテージ
  getRestTimeClass(rest) {
    const choice = this.getCurrentChoise()
    const offset = this.getNotificationOffset(rest, choice)
    const classes = this.getRestTimeClasses(choice)
    const idx = Math.max(classes.length - offset, 0)

    return classes[idx]
  }

  getRestTimeClasses(choice) {
    const classes = [
      'notice',
      'warning',
      'danger'
    ]

    return [''].concat(classes.slice(-choice.notifications.length))
  }

  getChoise(total) {
    for (let t of this.props.choices) {
      if (t.total === total) return t
    }

    throw new Error(`Unknown total: ${total}`)
  }

  getCurrentChoise() {
    return this.getChoise(this.state.limit)
  }

  getNotificationOffset(past, choice) {
    past = parseInt(past)
    const timings = [0].concat(choice.notifications).concat([choice.total])

    return _.findIndex(timings.reverse(), n => past > n)
  }
}
