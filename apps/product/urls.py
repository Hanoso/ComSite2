#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/10/29 23:21
# @Author : hanoso
# @File : urls.py
# @Software: PyCharm
from django.urls import path, re_path

from .views import ProductListView, ProductView, ServiceListView, SolutionView


urlpatterns = [
    path('productlist/', ProductListView.as_view(), name='productlist'),
    re_path('product/(?P<product_id>\d+)$', ProductView.as_view(), name='product'),

	path('service/', ServiceListView.as_view(), name='service'),

	re_path('solution/(?P<solution_id>\d+)$', SolutionView.as_view(), name='solution'),
]