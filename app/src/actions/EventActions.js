import alt from 'components/Dispatcher';

export default alt.generateActions(
	'create', 'update', 'delete',
	'getEventsLoading',
	'getEventsSuccess',
	'getEventsError',
	'addEventSuccess',
	'addEventError'
);
