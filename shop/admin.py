from django.contrib import admin
from .models import Category, Product, Vibor
from django import forms

# Модель категории
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'images', 'images2']
    prepopulated_fields = {'slug': ('name', )}

# Модель выбора
class ViborAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'image', 'image2']
    prepopulated_fields = {'slug': ('name', )}

# Модель товара
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'price', 'sku', 'stock', 'available', 'created', 'updated']
    list_filter = ['available', 'created', 'updated', 'tags']
    list_editable = ['price', 'sku', 'stock', 'available']
    prepopulated_fields = {'slug': ('name', )}


admin.site.register(Category, CategoryAdmin)
admin.site.register(Vibor, ViborAdmin)
admin.site.register(Product, ProductAdmin)
