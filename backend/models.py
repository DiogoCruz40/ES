from django.db import models

# Create your models here.

# class Item(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.CharField(max_length=256)
#     price = models.DecimalField(max_digits=6, decimal_places=2)

#     def __str__(self):
#         return self.title

# class RequestFood(models.Model):
#     title = models.CharField(max_length=100)
#     price = models.DecimalField(max_digits=6, decimal_places=2)
#     locationtag = models.BigIntegerField()
#     delivery = models.BooleanField(default=False)
#     status = models.BooleanField(null=True)
#     idimage = models.UUIDField(default=uuid.uuid4, editable=False)
    
#     def __str__(self):
#         return self.title