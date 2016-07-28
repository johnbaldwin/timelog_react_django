'use strict';

import React from 'react';

import Event from './Event';
import NewEvent from './NewEvent';
import EventActions from 'actions/EventActions';

require('styles//EventsPanel.scss');

export default class EventsPanel extends React.Component {

  createEvent(event) {
    EventActions.create(event);
  }

  render() {
    let events = this.props.events;
    return (
      <div className="eventsPanel">
        <div className="eventsList">
          {
            events.map(function(event, index) {
              return (<Event key={index}
                textValue={event.text}
                timestamp={event.ts} />);
            })
          }
        </div>
        <NewEvent onAdd={this.createEvent} />
      </div>
    );
  }
}
EventsPanel.defaultProps = {
  events: []
}
