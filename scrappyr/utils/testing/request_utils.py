from django.core.urlresolvers import resolve, reverse
from rest_framework.test import APIRequestFactory, force_authenticate

from ...users.testing.factories import AdminUserFactory


def json_post_to_view(viewname, **kwargs):
    """Post json request to view given by viewname.

    Args:
        viewname (str): Name of view, which can be passed to Django's `reverse` function.

    Kwargs:
        Any key-value pairs required to resolve the view url.
    """
    url = reverse(viewname, kwargs=kwargs)

    request_factory = APIRequestFactory()
    request = request_factory.post(url, content_type='application/json')
    force_authenticate(request, user=AdminUserFactory(), token='test-token-1234')

    view_func, args, kwargs = resolve(url)
    return view_func(request, **kwargs)
