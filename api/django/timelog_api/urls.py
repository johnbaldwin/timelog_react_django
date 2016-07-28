from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^events/', views.events, name='events'),
	url(r'^raw_events/', views.get_raw_event_models, name='get_raw_event_models')
]