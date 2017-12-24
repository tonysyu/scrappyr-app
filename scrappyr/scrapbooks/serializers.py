from rest_framework import serializers

from . import models
from ..utils.serializers import JSONMixin


class ScrapBookSerializer(JSONMixin, serializers.ModelSerializer):
    class Meta:
        model = models.ScrapBook
        fields = ('id', 'title')
        read_only_fields = ('created', 'modified')


class ScrapBookItemSerializer(JSONMixin, serializers.ModelSerializer):
    class Meta:
        model = models.ScrapBookItem
        fields = ('id', 'book', 'scrap')
        read_only_fields = ('created', 'modified')
