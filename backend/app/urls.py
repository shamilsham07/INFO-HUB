from django.urls import path,include 
from .import views

urlpatterns = [
    path("chat",views.chat),
    path("checkdomain",views.checkdomain),
    path("create-intent",views.createintent),
    path("googlelogin",views.Googlelogin),
    path("signup",views.Signup)
]
   