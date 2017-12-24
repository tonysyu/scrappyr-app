from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from django import forms

from .models import ScrapBook


class ScrapBookForm(forms.ModelForm):

    class Meta:
        model = ScrapBook
        fields = ['title']

    def __init__(self, *args, **kwargs):
        super(ScrapBookForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'col-md-4'
        self.helper.add_input(Submit('submit', 'Add Scrap Book', css_class='btn-sm'))
