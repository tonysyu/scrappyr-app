from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView

from . import models


class ScrapBookListView(LoginRequiredMixin, ListView):
    model = models.ScrapBook
