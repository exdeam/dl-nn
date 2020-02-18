from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.KatalogList, name='KatalogList'),
    url(r'^(?P<category_slug>[-\w]+)/$', views.ProductList, name='ProductListByCategory'),
    url(r'^(?P<category_slug>[-\w]+)/(?P<id>[-\w]+)/$', views.ViborList, name='ViborList'),
    url(r'^catalog/(?P<slug>[-\w]+)/(?P<id>[-\w]+)/$', views.ProductDetail, name='ProductDetail'),
 ]
