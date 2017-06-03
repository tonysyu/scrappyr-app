from unittest import mock

import pytest
from django.shortcuts import reverse
from django.test import RequestFactory

from .. import views


class TestScrapListView():

    @pytest.mark.django_db
    def test_get(self):
        response = self.get()
        assert response.status_code == 200
        form = response.context_data['form']
        assert not form.is_bound
        scraps = response.context_data['scraps']
        assert scraps == b'[]'

    def test_valid_post_creates_new_scrap(self):
        with mock.patch('scrappyr.scraps.views.Scrap') as scrap_factory:
            response = self.post({'raw_title': 'my title'})
        assert response.status_code == 302  # Redirect to scrap list after creating new scrap.
        scrap_factory.objects.create.assert_called_once_with(raw_title='my title')

    def test_invalid_post_does_not_create_scrap(self):
        with mock.patch('scrappyr.scraps.views.Scrap') as scrap_factory:
            response = self.post({})
        assert response.status_code == 302
        scrap_factory.objects.create.assert_not_called()

    def get(self, data=None):
        factory = RequestFactory()
        request = factory.get(reverse('scraps:list'), data=data)
        return self._get_response(request)

    def post(self, data=None):
        factory = RequestFactory()
        request = factory.post(reverse('scraps:list'), data=data)
        return self._get_response(request)

    def _get_response(self, request):
        request.user = mock.Mock(is_authenticated=True)
        view = views.ScrapListView.as_view()
        return view(request)
