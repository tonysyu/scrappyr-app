from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Scrap


class ScrapListView(LoginRequiredMixin, ListView):
    model = Scrap
