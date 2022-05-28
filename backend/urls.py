from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from backend.views import RequestFoodAPIView


urlpatterns = [
    # path('items/', ItemAPIView.as_view()),
    path('requestfooditem/', RequestFoodAPIView.as_view()),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]