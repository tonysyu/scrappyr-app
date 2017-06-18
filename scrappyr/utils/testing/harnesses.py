from django.core.urlresolvers import reverse
from django.db import transaction
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from ...users.testing.factories import AdminUserFactory


class BaseAPITestCase(APITestCase):

    viewname = None
    viewset_class = None
    view_definition_kwargs = None

    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.request_kwargs = {'format': 'json'}

    def get_viewname(self):
        return self.viewname

    def get_view(self):
        if not self.viewset_class:
            raise RuntimeError('`BaseDetailAPITestCase` subclasses must define '
                               '`viewset_class` clas variable or `get_view` method.')
        if not self.view_definition_kwargs:
            raise RuntimeError('`BaseDetailAPITestCase` subclasses must define `view_definition_kwargs`')
        return self.viewset_class.as_view(self.view_definition_kwargs)

    def get_url(self, **kwargs):
        viewname = self.get_viewname()
        if not viewname:
            raise AttributeError("BaseDetailAPITestCase subclasses must define `viewname`.")
        return reverse(viewname, kwargs=kwargs)

    def get_api_response(self, request, **kwargs):
        user = AdminUserFactory()
        force_authenticate(request, user=user, token='test-token-1234')
        view = self.get_view()
        with transaction.atomic():
            return view(request, **kwargs)


class BaseDetailAPITestCase(BaseAPITestCase):

    view_definition_kwargs = {'get': 'retrieve', 'put': 'update'}

    def get_detail_request(self, pk):
        """Return object creation request (i.e. POST) for the given data.

        Args:
            pk (int): Primary key used to generate detail url.
        """
        return self.request_factory.get(self.get_url(pk), **self.request_kwargs)

    def get_update_request(self, pk, data):
        """Return object creation request (i.e. POST) for the given data.

        Args:
            pk (int): Primary key used to generate detail url.
            data (dict): Data passed in request body.
        """
        return self.request_factory.put(self.get_url(pk), data=data, **self.request_kwargs)

    def get_url(self, pk, **kwargs):
        return super().get_url(pk=pk, **kwargs)


class BaseListAPITestCase(BaseAPITestCase):

    view_definition_kwargs = {'get': 'list', 'post': 'create'}

    def get_create_request(self, data):
        """Return object creation request (i.e. POST) for the given data.

        Args:
            data (dict): Data passed in request body.
        """
        return self.request_factory.post(self.get_url(), data=data, **self.request_kwargs)
