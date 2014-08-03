from django.conf.urls import patterns, url

from .views import HomeTemplateView

urlpatterns = patterns('',
   url(r'^$', HomeTemplateView.as_view(), name='home'),
)
