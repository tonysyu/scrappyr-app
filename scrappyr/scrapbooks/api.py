from django.shortcuts import redirect
from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view, permission_classes

from . import models
from . import serializers
from ..scraps.models import Scrap


class ScrapBookViewSet(viewsets.ModelViewSet):
    queryset = models.ScrapBook.objects.all()
    serializer_class = serializers.ScrapBookSerializer


class ScrapBookItemViewSet(viewsets.ModelViewSet):
    queryset = models.ScrapBookItem.objects.all()
    serializer_class = serializers.ScrapBookItemSerializer

    def create(self, *args, **kwargs):
        return super().create(*args, **kwargs)


@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def add_scrap_to_book(request, scrap_id=None, book_id=None):
    scrap = Scrap.objects.get(pk=scrap_id)
    book = models.ScrapBook.objects.get(pk=book_id)
    models.ScrapBookItem.objects.get_or_create(scrap=scrap, book=book)
    return redirect(book.get_absolute_url())
