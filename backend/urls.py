import imp
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ItemAPIView

urlpatterns = [
    path('items/', ItemAPIView.as_view()),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('red/<int:id>/<str:ola>', views.red, name='red'),
    # path('sum/<int:sum1>/<int:sum2>', views.sum, name='sum'),
]