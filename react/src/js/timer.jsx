
import React, { Component } from 'react'
import { humanize } from './util'

export default class Timer extends Component {
  static get propTypes() {
    return {
      limit: React.PropTypes.number.isRequired,
      onLimit: React.PropTypes.func,
      onTick: React.PropTypes.func
    }
  }

  static get defaultProps() {
    return {
      onLimit: () => {},
      onTick: () => {}
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      timeoutID: -1,
      startAt: -1,
      past: 0 // 秒
    }
  }

  render() {
    const rest = this.getRestTime()
    const style = {
      'transform': `rotate(${360 * (rest)}deg)`
    }

    return (
      <div style={{ height: '100%' }}>
        <div className='logo second-hand'>
          <h1>Builderscon</h1>
          <img src='./logo-flat.png' style={style}/>
        </div>
        <time>{humanize(this.props.limit - this.state.past)}</time>
      </div>
    )
  }

  getRestTime() {
    return this.state.past / this.props.limit
  }

  handleLimit() {
    this.props.onLimit()
    this.stop()
  }

  tick() {
    const past = (new Date() - this.state.startAt) / 1000
    this.setState({
      past: past
    })

    this.props.onTick(past)

    if (past >= this.props.limit) {
      this.handleLimit()
    }
  }

  start() {
    this.setState({
      startAt: new Date(),
      timeoutID: setInterval(this.tick.bind(this), 1000)
    })
  }

  stop() {
    clearInterval(this.state.timeoutID)
    this.setState({
      past: 0,
      timeoutID: -1
    })
  }
}
