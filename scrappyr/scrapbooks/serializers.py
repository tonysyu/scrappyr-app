from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from . import models
from ..utils.serializers import JSONMixin


class ScrapBookSerializer(JSONMixin, serializers.ModelSerializer):
    class Meta:
        model = models.ScrapBook
        fields = ('id', 'title')
        read_only_fields = ('created', 'modified')
