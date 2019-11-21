"""comsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.static import serve

from DjangoUeditor import urls as DjangoUeditor_urls

from .settings import MEDIA_ROOT
from mainsite.views import IndexView, AboutView, ProductListView, ServiceListView, LinkView, SolutionView, ArticleListView
from mainsite.views import ProductView, ArticleView

admin.site.site_title = '网站后台'
# admin.site.site_header = '员工管理后台'


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # 配置media路径
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': MEDIA_ROOT}),
    # 配置富文本编辑器路径
    re_path(r'^ueditor/', include(DjangoUeditor_urls)),
    
    # path('mainsite/', include('mainsite.urls')),
    # path('', TemplateView.as_view(template_name='index.html')),
    path('', IndexView.as_view(), name='index'),
    path('about/', AboutView.as_view(), name='about'),
    
    path('productlist/', ProductListView.as_view(), name='productlist'),
    re_path('product/(?P<product_id>\d+)$', ProductView.as_view(), name='product'),
    
    path('service/', ServiceListView.as_view(), name='service'),
    
    path('newslist/', ArticleListView.as_view(), name='newslist'),
    re_path('news/(?P<article_id>\d+)$', ArticleView.as_view(), name='news'),
    
    path('link/', LinkView.as_view(), name='link'),
    path('captcha/', include('captcha.urls')),  # 图片验证码 路由
    path('refresh_captcha/', LinkView.refresh_captcha),  # 刷新验证码，ajax
    
    re_path('solution/(?P<solution_id>\d+)$', SolutionView.as_view(), name='solution'),
]
