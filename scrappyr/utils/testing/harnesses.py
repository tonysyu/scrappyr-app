from django.core.urlresolvers import reverse
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from ...users.testing.factories import AdminUserFactory


class BaseDetailAPITestCase(APITestCase):

    viewname = None

    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.request_kwargs = {'content_type': 'application/json'}

    def get_viewname(self):
        return self.viewname

    def get_view(self):
        raise NotImplementedError('BaseDetailAPITestCase subclasses must define `get_view` method.')

    def get_url(self, pk):
        viewname = self.get_viewname()
        if not viewname:
            raise AttributeError("BaseDetailAPITestCase subclasses must define `viewname`.")
        return reverse(viewname, kwargs={'pk': pk})

    def get_api_response(self, request, **kwargs):
        user = AdminUserFactory()
        force_authenticate(request, user=user, token='test-token-1234')
        view = self.get_view()
        return view(request, **kwargs)

    def get_api_request(self, method, pk, data=None):
        return self.request_factory.request(
            method=method,
            path=self.get_url(pk),
            data=data,
            content_type='application/json',
        )
