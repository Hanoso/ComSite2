#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/10/29 23:21
# @Author : hanoso
# @File : urls.py
# @Software: PyCharm
from django.urls import path, include

from .views import LinkView


urlpatterns = [
	path('link/', LinkView.as_view(), name='link'),
	path('captcha/', include('captcha.urls')),  # 图片验证码 路由
	path('refresh_captcha/', LinkView.refresh_captcha),  # 刷新验证码，ajax
]