from django.shortcuts import render, get_object_or_404, render
from .models import Category, Product, Vibor

# Страница с категориями

def KatalogList(request):
    kategory = Category.objects.all()
    return render(request, 'shop/product/catalog.html', {'kategory': kategory})


# Страница с товарами
def ProductList(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    vibor = Vibor.objects.all()
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
        vibor = vibor.filter(category=category)
    return render(request, 'shop/product/list.html', {
        'category': category,
        'categories': categories,
        'products': products,
        'vibor': vibor,
    })

# Страница с товарами по тегам
def ViborList(request, id, category_slug=None):
    tags_s = Vibor.objects.get(id=id)
    products = Product.objects.filter(tags=tags_s)
    categories = Category.objects.all()
    category = None
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
    tags = Vibor.objects.filter(category=category)
    return render(request, 'shop/product/vibor.html', {
        'categories': categories,
        'category': category,
        'tags': tags,
        'products': products,
        'tags_s': tags_s,
    })

# Страница товара
def ProductDetail(request, id, slug):
    category = Category.objects.all()
    product = get_object_or_404(Product, slug=slug, id=id, available=True)
    return render(request, 'shop/product/detail.html', {
        'product': product,
        'category': category,
                             })
