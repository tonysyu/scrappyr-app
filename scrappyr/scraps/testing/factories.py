from factory.django import DjangoModelFactory

from .. import models


class ScrapFactory(DjangoModelFactory):
    class Meta:
        model = models.Scrap

    raw_title = 'original title'
