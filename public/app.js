
class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeoutID: -1,
      startAt: -1,
      past: 0 // 秒
    };
  }

  render() {
    const rest = this.getRestTime();
    const humanizeTime = this.humanizeTime(this.props.limit - this.state.past);
    const style = {
      'transform': `rotate(${ 360 * rest }deg)`
    };

    return React.createElement(
      "div",
      null,
      React.createElement(
        "time",
        null,
        "@",
        humanizeTime
      ),
      React.createElement(
        "div",
        { className: "logo second-hand", style: style },
        React.createElement("img", { src: "http://builderscon.io/assets/images/hex_logo.png" })
      )
    );
  }

  humanizeTime(rest) {
    const padd = (n, digit = 2) => ('0'.repeat(digit) + n).substr(-digit);
    const minutes = Math.floor(rest / 60);
    const seconds = Math.round(rest % 60);

    return `${ padd(minutes) }:${ padd(seconds) }`;
  }

  getRestTime() {
    return this.state.past / this.props.limit;
  }

  handleLimit() {
    this.props.onLimit();
    this.stop();
  }

  tick() {
    const past = (new Date() - this.state.startAt) / 1000;
    this.setState({
      past: past
    });

    this.props.onTick(past);

    if (past > this.props.limit) {
      this.handleLimit();
    }
  }

  start() {
    this.setState({
      startAt: new Date(),
      timeoutID: setInterval(this.tick.bind(this), 1000)
    });
  }

  stop() {
    this.setState({
      past: 0
    });
    clearInterval(this.state.timeoutID);
  }
}

class SE extends React.Component {
  render() {
    return React.createElement(
      "audio",
      { preload: "auto", ref: "se" },
      React.createElement("source", { src: this.props.sound, type: "audio/mp3" })
    );
  }

  play() {
    this.refs.se.currentTime = 0;
    this.refs.se.play();
  }
}

class Config extends React.Component {
  render() {
    return React.createElement(
      "select",
      { onChange: this.handleChange.bind(this) },
      Object.keys(this.props.choices).map(seconds => React.createElement(
        "option",
        { key: seconds, value: seconds },
        this.props.choices[seconds]
      ))
    );
  }

  handleChange(e) {
    this.props.onChange(+e.currentTarget.value);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: +Object.keys(props.choices)[0],
      restTimeClassName: ''
    };
  }

  render() {
    return React.createElement(
      "div",
      { className: 'rest-time ' + this.state.restTimeClassName },
      React.createElement(SE, { ref: "se", sound: this.props.sound }),
      React.createElement(Timer, { ref: "timer", limit: this.state.limit, onTick: this.handleTick.bind(this), onLimit: this.handleLimit.bind(this) }),
      React.createElement(Config, { choices: this.props.choices, onChange: this.handleChangeLimit.bind(this) }),
      React.createElement(
        "button",
        { onClick: this.handleClickStart.bind(this) },
        "Start"
      ),
      React.createElement(
        "button",
        { onClick: this.handleClickStop.bind(this) },
        "Stop"
      )
    );
  }

  handleClickStart() {
    this.refs.timer.start();
  }

  handleClickStop() {
    this.refs.timer.stop();
  }

  handleChangeLimit(limit) {
    this.setState({
      limit
    });
  }

  handleTick(past) {
    const restTimeClassName = this.getRestTimeClass(past / this.state.limit);

    this.setState({
      restTimeClassName
    });
  }

  handleLimit() {
    this.refs.se.play();
    this.setState({
      restTimeClassName: ''
    });
  }

  // いい感じに閾値調整して下さい
  // 0 <= rest <= 1
  // rest = 残時間のパーセンテージ
  getRestTimeClass(rest) {
    if (rest >= 0.92) {
      // ex. 残5分 / 60分セッション
      return 'danger';
    } else if (rest >= 0.83) {
      // ex. 残10分 / 60分セッション
      return 'warning';
    } else if (rest >= 0.75) {
      // ex. 残15分 / 60分セッション
      return 'notice';
    } else {
      return '';
    }
  }
}

// 鳴らす音。差し替えて下さい。参考: http://qiita.com/volkuwabara/items/be3b4d7864ab7d779019
const se = 'http://jsrun.it/assets/f/S/f/q/fSfqC.mp3';

//
const choices = {
  60: '60秒',
  300: '5分',
  900: '15分',
  1800: '30分',
  3600: '60分'
};

ReactDOM.render(React.createElement(App, { sound: se, choices: choices }), document.getElementById('timer'));
