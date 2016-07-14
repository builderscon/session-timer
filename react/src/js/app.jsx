
import React, { Component } from 'react'
import Header from './header'
import Config from './config'
import Timer from './timer'
import Toolbar from './toolbar'
import SE from './se'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: props.choices[0].total,
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
    const restTimeClassName = this.getRestTimeClass(past / this.state.limit)

    this.setState({
      restTimeClassName
    })
  }

  handleLimit() {
    this.refs.se.play()
    this.setState({
      restTimeClassName: ''
    })
  }

  // いい感じに閾値調整して下さい
  // 0 <= rest <= 1
  // rest = 残時間のパーセンテージ
  getRestTimeClass(rest) {
    if (rest>= 0.92) { // ex. 残5分 / 60分セッション
      return 'danger'
    } else if (rest>= 0.83) { // ex. 残10分 / 60分セッション
      return 'warning'
    } else if (rest>= 0.75) { // ex. 残15分 / 60分セッション
      return 'notice'
    } else {
      return ''
    }
  }
}
