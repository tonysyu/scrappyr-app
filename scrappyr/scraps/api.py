from rest_framework import viewsets

from . import models
from . import serializers


class ScrapViewSet(viewsets.ModelViewSet):
    queryset = models.Scrap.objects.all()
    serializer_class = serializers.ScrapSerializer
