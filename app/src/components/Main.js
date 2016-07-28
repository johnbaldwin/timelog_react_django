require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

import log from 'loglevel';

log.setLevel('debug');

import EventStore from 'stores/EventStore';

let timelogImage = require('../images/eggtimer.svg');

import EventsPanel from './EventsPanel';

class AppComponent extends React.Component {

  constructor(props) {
  	super(props);
  	log.debug('AppComponent.constructor called');
  	this.state = EventStore.getState();
  	EventStore.listen(this.storeListener);
  }
  storeListener = (state) => {
  	this.setState(state);
  }
  componentDidMount() {
  	log.debug('AppComponent.componentDidMount called');
  	EventStore.getEvents();
  }

  componentDidReceiveProps(props) {
    log.debug('AppComponent.componentDidReceiveProps called');
  }

  render() {
    log.debug('Main.render called');

    return (
      <div className="app-container">
          <img src={timelogImage} alt="Egg timer" />
          <EventsPanel events={this.state.events}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
