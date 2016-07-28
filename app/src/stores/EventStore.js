/**
 * Refs:
 * * http://alt.js.org/docs/createStore/
 */

import alt from 'components/Dispatcher';
import log from 'loglevel';

import EventActions from 'actions/EventActions';
import EventSource from 'sources/EventSource';

log.setLevel('debug');

export class EventStore {

  constructor() {
  	this.events = [];
    this.isLoading = false;
    this.bindActions(EventActions);
    this.registerAsync(EventSource);
  }

  getEventsLoading = (data) => {
    log.debug('getEventsLoading called.');
    this.setState({
      isLoading: true
    })
  }

  getEventsSuccess = (data) => {
    log.info('EventStore.getEventsSuccess called. data=', data);
    this.setState({
      events: data || [],
      isLoading: false
    })
  }

  getEventsError(data) {
    log.error('getEventsError called. data=', data);
  }

  addEventSuccess = (data) => {
    log.info('EventStore.addEventSuccess called. data=', data);
  }

  addEventError(data) {
    log.error('addEventError called. data=', data);
  }
}

export default alt.createStore(EventStore, 'EventStore');
