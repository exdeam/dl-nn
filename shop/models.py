from django.db import models
from django.urls import reverse
from tinymce.models import HTMLField

# Модель категории
class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True, verbose_name='Имя')
    slug = models.SlugField(max_length=200, db_index=True, unique=True)
    images = models.ImageField(upload_to='category/%Y/%m/%d/', blank=True, verbose_name="Изображение Категории")
    images2 = models.ImageField(upload_to='category/%Y/%m/%d/', blank=True, verbose_name="Изображение2 Категории")

    class Meta:
        ordering = ['name']
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('shop:ProductListByCategory', args=[self.slug])

# Модель выбора тега
class Vibor(models.Model):
    category = models.ForeignKey(Category, related_name='vibors', verbose_name="Категория", on_delete=models.PROTECT)
    name = models.CharField(max_length=200, db_index=True, verbose_name='Тег')
    slug = models.SlugField(max_length=200, db_index=True)
    image = models.ImageField(upload_to='vibor/%Y/%m/%d/', blank=True, verbose_name="Изображение выбора")
    image2 = models.ImageField(upload_to='vibor/%Y/%m/%d/', blank=True, verbose_name="Изображение2 выбора")

    class Meta:
        ordering = ['slug']
        index_together = [
            ['id', 'slug']
        ]
        verbose_name = 'Выбор'
        verbose_name_plural = 'Выборы'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('shop:ViborList', args=[self.id, self.slug])

# Модель продукта
class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', verbose_name="Категория", on_delete=models.PROTECT)
    name = models.CharField(max_length=200, db_index=True, verbose_name="Название")
    slug = models.SlugField(max_length=200, db_index=True)
    image = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение товара1")
    image2 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение товара2")
    image3 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение товара3")
    image4 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение товара4")
    image5 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение товара5")
    image6 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение товара6")
    imagemed = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение среднее")
    imagesm = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение маленькое товара1")
    imagesm2 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение маленькое товара2")
    imagesm3 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение маленькое товара3")
    imagesm4 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение маленькое товара4")
    imagesm5 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение маленькое товара5")
    imagesm6 = models.ImageField(upload_to='products/%Y/%m/%d/', blank=True, verbose_name="Изображение маленькое товара6")
    anons = HTMLField(default=True, verbose_name="Анонс")
    opisanie = HTMLField(default=True, verbose_name="Описание")
    price = models.IntegerField(verbose_name="Цена")
    sku = models.CharField(default=True, max_length=200, verbose_name="Артикул")
    stock = models.PositiveIntegerField(verbose_name="На складе")
    available = models.BooleanField(default=True, verbose_name="Доступен")
    created = models.DateTimeField(auto_now_add=True, verbose_name='Создан')
    updated = models.DateTimeField(auto_now=True, verbose_name='Обновлен')
    tags = models.ManyToManyField(Vibor, related_name='tags', verbose_name='Тег')

    class Meta:
        ordering = ['slug']
        index_together = [
            ['id', 'slug']
        ]
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('shop:ProductDetail', args=[self.slug, self.id])