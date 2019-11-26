#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/11/9 0:47 
# @Author : hanoso
# @File : forms.py 
# @Software: PyCharm
from captcha.fields import CaptchaField
from django import forms

from .models import Message


class MessageForm(forms.ModelForm):
    # captcha = CaptchaField(error_messages={"invalid": u"验证码错误"})
    # company = forms.CharField(max_length=50, required=True)

    class Meta:
        model = Message
        fields = ['company', 'linker', 'phone', 'email', 'province', 'city', 'dist', 'content']


