import json

from django.contrib.auth.hashers import make_password
from django.db.models import Q
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.generic.base import View

from pure_pagination import Paginator, EmptyPage, PageNotAnInteger
from captcha.models import CaptchaStore
from captcha.helpers import  captcha_image_url

from .models import Cominfo, Banner, ProductType, SolutionSystem, Product, ServiceList, Article, History, Message
from .forms import MessageForm
from .procity import get_city


# Create your views here.


class IndexView(View):
    def get(self, request):
        # 获取公司基本信息
        cominfo = Cominfo.objects.all().filter(active=1).order_by('-add_time')[:1]
        # 获取轮播图
        all_banners = Banner.objects.all().order_by('index')
        # 获取系统方案
        all_solutions = SolutionSystem.objects.all().order_by('-index')
        # 获取产品
        all_products = Product.objects.all().order_by('-add_time')
        # 获取新闻
        all_articles = Article.objects.filter(Q(category='xw') | Q(category='gg')).order_by('index', '-add_time')[:2]
        return render(request, 'index.html', {
            'cominfo': cominfo,
            'all_banners': all_banners,
            'all_solutions': all_solutions,
            'all_products': all_products,
            'all_articles': all_articles
        })


class ProductListView(View):
    def get(self, request):
        all_categories = ProductType.objects.all().order_by('index')
        all_products = Product.objects.all().order_by('-id')
        # 获取筛选类别
        category_id = request.GET.get('ct', "")
        current_category = None
        if category_id:
            all_products = all_products.filter(category=int(category_id))
            current_category = all_categories.get(id=category_id)
        # 分页
        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1
        p = Paginator(all_products, 6, request=request)
        
        products = p.page(page)
        
        return render(request, 'product-list.html', {
            'all_products': products,
            'all_categories': all_categories[:3],
            'category_id': category_id,
            'current_category': current_category
        })


class ProductView(View):
    def get(self, request, product_id):
        product = Product.objects.get(id=int(product_id))
        all_products = Product.objects.all().order_by('-id')
        
        # 增加产品点击数
        product.click_nums += 1
        product.save()
        
        # 获取所属方案
        solution_id = product.solution
        related_products = Product.objects.filter(solution=solution_id).order_by("-click_nums")[:5]
        
        # 上下翻页
        if product == all_products[len(all_products) - 1]:
            previous_product = Product.objects.filter(id__gt=product.id).first()
            next_product = None
        elif product == all_products[0]:
            previous_product = None
            next_product = Product.objects.filter(id__lt=product.id).last()
        else:
            previous_product = Product.objects.filter(id__gt=product.id).first()
            next_product = Product.objects.filter(id__lt=product.id).last()
        
        return render(request, 'product.html', {
            'product': product,
            'related_products': related_products,
            'previous_product': previous_product,
            'next_product': next_product
        })


class ServiceListView(View):
    def get(self, request):
        all_rescources = ServiceList.objects.all().order_by('-add_time')
        # 分页
        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1
        p = Paginator(all_rescources, 6, request=request)
        
        rescources = p.page(page)
        
        return render(request, 'service-list.html', {
            'all_rescources': rescources,
        })


class ArticleListView(View):
    def get(self, request):
        all_articles = Article.objects.filter(Q(category='xw') | Q(category='gg')).order_by('-add_time')
        # 获取筛选类别
        article_category = request.GET.get('ct', "")
        if article_category:
            all_articles = all_articles.filter(category=article_category)
        
        # 分页
        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1
        p = Paginator(all_articles, 6, request=request)
        
        articles = p.page(page)
        return render(request, 'news-list.html', {
            'articles': articles,
            'article_category': article_category
        })


