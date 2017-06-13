from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel


class ScrapBook(TimeStampedModel):

    title = models.CharField(_('Scrap book title'), max_length=100)

    def __str__(self):
        return self.title
