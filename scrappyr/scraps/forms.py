from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from django import forms

from .models import Scrap


class ScrapForm(forms.ModelForm):

    class Meta:
        model = Scrap
        fields = ['raw_title']

    def __init__(self, *args, **kwargs):
        super(ScrapForm, self).__init__(*args, **kwargs)
        self.fields['raw_title'].label = 'New scrap title'
        self.helper = FormHelper()
        self.helper.form_class = 'col-md-4'
        self.helper.add_input(Submit('submit', 'Add Scrap', css_class='btn-sm'))
