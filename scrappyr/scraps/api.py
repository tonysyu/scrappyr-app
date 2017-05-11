from rest_framework import serializers, viewsets

from . import models


class ScrapSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Scrap
        fields = ('raw_title', 'markup_type')


class ScrapViewSet(viewsets.ModelViewSet):
    queryset = models.Scrap.objects.all()
    serializer_class = ScrapSerializer
