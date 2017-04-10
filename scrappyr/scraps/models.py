from django.db import models

from django.utils.translation import ugettext_lazy as _

from model_utils import Choices
from model_utils.models import TimeStampedModel

from ..utils import markup


class Scrap(TimeStampedModel):

    MARKUP_LANGUAGE = Choices(*markup.LANGUAGES)

    _raw_title = models.CharField(_('Raw scrap title'), max_length=100)
    _html_title = models.CharField(_('Html-formatted scrap title'), max_length=300)
    markup_type = models.CharField(choices=MARKUP_LANGUAGE, max_length=10)

    @property
    def raw_title(self):
        return self._raw_title

    @raw_title.setter
    def raw_title(self, value):
        self._raw_title = value
        convert = _MARKUP_CONVERTER[self.markup_type]
        self._html_title = convert(value)

    @property
    def html_title(self):
        return self._html_title
