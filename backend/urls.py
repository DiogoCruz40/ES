from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from backend.views import CalculatePriceAPIView, GetCheckPhotoAPIView, GetDeliveryAPIView, GetFoodAPIView, GetPaymentAPIView, ItemAPIView, RequestFoodAPIView, UpdateItemsFoodAPIView


urlpatterns = [
    path('getitems/', ItemAPIView.as_view()),
    path('calcprice/', CalculatePriceAPIView.as_view()),
    path('requestfood/', RequestFoodAPIView.as_view()),
    path('updateitems/',UpdateItemsFoodAPIView.as_view()),
    path('getfood/', GetFoodAPIView.as_view()),
    path('getpayment/',GetPaymentAPIView.as_view()),
    path('getdelivery/',GetDeliveryAPIView.as_view()),
    path('checkphoto/',GetCheckPhotoAPIView.as_view()),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]