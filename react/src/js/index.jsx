
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// 鳴らす音。差し替えて下さい。参考: http://qiita.com/volkuwabara/items/be3b4d7864ab7d779019
const se = 'http://jsrun.it/assets/f/S/f/q/fSfqC.mp3'

// 
const choices = {
  60: '01:00',
  300: '05:00',
  900: '15:00',
  1800: '30:00',
  3600: '60:00'
}

ReactDOM.render(<App sound={se} choices={choices}/>, document.getElementById('timer'))
