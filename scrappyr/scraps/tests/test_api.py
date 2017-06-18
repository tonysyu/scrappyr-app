import json

from ..api import ScrapViewSet
from ..testing.factories import ScrapFactory
from ...utils.testing.harnesses import BaseDetailAPITestCase


class BaseScrapDetailAPITestCase(BaseDetailAPITestCase):

    viewset_class = ScrapViewSet
    viewname = 'api:scrap-detail'


class TestScrapDetail(BaseScrapDetailAPITestCase):

    def test_detail(self):
        scrap = ScrapFactory()
        request = self.get_detail_request(scrap.id)
        response = self.get_api_response(request, pk=scrap.id)

        assert not response.exception
        assert response.data['id'] == scrap.id
        assert response.data['raw_title'] == scrap.raw_title
        assert response.data['html_title'] == scrap.html_title


class TestScrapUpdate(BaseScrapDetailAPITestCase):

    def test_update_new_title(self):
        scrap = ScrapFactory()
        request = self.get_update_request(scrap.id, {"raw_title": "new title"})
        response = self.get_api_response(request, pk=scrap.id)

        assert not response.exception
        scrap.refresh_from_db()
        assert scrap.raw_title == 'new title'
        assert response.data['raw_title'] == 'new title'
