from django.core.urlresolvers import reverse
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from ...users.testing.factories import AdminUserFactory


class BaseDetailAPITestCase(APITestCase):

    viewname = None
    viewset_class = None

    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.request_kwargs = {'content_type': 'application/json'}

    def get_viewname(self):
        return self.viewname

    def get_view(self):
        if not self.viewset_class:
            raise RuntimeError('`BaseDetailAPITestCase` subclasses must define '
                               '`viewset_class` clas variable or `get_view` method.')
        return self.viewset_class.as_view({'get': 'retrieve', 'put': 'update'})

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

    def get_detail_request(self, pk):
        return self.request_factory.get(self.get_url(pk), **self.request_kwargs)

    def get_update_request(self, pk, content):
        return self.request_factory.put(self.get_url(pk), content, **self.request_kwargs)
