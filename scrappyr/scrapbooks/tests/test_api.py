from ..api import ScrapBookViewSet
from ..testing.factories import ScrapBookFactory
from ...utils.testing.harnesses import BaseDetailAPITestCase


class BaseScrapBookDetailTestCase(BaseDetailAPITestCase):

    viewname = 'api:scrapbook-detail'

    def get_view(self):
        return ScrapBookViewSet.as_view({'get': 'retrieve'})


class TestScrapBookDetail(BaseScrapBookDetailTestCase):

    def test_detail(self):
        book = ScrapBookFactory()
        request = self.get_detail_request(book.id)
        response = self.get_api_response(request, pk=book.id)

        assert not response.exception
        assert response.data['id'] == book.id
        assert response.data['title'] == book.title

    def get_detail_request(self, pk):
        return self.request_factory.get(self.get_url(pk), **self.request_kwargs)
