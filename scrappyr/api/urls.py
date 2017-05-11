# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import routers

from ..scraps import api as scraps_api


router = routers.DefaultRouter()
router.register(r'scraps', scraps_api.ScrapViewSet)

urlpatterns = router.urls
