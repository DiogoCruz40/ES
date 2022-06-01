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
import base64
import uuid
# Create your views here.
# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

class ItemAPIView(APIView):
    def get(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='getitems')
        return Response(json.loads(response["Payload"].read())["body"],status=status.HTTP_200_OK)


class CalculatePriceAPIView(APIView):
    def post(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='calcprice',InvocationType='RequestResponse',
                     Payload=json.dumps(request.data))
        return Response(json.loads(response["Payload"].read()),status=status.HTTP_200_OK)

class GetFoodAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='getrequests')
        return Response(json.loads(response["Payload"].read())["body"],status=status.HTTP_200_OK)


class RequestFoodAPIView(APIView):
    def post(self,request):
        request.data['execname'] = uuid.uuid4().hex

        sfn_client = boto3.client('stepfunctions',region_name='us-east-1')#Switch according to what you want to use
        response = sfn_client.start_execution(
        stateMachineArn='arn:aws:states:us-east-1:517565264163:stateMachine:MyStateMachine',
        name=request.data['execname'],
        input=json.dumps(request.data)
        ) #start the step function execution CAREFUL, IT's ASYNC, RESPONSE RETURN LINK FOR WHERE THE RESULT WILL BE
        response_execution_arn = response['executionArn']
        response = sfn_client.describe_execution(
        executionArn=str(response_execution_arn)) #get the response

        # # USAR AQUI STEP FUNCTION ACTIVITY
        while response['status'] == 'RUNNING':
            response = sfn_client.describe_execution(
            executionArn=str(response_execution_arn)
        ) #here i was waiting for it to be executed but you can do a sync step function or do some other thing
            # try:
            #     if(json.loads(response["output"])["facematched"] == True):
            #         res = False
            #     elif(json.loads(response["output"])["facematched"] == False):
            #         res = True
            # except:
            #     pass
            
        return Response(response,status=status.HTTP_200_OK)
    # {"Request":"makerequest"}

# USAR AQUI STEP FUNCTION ACTIVITY
class UpdateItemsFoodAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='updaterequests',Payload=json.dumps(request.data))
        return Response(json.loads(response["Payload"].read())["body"],status=status.HTTP_200_OK)