from django.urls import path, re_path, include

from .views import AboutView


urlpatterns = [
	path('about/', AboutView.as_view(), name='about'),
]