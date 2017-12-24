# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url
from rest_framework import routers

from ..scrapbooks import api as scrapbooks_api
from ..scraps import api as scraps_api


router = routers.DefaultRouter()
router.register(r'scraps', scraps_api.ScrapViewSet)
router.register(r'scrapbooks', scrapbooks_api.ScrapBookViewSet)
# The url intentionally uses "items" instead of "scraps" because it expects item ids not scrap ids.
router.register(r'scrapbooks/(?P<book_id>\d+)/items', scrapbooks_api.ScrapBookItemViewSet)

urlpatterns = router.urls + [
    url(
        '^scrapbooks/(?P<book_id>\d+)/scrap/(?P<scrap_id>\d+)/$',
        scrapbooks_api.add_scrap_to_book,
        name='add-scrap-to-book',
    ),
]
