import bleach
from markdown import markdown

MARKDOWN = 'markdown'

_MARKUP_CONVERTER = {
    MARKDOWN: markdown,
}

LANGUAGES = _MARKUP_CONVERTER.keys()
DEFAULT_LANGUAGE = MARKDOWN


def _render_markdown(text):
    return bleach.clean(markdown(untrusted_text))


def html_renderer_for(markup_language):
    if markup_language not in _MARKUP_CONVERTER:
        raise ValueError("Unknown markup language: {}".format(markup_language))
    return _MARKUP_CONVERTER[markup_language]
