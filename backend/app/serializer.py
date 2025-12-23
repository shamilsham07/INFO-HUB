from django.contrib.auth import authenticate
from rest_framework import serializers

class logSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)
    
    def validate(self,data):
        email=data.get("email")
        password=data.get("password")
        name=data.get("name")
        
        user=authenticate(email=email,password=password)
        if not user:
            raise serializers.ValidationError("user and mail is invalid")
        data["user"]=user
        return data