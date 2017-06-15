from rest_framework import serializers
from rest_framework.renderers import JSONRenderer


class JSONMixin(object):
    """Mixin to add `to_json` class method to rest_framework.serializers.ModelSerializer."""

    @classmethod
    def to_json(cls, queryset):
        data = cls(queryset, many=True).data
        return JSONRenderer().render(data)
