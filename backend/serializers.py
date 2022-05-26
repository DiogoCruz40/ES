from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id','title','description','price']
        # fields = '__all__'

# class RequestFoodSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RequestFood
#         fields = ['title','price','locationtag','idimage']