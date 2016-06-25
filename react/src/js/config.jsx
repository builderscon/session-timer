
import React, { Component, PropTypes } from 'react'

class Config extends Component {
  render() {
    return (
      <select disabled={this.props.disabled} onChange={this.handleChange.bind(this)}>
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

Config.propTypes = {
  disabled: PropTypes.bool,
  choices: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}
Config.defaultProps = {
  disabled: false
}

export default Config
