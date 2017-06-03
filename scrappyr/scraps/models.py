from django.db import models

from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _

from model_utils import Choices
from model_utils.models import TimeStampedModel

from ..utils import markup


class Scrap(TimeStampedModel):

    MARKUP_LANGUAGE = Choices(*markup.LANGUAGES)

    raw_title = models.CharField(_('Raw scrap title'), max_length=100)
    markup_type = models.CharField(choices=MARKUP_LANGUAGE, max_length=10,
                                   default=markup.DEFAULT_LANGUAGE)

    @cached_property
    def html_title(self):
        convert = markup.html_inline_renderer_for(self.markup_type)
        return convert(self.raw_title)

    def __str__(self):
        return self.raw_title
