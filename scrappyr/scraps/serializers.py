from rest_framework import serializers
from rest_framework.renderers import JSONRenderer


from . import models


class ScrapSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Scrap
        fields = ('raw_title', 'markup_type', 'html_title')

    @classmethod
    def to_json(cls, queryset):
        data = cls(queryset, many=True).data
        return JSONRenderer().render(data)
