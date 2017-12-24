from django.db import models
from django.shortcuts import reverse
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

from ..scraps.models import Scrap


class ScrapBook(TimeStampedModel):
    """Organized collection of scraps."""

    title = models.CharField(_('Scrap book title'), max_length=100)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('scrapbooks:detail', kwargs={'pk': self.id})


class ScrapBookItem(TimeStampedModel):
    """Through-model or join-model linking a `Scrap` to a `Scrapbook`

    In addition to just linking a Scrap to a ScrapBook, this allows additional customization,
    such as ordering and item-specific customizations.
    """

    scrap = models.ForeignKey(Scrap, related_name='references')
    book = models.ForeignKey(ScrapBook, related_name='items')

    def __str__(self):
        return f'{self.book!r}: {self.scrap!r}'
