from rest_framework import viewsets
from rest_framework.decorators import api_view

from . import models
from . import serializers
from ..scraps.models import Scrap


class ScrapBookViewSet(viewsets.ModelViewSet):
    queryset = models.ScrapBook.objects.all()
    serializer_class = serializers.ScrapBookSerializer