class ArticleView(View):
    def get(self, request, article_id):
        article = Article.objects.get(id=int(article_id))
        all_articles = Article.objects.filter(Q(category='xw') | Q(category='gg')).order_by('-id')
        
        # 增加产品点击数
        article.click_nums += 1
        article.save()
        
        # 获取筛选类别
        article_category = request.GET.get('ct', "")
        
        # 上下翻页
        if article == all_articles[len(all_articles) - 1]:
            previous_article = Article.objects.filter(id__gt=article.id).first()
            next_article = None
        elif article == all_articles[0]:
            previous_article = None
            next_article = Article.objects.filter(id__lt=article.id).last()
        else:
            previous_article = Article.objects.filter(id__gt=article.id).first()
            next_article = Article.objects.filter(id__lt=article.id).last()
        
        return render(request, 'news.html', {
            'article': article,
            'all_articles': all_articles.order_by('-click_nums')[:6],
            'previous_article': previous_article,
            'next_article': next_article,
            'article_category': article_category
        })


class AboutView(View):
    def get(self, request):
        intro = Article.objects.filter(category='js').order_by('-add_time').first()
        history = History.objects.all().order_by('-add_time')
        
        # 增加产品点击数
        if intro:
            intro.click_nums += 1
            intro.save()
        
        # 获取筛选类别
        article_category = request.GET.get('ct', "")
        
        return render(request, 'about.html', {
            'intro': intro,
            'history': history,
            'article_category': article_category,
        })


class LinkView(View):
    # 创建验证码
    def captcha(self):
        hashkey = CaptchaStore.generate_key()  # 验证码答案
        image_url = captcha_image_url(hashkey)  # 验证码地址
        captcha = {'hashkey': hashkey, 'image_url': image_url}
        return captcha
    
    # 刷新验证码
    def refresh_captcha(self):
        return HttpResponse(json.dumps(self.captcha()), content_type='application/json')
    
    # 验证验证码
    def jarge_captcha(self, captchaStr, captchaHashkey):
        if captchaStr and captchaHashkey:
            try:
                # 获取根据hashkey获取数据库中的response值
                get_captcha = CaptchaStore.objects.get(hashkey=captchaHashkey)
                if get_captcha.response == captchaStr.lower():  # 如果验证码匹配
                    return True
            except:
                return False
        else:
            return False
        
    def get(self, request):
        message_form = MessageForm()
        cominfo = Cominfo.objects.filter(active=1)
        print('表单get')

        return render(request, 'link.html', {
            'message_form': message_form,
            'captcha': self.captcha(),
            'cominfo': cominfo
        })
    
    def post(self, request):
        message_form = MessageForm(request.POST)
        capt = request.POST.get("captcha", None)  # 用户提交的验证码
        key = request.POST.get("hashkey", None)  # 验证码答案
        if self.jarge_captcha(capt, key):
            print("验证码正确")
            if message_form.is_valid():
                company = request.POST.get("company", "")
                linker = request.POST.get("linker", "")
                phone = request.POST.get("phone", "")
                email = request.POST.get("email", "")
                procity = request.POST.get("procity", "")
                content = request.POST.get("content", "")
                product = request.POST.getlist("product", "")
                
                procity = procity.split(',')
                print(type(procity), procity)
                pcd = get_city(int(procity[0]), int(procity[1]), int(procity[2]))
                print(pcd)
    
                new_message = Message()
                new_message.company = company
                new_message.linker = linker
                new_message.phone = phone
                new_message.email = email
                new_message.province = pcd[0]
                new_message.city = pcd[1]
                new_message.dist = pcd[2]
                new_message.company = company
                new_message.content = content
                new_message.company = company
                new_message.product = product
    
                new_message.save()
                print('提交成功')
    
                return HttpResponseRedirect(reverse('link'))
            else:
                print('post提交未成功')
                return render(request, "link.html", {
                    "message_form": message_form,
                    'captcha': self.captcha()
                })
        else:
            print("验证码错误")
            # print(message_form.errors)
            # print(message_form.errors.as_data)
            # print(capt, key)
            return HttpResponse("验证码错误")
            # return render(request, "link.html", {
            #     "message_form": message_form,
            #     'captcha': self.captcha(),
            # })

class SolutionView(View):
    def get(self, request, solution_id):
        # 获取系统方案
        solution = SolutionSystem.objects.get(id=int(solution_id))
        all_products = Product.objects.filter(solution=int(solution_id)).order_by('-add_time')
        print(all_products.count())
        return render(request, 'solution.html', {
            'solution': solution,
            'all_products': all_products,
            'count': all_products.count()
        })
