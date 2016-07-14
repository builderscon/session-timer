
import React, { Component } from 'react'

/**
 * iOS safariはAudioタグの音声を読み込むためにtouchイベント（ユーザ操作）が必要
 *
 * @see http://www.ibm.com/developerworks/library/wa-ioshtml5/
 */
export default class SE extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  render() {
    return (
      <audio preload="auto" ref="se">
        <source src={this.props.sound} type="audio/mp3" />
      </audio>
    )
  }

  load() {
    if (this.state.loaded) return

    this.refs.se.load()
    this.setState({ loaded: true })
  }

  play() {
    this.refs.se.currentTime = 0
    this.refs.se.play()
  }

  pause() {
    this.refs.se.pause()
    this.refs.se.currentTime = 0
  }
}
