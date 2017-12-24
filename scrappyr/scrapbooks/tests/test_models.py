from django.test import TestCase

from ..testing import factories


class ScrapBookTestCase(TestCase):

    def test_str(self):
        assert str(factories.ScrapBookFactory(title='test-title')) == 'test-title'


class ScrapBookItemTestCase(TestCase):

    def test_str(self):
        item = factories.ScrapBookItemFactory()
        assert str(item) == f'{item.book!r}: {item.scrap!r}'
