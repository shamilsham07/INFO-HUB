from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from google.auth.transport import requests as google_requests
from google import genai
from google.oauth2 import id_token
import os
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from django.conf import settings
import requests
import stripe
import json
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from .serializer import logSerializer

# Create your views here.      
client=genai.Client(api_key=os.getenv("gen_api"))  
print(client) 
domainapi=settings.WHOSE_API_KEY
stripe.api_key=os.getenv("stripe_sk")
client_id=os.getenv("client_id")

@api_view(["POST"])
def chat(request):    
    try:
        print(client)
        data=request.data.get("data")
        print("he",data) 
        try:   
            response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=data,
            )
            print(response.text)
            return JsonResponse({"data":{
                "question":data,
                "response":response.text
            }})
        except Exception as e:
            print("something went wreong")
            return JsonResponse({"error":"somethng went wrong"})
       
    except Exception as e:
        print(e)
        return JsonResponse({"error":"something went wrong"})
    
@api_view(["POST"])
def checkdomain(request):
    try:
        url = "https://api.whoisfreaks.com/v1.0/domain/availability"
        data=request.data.get("domain")
        params={
            "domain":data,
            "apiKey":domainapi
        }
        try:
            response=requests.get(url,params=params)
            res=response.json()   
            print(res)     
            if response.status_code==400:  
                print("not match")  
                return JsonResponse({"error":"something fishy"})
            elif res.get("domainAvailability")==False:     
                print("good")
                print(res.get("domainAvailability"))  
                return JsonResponse({"notavailable":"domain already used"})    
            elif res.get("domainAvailability")==True:
                print("fffffffffffffffffffffff")   
                return JsonResponse({"match":"good"})
            return JsonResponse({"everything":"everyhting seems good"})
        except Exception as e:
            print(e)     
            print(data)
            print(domainapi)      
            print("hiiii")
            return JsonResponse({"notinggood":"sopmething went wwwww"})
   
    except Exception as e:
    
     print("e")
     return JsonResponse({"error":"something went wrong"})
 
 
@api_view(["POST"])
def createintent(request):
    try:
        print("hello")    
        intent=stripe.PaymentIntent.create(
            amount=1099,  # in cents
            currency="usd",
            automatic_payment_methods={"enabled": True},    
        )
        
        return JsonResponse({"client_secret":intent.client_secret})
    except Exception as e:
        print(e)
        return JsonResponse({"error":"something went wrong"})   
    
@api_view(["POST"])
def Googlelogin(request):
    try:     
        print("hello")   
        token=request.data.get("token")
        try:
            google_user_info = requests.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            params={"access_token": token}
            ).json()
            name=google_user_info.get("name")
            email=google_user_info.get("email")   
            print(name,email)
            return JsonResponse({"logged":"looks fine logged"})
        except Exception as e:      
            print(e)
            return JsonResponse({"error":"something fishy happened "})
    except Exception as e:
        print(e)
        return JsonResponse({"error":"something went wrong"})   
    
    
@api_view(["POST"])
def Signup(request):
    try:
        name=request.data.get("name")
        email=request.data.get("email")
        password=request.data.get("password")
        print(name,email,password)
        print("hello")   
        try:
            print("hello")
            UserAccount.objects.create_user(
                name=name,
                email=email,
                password=password,
            );
            
            return JsonResponse({"signup":"you have been logged"})
        except Exception as e:
            print(e)
            return JsonResponse({"mailerror":"somerthing went wrong"})
      
    except Exception as e:
        print(e)
        return JsonResponse({"error":'something went worng'})
    
    
@api_view(["POST"])
def Loginuser(request):
    try:   
        serialize=logSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        user = serialize.validated_data["user"]
        print(user.name)   
        refresh = RefreshToken.for_user(user)
        print(refresh)
        response=Response(
            {
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                }
            },
        )
        response.set_cookie(
            key="access",
            value=str(refresh.access_token),
            httponly=True,
            secure=False,  # True in production (HTTPS)
            samesite="Lax",
        )
        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax",
        )
        print(response)
        print(request.COOKIES)
        return response
    except Exception as e:
        print(e)
        return JsonResponse({"error":"something went worng"})
    
    
class RefreshTokenView(APIView):
    def post(self, request):
        print(request.COOKIES)
        
        refresh_token = request.COOKIES.get("refresh")

        if not refresh_token:
            return JsonResponse({"error": "No refresh token"}, status=401)
        try:
            refresh = RefreshToken(refresh_token)
            access = refresh.access_token

            response = Response(
                    {
                        "authenticated": True,
                        "message": "Token refreshed"
                    },
                    status=status.HTTP_200_OK
                )
            response.set_cookie(
                key="access",
                value=str(access),
                httponly=True,
                secure=False,
                samesite="Lax",
            )
            return response

        except TokenError:
            # 3️⃣ Invalid / expired refresh token
            response = Response(
                {"authenticated": False, "error": "Session expired"},
                status=status.HTTP_401_UNAUTHORIZED
            )
            response.delete_cookie("access")
            response.delete_cookie("refresh")
            return response

       
    

class LogoutView(APIView,):
    def post(self,request):
        response = Response({"message": "Logged out"})
        response.delete_cookie("access")  
        response.delete_cookie("refresh")
        return response