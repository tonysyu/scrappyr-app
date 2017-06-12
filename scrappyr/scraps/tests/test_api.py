import json

from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse
from django.test import TestCase
from factory.django import DjangoModelFactory
from rest_framework.test import APIRequestFactory, force_authenticate

from .. import models
from ..api import ScrapViewSet


User = get_user_model()


class AdminUserFactory(DjangoModelFactory):
    class Meta:
        model = User

    username = 'admin'
    is_superuser = True


class ScrapFactory(DjangoModelFactory):
    class Meta:
        model = models.Scrap

    raw_title = 'original title'


class BaseScrapDetailTestCase(TestCase):

    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.request_kwargs = {'content_type': 'application/json'}

    def get_url(self, pk):
        return reverse('api:scrap-detail', kwargs={'pk': pk})

    def get_api_response(self, request, **kwargs):
        user = AdminUserFactory()
        force_authenticate(request, user=user, token='test-token-1234')
        view = ScrapViewSet.as_view({'get': 'retrieve', 'put': 'update'})
        return view(request, **kwargs)

    def get_api_request(self, method, pk, data=None):
        return self.request_factory.request(
            method=method,
            path=self.get_url(pk),
            data=data,
            content_type='application/json',
        )


class TestScrapDetail(BaseScrapDetailTestCase):

    def test_detail(self):
        scrap = ScrapFactory()
        request = self.get_detail_request(scrap.id)
        response = self.get_api_response(request, pk=scrap.id)

        assert not response.exception
        assert response.data['id'] == scrap.id
        assert response.data['raw_title'] == scrap.raw_title
        assert response.data['html_title'] == scrap.html_title

    def get_detail_request(self, pk):
        return self.request_factory.get(self.get_url(pk), **self.request_kwargs)


class TestScrapUpdate(BaseScrapDetailTestCase):

    def test_update_new_title(self):
        scrap = ScrapFactory()
        request = self.get_update_request(scrap.id, json.dumps({"raw_title": "new title"}))
        response = self.get_api_response(request, pk=scrap.id)

        assert not response.exception
        scrap.refresh_from_db()
        assert scrap.raw_title == 'new title'
        assert response.data['raw_title'] == 'new title'

    def get_update_request(self, pk, content):
        return self.request_factory.put(self.get_url(pk), content, **self.request_kwargs)
