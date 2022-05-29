import json
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

# Create your views here.
# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

class ItemAPIView(APIView):
    def get(self,request):
        lambda_client = boto3.client('lambda',region_name='us-east-1')
        response = lambda_client.invoke(FunctionName='getitems')
        return Response(json.loads(response["Payload"].read())["body"],status=status.HTTP_200_OK)
        # return Response(response,status=status.HTTP_200_OK)

class RequestFoodAPIView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    # def get(self,request):
    #     requestfood = RequestFood.objects.all()
    #     serializer = RequestFoodSerializer(requestfood,many=True)
    #     return Response(serializer.data)

    def post(self,request):
        # sfn_client = boto3.client('stepfunctions',region_name='us-east-1')#Switch according to what you want to use
        #response = sfn_client.start_execution(
        # stateMachineArn=state_machine_arn,
        # name='test1',
        # input=json.dumps({ 'TransactionType': 'PURCHASE' })
        # )

      # Retrieve the list of existing buckets
        s3 = boto3.client('s3')
        dynamodb = boto3.resource('dynamodb')
        response = s3.list_buckets()
        
        table = dynamodb.Table('users')
        response = table.get_item(
        Key={
        'username': 'janedoe',
        'last_name': 'Doe'
        }
        )
        item = response['Item']
        print(item)
        # Output the bucket names
        print('Existing buckets:')
        for bucket in response['Buckets']:
            print(f'  {bucket["Name"]}')

        # if serializer.is_valid():
        #     # serializer.save()
        #     return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(response,status=status.HTTP_400_BAD_REQUEST)


class SendPhotoAPIView(APIView):

    def post(self,request):

        s3 = boto3.resource('s3')
        bucket_name = 'BucketName'
        #where the file will be uploaded, if you want to upload the file to folder use 'Folder Name/FileName.jpeg'
        file_name_with_extention = 'FileName.jpeg'
        url_to_download = 'URL'

        #make sure there is no data:image/jpeg;base64 in the string that returns
        def get_as_base64(url):
            return base64.b64encode(requests.get(url).content)

        def lambda_handler(event, context):
            image_base64 = get_as_base64(url_to_download)
            obj = s3.Object(bucket_name,file_name_with_extention)
            obj.put(Body=base64.b64decode(image_base64))
            
            #get bucket location
            location = boto3.client('s3').get_bucket_location(Bucket=bucket_name)['LocationConstraint']
            #get object url
            object_url = "https://%s.s3-%s.amazonaws.com/%s" % (bucket_name,location, file_name_with_extention)
            print(object_url)

        return Response({'message':'Created with success'},status=status.HTTP_201_CREATED)
# {"ola":"entao"}