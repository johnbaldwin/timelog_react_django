import json

from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from . import models


# In a production app, you likely want to move data like these to settings.py

ACCESS_CONTROL_ALLOW_ORIGIN = '*'


def index(request):
	return HttpResponse('This is the API description page')

@csrf_exempt
def events(request):
	'''
	The events method responsed to the http 'GET' and 'POST' request methods
	On a GET request, 


	In production, you probably want to use Django REST Framework, another REST
	API or helper package. This method is written as is for two purposes:

    1. To show what is required to implement a REST API server that supports
       CORS needed for browser AJAX calls when the browser client may be served
       by a different server, such as would be the case with a static asset
       cloud service/CDN like Amazon CloudFront.
	2. To show that you don't really need that much code to make a REST API to 
	   respond to browser AJAX calls.

	'''

	def transform_events(events):
		'''
		This method transforms a queryset of event models into an array of 
		model agnostic event dicts that contain the id, timestamp and event text

		The default serializer renames the 'id' field to 'pk' and, AFAIK,
		serializer cannot rename fields and I wanted to stick with 'id' 
		instead of 'pk' for the event id.
		
		'''
		return [event.as_dict() for event in events]

	def JsonResponse(data, status=200):
		'''
		This method provides a single point to set the response headers for
		JSON calls

		@param data - a dict containing the data to transform to a JSON response
		@param status - the status code with which to respond
		'''
		response = HttpResponse(json.dumps(data),
			content_type='application/json',
			status=status)
		response['Access-Control-Allow-Origin'] = '*'
		response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
		response['Access-Control-Allow-Headers'] = '*'		
		return response

	if request.method == 'GET':
		return JsonResponse(transform_events(models.Event.objects.order_by('ts')))

	elif request.method == 'POST':
		request_data = json.loads(request.body)
		text_field = request_data.get('text')

		# TODO: Improvement: Verify text_field. For example to make sure that it
		# is a reasonable length.
		event = models.Event.objects.create(ts=timezone.now(), text=text_field)

		if event:
			response_data = { 'status': 'OK', 'id': str(event.id)}
		else:
			response_data = { 'status': 'ERROR', 'msg': 'cannot create event'}

		return JsonResponse(response_data)

	elif request.method == 'OPTIONS':
		# OPTION may be called during a POST method preflight check
		# See here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests
		response = HttpResponse()
		response['Access-Control-Allow-Origin'] = '*'
		response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
		# Options do not allow wildcard for access-control-allow-headers
		response['Access-Control-Allow-Headers'] = 'Content-Type'
		return response

	else:
		response_data = {
			'status': 'ERROR',
			'msg': 'unsupported request method:{}'.format(request.method)
		}
		return HttpResponse(json.dumps(response_data), status=500)

@csrf_exempt
def get_raw_event_models(request):
		'''
		This method responds with the raw serialized event models

		'''
		return HttpResponse(
			serializers.serialize('json', models.Event.objects.all()),
			content_type='application/json')
