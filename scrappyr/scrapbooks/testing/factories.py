import factory

from .. import models
from ...scraps.testing.factories import ScrapFactory


class ScrapBookFactory(factory.django.DjangoModelFactory):
    title = factory.Sequence(lambda n: 'scrap-book-{0}'.format(n))

    class Meta:
        model = models.ScrapBook


class ScrapBookItemFactory(factory.django.DjangoModelFactory):
    book = factory.SubFactory(ScrapBookFactory)
    scrap = factory.SubFactory(ScrapFactory)

    class Meta:
        model = models.ScrapBookItem
