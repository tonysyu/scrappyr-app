from test_plus.test import TestCase

from ..models import Scrap


class TestScrap(TestCase):

    def test__str__(self):
        scrap = Scrap.objects.create(raw_title='hello')
        assert scrap.__str__() == 'hello'

    def test_html_title(self):
        scrap = Scrap.objects.create(raw_title='hello')
        assert scrap.html_title == '<h1>hello</h1>'

