from test_plus.test import TestCase

from ..models import Scrap


class TestScrap(TestCase):

    def test__str__(self):
        scrap = Scrap(raw_title='hello')
        assert str(scrap) == 'hello'

    def test_html_title(self):
        scrap = Scrap(raw_title='hello')
        assert scrap.html_title == 'hello'

    def test_html_title_bold(self):
        scrap = Scrap(raw_title='**hello**')
        assert scrap.html_title == '<strong>hello</strong>'

    def test_html_title_with_block_element_gets_escaped(self):
        scrap = Scrap(raw_title='<div>hello</div>')
        assert scrap.html_title == '&lt;div&gt;hello&lt;/div&gt;'
