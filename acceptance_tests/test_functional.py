import pytest
from selenium import webdriver


@pytest.fixture
def browser():
    browser = webdriver.Chrome()
    browser.get('http://localhost:8000/')
    yield browser
    browser.quit()


def test_functional(browser):
    assert 'scrappyr' in browser.title
