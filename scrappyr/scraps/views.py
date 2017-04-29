from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView

from .models import Scrap


class ScrapListView(LoginRequiredMixin, ListView):
    model = Scrap
