from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='backend'),
    path('red/<int:id>/<str:ola>', views.red, name='red'),
    path('sum/<int:sum1>/<int:sum2>', views.sum, name='sum'),
]