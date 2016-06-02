
import React, { Component } from 'react'

export default class SE extends Component {
  render() {
    return (
      <audio preload="auto" ref="se">
        <source src={this.props.sound} type="audio/mp3" />
      </audio>
    )
  }

  play() {
    this.refs.se.currentTime = 0
    this.refs.se.play()
  }
}
