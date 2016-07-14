
import React, { Component, PropTypes } from 'react'
import { humanize } from './util'

class Config extends Component {
  render() {
    return (
      <select disabled={this.props.disabled} onChange={this.handleChange.bind(this)}>
        {this.props.choices.map(choice =>
          <option key={choice.total} value={choice.total}>
            {`${humanize(choice.total)} (${choice.notifications.map(humanize).join(', ')})`}
          </option>
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
  choices: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}
Config.defaultProps = {
  disabled: false
}

export default Config
