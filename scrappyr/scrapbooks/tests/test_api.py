from rest_framework.test import APITestCase

from .. import models
from ..api import ScrapBookViewSet
from ..testing.factories import ScrapBookFactory
from ...scraps.testing.factories import ScrapFactory
from ...utils.testing.harnesses import BaseDetailAPITestCase
from ...utils.testing.request_utils import json_post_to_view


class TestScrapBookDetail(BaseDetailAPITestCase):

    viewname = 'api:scrapbook-detail'
    viewset_class = ScrapBookViewSet

    def test_detail(self):
        book = ScrapBookFactory()
        request = self.get_detail_request(book.id)
        response = self.get_api_response(request, pk=book.id)

        assert not response.exception
        assert response.data['id'] == book.id
        assert response.data['title'] == book.title

    def get_detail_request(self, pk):
        return self.request_factory.get(self.get_url(pk), **self.request_kwargs)


class AddScrapToBookTestCase(APITestCase):

    def test_basic_add(self):
        book = ScrapBookFactory()
        scrap = ScrapFactory()
        assert not models.ScrapBookItem.objects.exists()

        json_post_to_view('api:add-scrap-to-book', scrap_id=scrap.id, book_id=book.id)

        item = models.ScrapBookItem.objects.first()
        assert item.book == book
        assert item.scrap == scrap
