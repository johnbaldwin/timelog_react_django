
/**
 * References:
 * * http://alt.js.org/docs/async/
 */

import log from 'loglevel';
import $ from 'jquery';

import EventActions from 'actions/EventActions';

log.setLevel('debug');

let mockData = [
  	  { id: '74e699ae-d47b-40e9-b7f3-9dc394e7675c',
  	  	ts: 1465049229491,
  	    text: 'A man, a plan, Panama!'
      },
      {
        id: '2492E081-A9BF-423B-8B2D-8A19B7E956E1',
        ts: 1465048229491,
        text: 'Alpha, bravo, charlie'
      }
];


if (EventActions) {
	log.debug('EventSource has EventActions=', EventActions);
} else {
	throw ('no event actions');
}


const API_PORT = 5000;

function get_data(url, resolve, reject ) {
	log.debug('jQuery.ajax call');
		$.ajax({
		url: url,
		type: 'GET',
		crossDomain: true,
		success: function(data) {
			resolve(data);
		},
		error: function(error) {
			reject(error);
		}
	});
}

function get_data_mock(url, resolve, reject) {
	log.debug('get_data_mock');
	let data = { events: mockData };
	setTimeout(function() {
		resolve(data);
	}, 250)
}

function post_data(url, data, resolve, reject) {
	log.debug('POST data');
	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType: 'json',
		success: function(data) {
			resolve(data);
		},
		error: function(error) {
			reject(error);
		}
	});
}

function apiServer() {
	return window.location.protocol + '//' +
		window.location.hostname + ':' + API_PORT;
}


export default {
	getEvents: function() {
		return {
			remote: function(state) {
				return new Promise(function(resolve, reject) {
					let url =  apiServer() + '/api/events/';
					get_data(url, resolve, reject);
				})
			},
			// Actions to handle responses
			loading: EventActions.getEventsLoading,  // (optional)
			success: EventActions.getEventsSuccess, // (required)
			error: EventActions.getEventsError // (required)
		}
	},
	addEvent: function() {
		return {
			remote: function(state, newEvent) {
				log.debug('addEvent->remote called. state=', state);
				return new Promise(function(resolve, reject) {
					let url = apiServer() + '/api/events/';
					post_data(url, newEvent, resolve, reject);
				});
			},

			// Actions to handle responses
			loading: EventActions.getEventsLoading, // (optional)
			success: EventActions.addEventSuccess, // (required)
			error: EventActions.addEventError // (required)
		}
	}
}

