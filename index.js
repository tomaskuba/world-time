import React from 'react'
import { render } from 'react-dom'
import moment from 'moment-timezone'

moment.locale('en');

var Timer = React.createClass({
  tick: function () {
    return {
      time: moment().tz(this.props.timezone).format('HH:mm:ss'),
      date: moment().tz(this.props.timezone).format('dddd ll'),
      zone: moment().tz(this.props.timezone).format('z'),
      zoneDiff: moment().tz(this.props.timezone).format('Z'),
      hoursPosition: {
        transform: 'rotateZ(' + (30 * moment().tz(this.props.timezone).format('h')) + 'deg)'
      },
      minutesPosition: {
        transform: 'rotateZ(' + (6 * moment().tz(this.props.timezone).format('mm')) + 'deg)'
      },
      secondsPosition: {
        transform: 'rotateZ(' + (6 * moment().tz(this.props.timezone).format('ss')) + 'deg)'
      }
    }
  },
  getInitialState: function() {
    return this.tick();
  },
  componentDidMount: function() {
    var self = this
    this.interval = setInterval(()=>self.setState(self.tick()), 1000)
  },
  componentWillUnmount: function() {
    clearInterval(this.interval)
  },
  render: function() {
    return (
      <div className="timer">
        <div className="location">{this.props.name}</div>
        <div className="clock">
          <div className="hours-container" style={this.state.hoursPosition}>
            <div className="hours"></div>
          </div>
          <div className="minutes-container" style={this.state.minutesPosition}>
            <div className="minutes"></div>
          </div>
          <div className="seconds-container" style={this.state.secondsPosition}>
            <div className="seconds"></div>
          </div>
        </div>
        <div className="time">{this.state.time}</div>
        <div className="zone">{this.state.zone} {this.state.zoneDiff}</div>
        <div className="date">{this.state.date}</div>
      </div>
    )
  }
})

var App = React.createClass({
  render: function() {
    return (
      <div className="world-time">
        <div className="row">
          <Timer timezone='America/Los_Angeles' name='Los Angeles' />
          <Timer timezone='America/New_York' name='New York' />
          <Timer timezone='Europe/Prague' name='Prague' />
          <Timer timezone='Asia/Manila' name='Manila' />
          <Timer timezone='Australia/Sydney' name='Sydney' />
        </div>
      </div>
    )}
})

render(
  <App />,
  document.getElementById('root')
)