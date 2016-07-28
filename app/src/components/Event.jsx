'use strict';

import React from 'react';
import moment from 'moment';

require('styles//Event.scss');

export default class Event extends React.Component {
  render() {
  	const { textValue, timestamp, timeFormat, ...props } = this.props;
    let formattedTime = moment(timestamp).format(timeFormat);
    return (
      <div className="event">
        <div className="dateTime">{formattedTime}</div>
        <div className="text">{textValue}</div>
      </div>
    );
  }
}

Event.defaultProps = {
  eventText: '',
  timeFormat: 'MMM Do YYYY, h:mm a'
};
