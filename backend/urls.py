from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('red/<int:id>/<str:ola>', views.red, name='red'),
]