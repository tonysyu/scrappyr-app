# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url
from rest_framework import routers

from ..scraps import api as scraps_api
from ..scrapbooks import api as scrapbooks_api


router = routers.DefaultRouter()
router.register(r'scraps', scraps_api.ScrapViewSet)
router.register(r'scrapbooks', scrapbooks_api.ScrapBookViewSet)

urlpatterns = router.urls
