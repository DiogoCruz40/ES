import json
from re import T
from time import sleep
from unicodedata import name
from urllib import response
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework import status,permissions
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
import boto3
from botocore.vendored import requests
import uuid
# Create your views here.
# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

class ItemAPIView(APIView):
    #Lists items for client
    def get(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='getitems')
        return Response(json.loads(response["Payload"].read())["body"],status=status.HTTP_200_OK)

class CalculatePriceAPIView(APIView):
    #Calculates order price
    def post(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='calcprice',InvocationType='RequestResponse',
                     Payload=json.dumps(request.data))
        return Response(json.loads(response["Payload"].read()),status=status.HTTP_200_OK)

class GetFoodAPIView(APIView):
    #Gets requests for kitchen
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='getrequests')
        return Response(json.loads(response["Payload"].read())["body"],status=status.HTTP_200_OK)

class UpdateItemsFoodAPIView(APIView):
    #Updates requests from kitchen
    permission_classes = [permissions.IsAuthenticated]

    def put(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='updaterequests',Payload=json.dumps(request.data))
        return Response(json.loads(response["Payload"].read()),status=status.HTTP_200_OK)

class RequestFoodAPIView(APIView):
    #Main process, makes a request from client to kitchen.
    def post(self,request):
        request.data['exec_name'] = uuid.uuid4().hex

        sfn_client = boto3.client('stepfunctions',region_name='us-east-1')#Switch according to what you want to use
        response_exec = sfn_client.start_execution(
            stateMachineArn='arn:aws:states:us-east-1:517565264163:stateMachine:MyStateMachine',
            name=request.data['exec_name'],
            input=json.dumps(request.data)
        ) #start the step function execution CAREFUL, IT's ASYNC, RESPONSE RETURN LINK FOR WHERE THE RESULT WILL BE
        # response_execution_arn = response['executionArn']
        response = dict()
        response['exec_name'] = request.data['exec_name']
        response['execArn'] = response_exec['executionArn']            

        return Response(response,status=status.HTTP_200_OK)
    # {"Request":"makerequest"}

class GetPaymentAPIView(APIView):
    def post(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='getpayments',Payload=json.dumps(request.data))
        return Response(json.loads(response["Payload"].read()),status=status.HTTP_200_OK)

class GetDeliveryAPIView(APIView):
    #Client checks order status, if it's been prepared.
    def post(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='getdeliverys',Payload=json.dumps(request.data))
        return Response(json.loads(response["Payload"].read()),status=status.HTTP_200_OK)

class GetCheckPhotoAPIView(APIView):
    def post(self,request):
        sfn_client = boto3.client('stepfunctions',region_name='us-east-1')#Switch according to what you want to use
        
        response = sfn_client.describe_execution(
            executionArn=str(request.data['execArn'])) #get the response

        while response['status'] == 'RUNNING':
            response = sfn_client.describe_execution(
                executionArn=str(request.data['execArn'])
        )
        return Response(response,status=status.HTTP_200_OK)