
import React from 'react'
import ReactDOM from 'react-dom'
import { PRESETS } from 'builderscon-session-timer-domain'
import App from './app'
import { toSeconds } from './util'

// 鳴らす音。差し替えて下さい。参考: http://qiita.com/volkuwabara/items/be3b4d7864ab7d779019
const se = 'http://jsrun.it/assets/f/S/f/q/fSfqC.mp3'

// https://github.com/builderscon/session-timer/issues/24
const choices = PRESETS.map(preset => ({
  total: toSeconds(preset.total),
  notifications: Object.keys(preset.notifications).map(toSeconds)
}))

ReactDOM.render(<App sound={se} choices={choices}/>, document.getElementById('timer'))
