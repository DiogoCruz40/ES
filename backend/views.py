from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import redirect

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def red(request,id,ola):
    return HttpResponse(str(id) + ' ' + str(ola))