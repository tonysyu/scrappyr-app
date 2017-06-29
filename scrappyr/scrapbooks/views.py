from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect, reverse
from django.views.generic import DetailView, ListView

from .forms import ScrapBookForm
from .models import ScrapBook


class ScrapBookListView(LoginRequiredMixin, ListView):
    model = ScrapBook
    context_object_name = 'scrap_book_list'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['form'] = ScrapBookForm()
        return context

    def post(self, request):
        form = ScrapBookForm(self.request.POST)
        if form.is_valid():
            ScrapBook.objects.create(**form.cleaned_data)
        return redirect(reverse('scrapbooks:list'))


class ScrapBookDetailView(LoginRequiredMixin, DetailView):
    model = ScrapBook
    context_object_name = 'scrapbook'
