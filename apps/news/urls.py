#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/10/29 23:21
# @Author : hanoso
# @File : urls.py
# @Software: PyCharm
from django.urls import path, re_path

from .views import ArticleListView, ArticleView


urlpatterns = [
    path('newslist/', ArticleListView.as_view(), name='newslist'),
    re_path('newsdetail/(?P<article_id>\d+)$', ArticleView.as_view(), name='news'),
]