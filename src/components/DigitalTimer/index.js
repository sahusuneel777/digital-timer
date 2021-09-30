import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isPlay: false,
    setLimit: 25,
    elapsedTimeInSec: 0,
  }

  componentWillUnmount() {
    this.clearIntervalTimerId()
  }

  toggleIsPlay = () => {
    const {isPlay} = this.state
    this.setState(prevState => ({isPlay: !prevState.isPlay}))
    console.log(isPlay)
    this.onClickStart()
  }

  Increment = () => {
    // const {setLimit} = this.state
    this.setState(prevState => ({
      setLimit: prevState.setLimit + 1,
    }))
  }

  Decrement = () => {
    const {setLimit} = this.state
    if (setLimit > 1) {
      this.setState(prevState => ({
        setLimit: prevState.setLimit - 1,
      }))
    }
  }

  clearIntervalTimerId = () => clearInterval(this.TimerId)

  IncrementElapsedTimeInSec = () => {
    this.setState(prevState => ({
      elapsedTimeInSec: prevState.elapsedTimeInSec + 1,
    }))
  }

  resetTimer = () => {
    this.clearIntervalTimerId()
    this.setState({isPlay: false, setLimit: 25, elapsedTimeInSec: 0})
  }

  onClickStart = () => {
    const {isPlay, setLimit, elapsedTimeInSec} = this.state
    const isTimerCompleted = elapsedTimeInSec === setLimit * 60

    if (isTimerCompleted) {
      this.setState({elapsedTimeInSec: 0})
    }
    if (isPlay) {
      this.clearIntervalTimerId()
    } else {
      this.TimerId = setInterval(this.IncrementElapsedTimeInSec, 1000)
    }
  }

  getElapsedTimeInSeconds = () => {
    const {setLimit, elapsedTimeInSec} = this.state
    const totalSecondsRemaining = setLimit * 60 - elapsedTimeInSec
    const minutes = Math.floor(totalSecondsRemaining / 60)
    const seconds = Math.floor(totalSecondsRemaining % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  renderTimerPart = () => {
    const {isPlay} = this.state

    const timerStatus = isPlay ? 'Running' : 'Paused'

    return (
      <div className="timer-container">
        <h1 className="timer-value">{this.getElapsedTimeInSeconds()}</h1>
        <p className="status">{timerStatus}</p>
      </div>
    )
  }

  renderTimerController = () => {
    const {isPlay, setLimit, elapsedTimeInSec} = this.state
    const playOrPauseImg = isPlay
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playOrPauseAlt = isPlay ? 'pause icon' : 'play icon'
    const playOrPause = isPlay ? 'Pause' : 'Start'
    const isButtonsDisabled = elapsedTimeInSec > 0

    return (
      <div className="controls-container">
        <div className="stop-reset-container">
          <div className="control-input">
            <button
              type="button"
              onClick={this.toggleIsPlay}
              className="control-button"
            >
              <img
                src={playOrPauseImg}
                alt={playOrPauseAlt}
                className="controls-image"
              />
              <p className="controls">{playOrPause}</p>
            </button>
          </div>
          <div className="control-input">
            <button
              type="button"
              onClick={this.resetTimer}
              className="control-button"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                className="controls-image"
              />
              <p className="controls">Reset</p>
            </button>
          </div>
        </div>

        <div className="increase-decrease-container">
          <p className="">Set Timer Limit</p>
          <div className="increase-decrease-control">
            <button
              type="button"
              onClick={this.Decrement}
              className="increase-decrease"
              disabled={isButtonsDisabled}
            >
              -
            </button>
            <p className="set-limit">{setLimit}</p>
            <button
              type="button"
              onClick={this.Increment}
              className="increase-decrease"
              disabled={isButtonsDisabled}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="counter-container">
          {this.renderTimerPart()}
          {this.renderTimerController()}
        </div>
      </div>
    )
  }
}

export default DigitalTimer
