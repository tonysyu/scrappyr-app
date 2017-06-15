import json

from ..api import ScrapViewSet
from ..testing.factories import ScrapFactory
from ...utils.testing.harnesses import BaseDetailAPITestCase


class BaseScrapDetailTestCase(BaseDetailAPITestCase):

    viewname = 'api:scrap-detail'

    def get_view(self):
        return ScrapViewSet.as_view({'get': 'retrieve', 'put': 'update'})


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
