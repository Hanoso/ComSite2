import datetime

from DjangoUeditor.models import UEditorField
from django.db import models
from django.db.models import CASCADE
# from django_mysql.models import JSONField


# Create your models here.


# 公司基本信息
class Cominfo(models.Model):
    name = models.CharField(max_length=50, verbose_name=u"公司名称")
    image = models.ImageField(upload_to="cominfo/%Y/%m", verbose_name=u"logo", max_length=100)
    address = models.CharField(max_length=150, verbose_name=u"机构地址")
    phone = models.CharField(max_length=15, verbose_name=u"公司电话")
    fax = models.CharField(default="", max_length=15, verbose_name=u"公司传真")
    email = models.CharField(max_length=15, verbose_name=u"公司邮箱")
    city = models.CharField(max_length=50, verbose_name=u"所在城市")
    active = models.IntegerField(choices=((0, u"未启用"), (1, "已启用")), default=0, verbose_name=u"启用状态")
    wxqrcode = models.ImageField(upload_to="cominfo/%Y/%m", default="", verbose_name=u"微信", max_length=100)
    qywxqrcode = models.ImageField(upload_to="cominfo/%Y/%m", default="", verbose_name=u"企业微信", max_length=100)
    qqqrcode = models.ImageField(upload_to="cominfo/%Y/%m", default="", verbose_name=u"QQ", max_length=100)
    add_time = models.DateTimeField(auto_now=True, verbose_name=u"添加/修改时间")
    
    class Meta:
        verbose_name = u"公司信息"
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return self.name


# 轮播图
class Banner(models.Model):
    title = models.CharField(max_length=100, verbose_name=u"标题")
    image = models.ImageField(upload_to="banner/%Y/%m", verbose_name=u"轮播图", max_length=100)
    url = models.URLField(max_length=200, verbose_name=u"访问地址")
    index = models.IntegerField(default=100, verbose_name=u"顺序")
    add_time = models.DateTimeField(auto_now=True, verbose_name=u"添加时间")
    
    class Meta:
        verbose_name = u"轮播图"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


# 产品类别
class ProductType(models.Model):
    name = models.CharField(max_length=30, verbose_name=u"分类名称")
    index = models.IntegerField(unique=True, verbose_name=u"优先级", null=True, blank=True)
    add_time = models.DateTimeField(auto_now=True, verbose_name=u"添加/修改时间")

    class Meta:
        verbose_name = u"产品分类"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


# 服务方案
class SolutionSystem(models.Model):
    name = models.CharField(max_length=30, verbose_name=u"方案名称")
    picture = models.ImageField(upload_to="solution/%Y/%m", verbose_name=u"方案图示", max_length=100, default='')
    abstract = models.TextField(max_length=300, verbose_name=u"方案简介", default='')
    detail = UEditorField(blank=True, verbose_name=u"方案详情", width=900, height=300, imagePath="solution/img/",
                          filePath="solution/file/", default='')
    index = models.IntegerField(unique=True, verbose_name=u"优先级", null=True, blank=True)
    add_time = models.DateTimeField(auto_now=True, verbose_name=u"添加/修改时间")

    class Meta:
        verbose_name = u"系统方案"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name
    

# 产品模型
class Product(models.Model):
    name = models.CharField(max_length=50, verbose_name=u"产品名称/型号")
    category = models.ForeignKey(ProductType, to_field='id', on_delete=CASCADE, verbose_name=u"产品分类")
    solution = models.ForeignKey(SolutionSystem, to_field='id', on_delete=CASCADE, verbose_name=u"适用方案")
    picture = models.ImageField(upload_to="product/%Y/%m", verbose_name=u"产品宣图", max_length=100)
    abstract = models.TextField(max_length=300, verbose_name=u"产品简介", default='')
    detail = UEditorField(blank=True, verbose_name=u"产品详情", width=900, height=300, imagePath="product/img/",
                          filePath="product/file/", default='')
    parameter = UEditorField(blank=True, verbose_name=u"产品参数", toolbars='normal', width=900, height=300, imagePath="product/img/",
                          filePath="product/file/", default='')
    package = UEditorField(blank=True, verbose_name=u"包装说明", toolbars='normal', width=900, height=300,
                             imagePath="product/img/",
                             filePath="product/file/", default='')
    index = models.IntegerField(unique=True, verbose_name=u"优先级", null=True, blank=True)
    click_nums = models.IntegerField(default=0, verbose_name=u"点击数")
    add_time = models.DateTimeField(auto_now=True, verbose_name=u"添加/修改时间")
    
    class Meta:
        verbose_name = u"产品列表"
        verbose_name_plural = verbose_name
    
    def __str__(self):
        return self.name


