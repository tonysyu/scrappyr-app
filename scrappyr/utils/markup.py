import bleach
import bleach.sanitizer
from markdown import markdown

__all__ = [
    'ALLOWED_TAGS', 'ALLOWED_INLINE_TAGS',
    'MARKDOWN', 'LANGUAGES', 'DEFAULT_LANGUAGE',
    'html_renderer_for', 'html_inline_renderer_for',
]


ALLOWED_TAGS = bleach.sanitizer.ALLOWED_TAGS + [
    'div', 'p',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
]

ALLOWED_INLINE_TAGS = [
    'a', 'abbr', 'acronym',
    'b', 'code', 'em', 'i', 'strong',
]


def _render_markdown(untrusted_text):
    return bleach.clean(markdown(untrusted_text), tags=ALLOWED_TAGS)


def _render_inline_markdown(untrusted_text):
    text = bleach.clean(markdown(untrusted_text), tags=ALLOWED_INLINE_TAGS)
    return _strip_surrouding_paragraph_tags(text)


def _strip_surrouding_paragraph_tags(text):
    p_open = '&lt;p&gt;'
    p_close = '&lt;/p&gt;'
    if text.startswith(p_open) and text.endswith(p_close):
        return text[len(p_open):-len(p_close)]
    return text


MARKDOWN = 'markdown'
_MARKUP_CONVERTER = {
    MARKDOWN: {
        'block': _render_markdown,
        'inline': _render_inline_markdown,
    }
}
LANGUAGES = _MARKUP_CONVERTER.keys()
DEFAULT_LANGUAGE = MARKDOWN


def html_renderer_for(markup_language):
    return generic_html_renderer_for(markup_language, 'block')


def html_inline_renderer_for(markup_language):
    return generic_html_renderer_for(markup_language, 'inline')


def generic_html_renderer_for(markup_language, html_type):
    if markup_language not in _MARKUP_CONVERTER:
        raise ValueError("Unknown markup language: {}".format(markup_language))
    return _MARKUP_CONVERTER[markup_language][html_type]
