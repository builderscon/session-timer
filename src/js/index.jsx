
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// 鳴らす音。差し替えて下さい。参考: http://qiita.com/volkuwabara/items/be3b4d7864ab7d779019
const se = 'http://jsrun.it/assets/f/S/f/q/fSfqC.mp3'

// 
const choices = {
  60: '60秒',
  300: '5分',
  900: '15分',
  1800: '30分',
  3600: '60分'
}

ReactDOM.render(<App sound={se} choices={choices}/>, document.getElementById('timer'))
