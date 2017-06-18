from rest_framework import serializers

from . import models
from ..utils.serializers import JSONMixin


class ScrapSerializer(JSONMixin, serializers.ModelSerializer):
    class Meta:
        model = models.Scrap
        fields = ('id', 'raw_title', 'markup_type', 'html_title', 'modified', 'created')
        read_only_fields = ('created', 'modified')
