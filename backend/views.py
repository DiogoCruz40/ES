from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def red(request,id,ola):
    return HttpResponse(str(id) + ' ' + str(ola))

def sum(request,sum1,sum2):
    #TODO
    print("Sum: " + str(sum1+sum2))
    return JsonResponse(data={'sum1':sum1,'sum2':sum2,'result':sum1+sum2})