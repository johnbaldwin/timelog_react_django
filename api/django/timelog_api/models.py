from __future__ import unicode_literals

import uuid
from django.db import models

# Create your models here.

class Event(models.Model):
	'''
	References for using a uuid instead of long int as the primary key:
    * http://stackoverflow.com/questions/3936182/using-a-uuid-as-a-primary-key-in-django-models-generic-relations-impact
    * http://stackoverflow.com/questions/14853728/implementing-uuid-as-primary-key#14854406
	'''

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	ts = models.DateTimeField()
	text = models.TextField()

	def __str__(self):
		return 'id:"{}", ts:"{}" text: "{}"'.format(self.id, self.ts, self.text)

	def as_dict(self):
		'''
		# TODO: Consider ordered dict
		
		Get just the fields we want
		One can argue that this
		'''
		return {
			'id': str(self.id),
			'ts': str(self.ts),
			'text': self.text
		}
