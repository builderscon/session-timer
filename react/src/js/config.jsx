
import React, { Component } from 'react'

export default class Config extends Component {
  render() {
    return (
      <select onChange={this.handleChange.bind(this)}>
        {Object.keys(this.props.choices).map((seconds) =>
          <option key={seconds} value={seconds}>{this.props.choices[seconds]}</option>
        )}
      </select>
    )
  }

  handleChange(e) {
    this.props.onChange(+e.currentTarget.value)
  }
}
