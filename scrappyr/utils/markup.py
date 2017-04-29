import bleach
import bleach.sanitizer
from markdown import markdown


ALLOWED_TAGS = bleach.sanitizer.ALLOWED_TAGS + [
    'div', 'p',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
]


def _render_markdown(untrusted_text):
    return bleach.clean(markdown(untrusted_text), tags=ALLOWED_TAGS)


MARKDOWN = 'markdown'
_MARKUP_CONVERTER = {
    MARKDOWN: _render_markdown,
}
LANGUAGES = _MARKUP_CONVERTER.keys()
DEFAULT_LANGUAGE = MARKDOWN


def html_renderer_for(markup_language):
    if markup_language not in _MARKUP_CONVERTER:
        raise ValueError("Unknown markup language: {}".format(markup_language))
    return _MARKUP_CONVERTER[markup_language]
