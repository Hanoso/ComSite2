#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/10/29 23:21 
# @Author : hanoso
# @File : urls.py 
# @Software: PyCharm
from django.urls import path

from .views import IndexView


urlpatterns = [
    # path('api/book_spider', views.bookspider),
    path('', IndexView.as_view(), name='index')
]