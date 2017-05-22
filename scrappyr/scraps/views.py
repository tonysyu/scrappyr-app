from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect, reverse
from django.views.generic import ListView

from .forms import ScrapForm
from .models import Scrap
from .serializers import ScrapSerializer


class ScrapListView(LoginRequiredMixin, ListView):
    model = Scrap

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['form'] = ScrapForm()
        context['scraps'] = ScrapSerializer.to_json(Scrap.objects.all())
        return context

    def post(self, request):
        form = ScrapForm(self.request.POST)
        if form.is_valid():
            Scrap.objects.create(**form.cleaned_data)
        return redirect(reverse('scraps:list'))
