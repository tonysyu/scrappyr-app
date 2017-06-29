# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from . import views


urlpatterns = [
    url(
        regex=r'^$',
        view=views.ScrapBookListView.as_view(),
        name='list',
    ),
    url(
        regex=r'^(?P<pk>\d+)$',
        view=views.ScrapBookDetailView.as_view(),
        name='detail',
    ),
]
