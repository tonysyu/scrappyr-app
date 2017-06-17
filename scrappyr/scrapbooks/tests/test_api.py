from django.core.urlresolvers import reverse
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from .. import models
from ..api import ScrapBookViewSet
from ..testing.factories import ScrapBookFactory
from ...scrapbooks.api import add_scrap_to_book
from ...scraps.models import Scrap
from ...scraps.testing.factories import ScrapFactory
from ...users.testing.factories import AdminUserFactory
from ...utils.testing.harnesses import BaseDetailAPITestCase


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
        assert not book.items.exists()
        assert not scrap.references.exists()
        assert not models.ScrapBookItem.objects.exists()

        kwargs = {'scrap_id': scrap.id, 'book_id': book.id}
        url = reverse('api:add-scrap-to-book', kwargs=kwargs)
        request_factory = APIRequestFactory()
        request = request_factory.post(url, content_type='application/json')
        response = self.get_api_response(request, **kwargs)

        assert models.ScrapBookItem.objects.count() == 1
        item = models.ScrapBookItem.objects.first()
        assert item.book == book
        assert item.scrap == scrap

    def get_api_response(self, request, **kwargs):
        user = AdminUserFactory()
        force_authenticate(request, user=user, token='test-token-1234')
        return add_scrap_to_book(request, **kwargs)
