from django.views.generic import TemplateView
from django.shortcuts import render


class HomeTemplateView(TemplateView):
    template_name = 'home.html'
