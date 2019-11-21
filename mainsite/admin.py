from django.contrib import admin

from .models import Cominfo, Banner, ProductType, SolutionSystem, Product, ServiceList, Article, History, Message
# Register your models here.


# 公司信息
class CominfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'image', 'address', 'phone', 'fax', 'email', 'city', 'active', 'add_time']
    # search_fields = ['name']
    list_filter = ['active']


# 轮播图
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'image', 'url', 'index', 'add_time']
    search_fields = ['title', 'image', 'url', 'index']
    list_filter = ['title', 'image', 'url', 'index', 'add_time']
    

# 产品分类
class ProductTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'index', 'add_time']
    search_fields = ['name']
    list_filter = ['name', 'index']
    

# 系统方案
class SolutionSystemAdmin(admin.ModelAdmin):
    list_display = ['name', 'index', 'picture', 'abstract', 'add_time']
    search_fields = ['name']
    list_filter = ['name', 'index']
    

# 产品列表
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'solution', 'index', 'picture', 'abstract', 'click_nums', 'add_time']
    search_fields = ['name', 'category', 'solution']
    list_filter = ['name', 'category', 'solution', 'index', 'click_nums']
    

# 产品资料
class ServiceListAdmin(admin.ModelAdmin):
    list_display = ['name', 'product', 'download', 'index', 'click_nums', 'add_time']
    search_fields = ['name', 'product']
    list_filter = ['name', 'product', 'click_nums']
    
    
# 文章列表
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'picture', 'abstract', 'index', 'click_nums', 'source', 'add_time']
    search_fields = ['title', 'category', 'source']
    list_filter = ['title', 'category', 'index', 'click_nums', 'source']
    
    
# 发展历程
class HistoryAdmin(admin.ModelAdmin):
    list_display = ['topic', 'desc', 'update_time', 'add_time']
    search_fields = ['topic']
    list_filter = ['topic', 'add_time']
    
    
# 咨询信息
class MessageAdmin(admin.ModelAdmin):
    list_display = ['company', 'linker', 'phone', 'email', 'product', 'province', 'city', 'dist', 'content', 'add_time']
    search_fields = ['company', 'province', 'city']
    list_filter = ['company', 'province', 'city']
    
    
admin.site.register(Cominfo, CominfoAdmin)
admin.site.register(Banner, BannerAdmin)
admin.site.register(ProductType, ProductTypeAdmin)
admin.site.register(SolutionSystem, SolutionSystemAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ServiceList, ServiceListAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(History, HistoryAdmin)
admin.site.register(Message, MessageAdmin)
