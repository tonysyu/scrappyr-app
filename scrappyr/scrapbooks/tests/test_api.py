from rest_framework.test import APITestCase

from .. import api
from .. import models
from ..testing.factories import ScrapBookFactory
from ...scraps.testing.factories import ScrapFactory
from ...utils.testing.harnesses import BaseDetailAPITestCase, BaseListAPITestCase
from ...utils.testing.request_utils import json_post_to_view


class TestScrapBookDetail(BaseDetailAPITestCase):

    viewname = 'api:scrapbook-detail'
    viewset_class = api.ScrapBookViewSet

    def test_detail(self):
        book = ScrapBookFactory()
        request = self.get_detail_request(book.id)
        response = self.get_api_response(request, pk=book.id)

        assert not response.exception
        assert response.data['id'] == book.id
        assert response.data['title'] == book.title


class TestScrapBookList(BaseListAPITestCase):

    viewname = 'api:scrapbookitem-list'
    viewset_class = api.ScrapBookItemViewSet

    def test_create(self):
        scrap = ScrapFactory()
        book = ScrapBookFactory()
        assert not models.ScrapBookItem.objects.exists()

        request = self.get_create_request(book.id, {'scrap': scrap.id})
        response = self.get_api_response(request, scrap=scrap.id, book=book.id)

        item = models.ScrapBookItem.objects.first()
        assert item.book == book
        assert item.scrap == scrap

    def get_create_request(self, book_id, data):
        return self.request_factory.post(
            self.get_url(book_id=book_id), data=data, **self.request_kwargs)


class AddScrapToBookTestCase(APITestCase):

    def test_basic_add(self):
        book = ScrapBookFactory()
        scrap = ScrapFactory()
        assert not models.ScrapBookItem.objects.exists()

        json_post_to_view('api:add-scrap-to-book', scrap_id=scrap.id, book_id=book.id)

        item = models.ScrapBookItem.objects.first()
        assert item.book == book
        assert item.scrap == scrap
