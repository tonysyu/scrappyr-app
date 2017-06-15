from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

from ..scraps.models import Scrap


class ScrapBook(TimeStampedModel):
    """Organized collection of scraps."""

    title = models.CharField(_('Scrap book title'), max_length=100)

    def __str__(self):
        return self.title


class ScrapBookItem(TimeStampedModel):
    """Through-model or join-model linking a `Scrap` to a `Scrapbook`

    In addition to just linking a Scrap to a ScrapBook, this allows additional customization,
    such as ordering and item-specific customizations.
    """

    scrap = models.ForeignKey(Scrap, related_name='item_set')
    book = models.OneToOneField(ScrapBook, related_name='item')

    def __str__(self):
        return f'{self.book!r}: {self.scrap!r}'
