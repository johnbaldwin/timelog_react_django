'use strict';

import log from 'loglevel';
import React from 'react';
import moment from 'moment';

import EventStore from 'stores/EventStore';

require('styles//NewEvent.scss');


/**
 * Component to represent the current time of day.
 * Right not it is only used by NewEvent, So I left it here.
 * This component updates its internal state once a second
 */
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeVal: null
    }
  }

  componentWillMount() {
    this.setTime();
  }

  componentDidMount() {
    window.setInterval(function() {
      this.setTime();
    }.bind(this), 1000);
  }

  setTime() {
    let currTime = Date.now();
    this.setState({
      currTime: currTime
    });
  }

  timeStr() {
    if (this.state.timeVal) {
      return moment(this.state.timeVal).format(this.props.timeFormat)
    } else {
      return moment().format(this.props.timeFormat)
    }
  }
  render() {
    return (<div className="dateTime">{this.timeStr()}</div>);
  }
}
Clock.defaultProps = {
  timeFormat: 'h:mm:ss a'
}


/**
 * This component provides a text entry box and a clock so the user can
 * enter new text. The component triggers an EventStore.addEvent call when
 * the enter key is pressed, saving the entry.
 */
export default class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: props.textValue,
      modified: false,
      saved: false
    };
    log.setLevel('debug');
  }

  componentWillReceiveProps(props) {
    this.setState({
      textValue: props.textValue,
      modified: (props.modified) ? props.modified : false
    });
  }

  handleChangeText(e) {
    this.setState({
      textValue: e.target.value
    });
  }

  handleOnKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleOnSave(e);
    }
  }

  handleOnSave(e ) {
    this.props.saveCallback(e);
    this.setState({
      textValue: ''
    });
  }

  render() {
    let clock = null;
    if (this.props.showClock) {
      clock = (<Clock />);
    }

    return (
      <div className="newEvent">
        {clock}
        <input className="textInput" type="text"
          value={this.state.textValue}
          onChange={this.handleChangeText.bind(this)}
          onKeyPress={this.handleOnKeyPress.bind(this)}
          placeholder={this.props.placeholderText}
        />
      </div>
    );
  }
}

NewEvent.defaultProps = {
  showClock: true,
  placeholderText: 'say something',
  textValue: '',
  onUpdate: function(e) {
    log.debug('NewEvent.props.onUpdate called. e.target.value=',
      e.target.value);
  },
  saveCallback: function(e) {
    // TODO: Figure out best place for this
    // A) leave here. If we do, then this is the default behavior and we
    // want to be able to override it
    // B) put in main app
    log.debug('NewEvent.props.onSave called. e.target.value=',
      e.target.value);
    let timestamp = Date.now();
    EventStore.addEvent({ts: timestamp, text: e.target.value})
      .then(function() {
        EventStore.getEvents();
      }).catch(function() {

    });
  }
}
