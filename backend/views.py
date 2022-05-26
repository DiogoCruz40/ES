from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from .models import Item
from .serializers import ItemSerializer
from rest_framework import status,permissions
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

# Create your views here.
# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")


# def red(request,id,ola):
#     return HttpResponse(str(id) + ' ' + str(ola))

# def sum(request,sum1,sum2):
#     TODO
#     print("Sum: " + str(sum1+sum2))
#     return JsonResponse(data={'sum1':sum1,'sum2':sum2,'result':sum1+sum2})

class ItemAPIView(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self,username):
        try:
            return Item.objects.get(username=username)

        except Item.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self,request):
        item = Item.objects.all()
        serializer = ItemSerializer(item,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = ItemSerializer(data=request.data)

        if serializer.is_valid():
            # serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# class RequestFoodAPIView(APIView):
#     # permission_classes = [permissions.IsAuthenticated]

#     # def get(self,request):
#     #     requestfood = RequestFood.objects.all()
#     #     serializer = RequestFoodSerializer(requestfood,many=True)
#     #     return Response(serializer.data)

#     def post(self,request):
#         serializer = RequestFood(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