# 产品资料
class ServiceList(models.Model):
    name = models.CharField(max_length=50, verbose_name=u"产品手册")
    product = models.ForeignKey(Product, to_field='id', on_delete=CASCADE, verbose_name=u"产品名称/型号")
    download = models.FileField(upload_to="service/%Y/%m", verbose_name=u"资源文件", max_length=100)
    index = models.IntegerField(unique=True, verbose_name=u"优先级", null=True, blank=True)
    click_nums = models.IntegerField(default=0, verbose_name=u"点击数")
    add_time = models.DateTimeField(auto_now=True, verbose_name=u"添加/修改时间")
    
    class Meta:
        verbose_name = u"产品资料"
        verbose_name_plural = verbose_name
    
    def __str__(self):
        return self.name
    
    
# 新闻公告文章等
class Article(models.Model):
    title = models.CharField(max_length=50, verbose_name=u"文章标题")
    category = models.CharField(max_length=2, choices=(("xw", u"新闻"), ("gg", u"公告"), ("js", u"公司介绍")), verbose_name=u"分类名称")
    picture = models.ImageField(upload_to="product/%Y/%m", verbose_name=u"产品宣图", max_length=100)
    abstract = models.TextField(max_length=300, verbose_name=u"文章摘要", default='')
    content = UEditorField(blank=True, verbose_name=u"文章内容", width=900, height=300, imagePath="product/img/",
                          filePath="product/file/", default='')
    index = models.IntegerField(default=0, verbose_name=u"优先级")
    click_nums = models.IntegerField(default=0, verbose_name=u"点击数")
    source = models.IntegerField(default=0, choices=((0, u"公司动态"), (1, u"转载报道")), verbose_name=u"文章来源")
    add_time = models.DateTimeField(auto_now=True, verbose_name=u"添加/修改时间")

    class Meta:
        verbose_name = u"新闻动态"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title
    
    
# 发展历程
class History(models.Model):
    topic = models.CharField(max_length=50, verbose_name=u"里程碑事件")
    desc = UEditorField(verbose_name=u"大事简述", toolbars='mini', width=900, height=300, imagePath="history/img/",
                          filePath="history/file/", default='')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name=u"添加时间")
    update_time = models.DateTimeField(auto_now=True, verbose_name=u"修改时间")

    class Meta:
        verbose_name = u"发展历程"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.topic


# 咨询信息
class Message(models.Model):
    company = models.CharField(max_length=50, verbose_name=u"来信公司名称")
    linker = models.CharField(max_length=12, verbose_name=u"联系人", null=True, blank=True)
    phone = models.CharField(max_length=15, verbose_name=u"联系电话")
    email = models.CharField(max_length=15, verbose_name=u"联系邮箱")
    province = models.CharField(max_length=15, verbose_name=u"所在省市", null=True, blank=True)
    city = models.CharField(max_length=15, verbose_name=u"所在城市", null=True, blank=True)
    dist = models.CharField(max_length=15, verbose_name=u"所在城区", null=True, blank=True)
    content = models.TextField(max_length=300, verbose_name=u"咨询内容", default='', null=True, blank=True)
    product = models.CharField(max_length=50, verbose_name=u"所需产品", default='')
    add_time = models.DateTimeField(auto_now=True, verbose_name=u"咨询时间")

    class Meta:
        verbose_name = u"咨询信息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.company
