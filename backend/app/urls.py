from django.urls import path,include 
from .import views
from .views import(
    RefreshTokenView,
    LogoutView
)
urlpatterns = [
    path("chat",views.chat),
    path("checkdomain",views.checkdomain),
    path("create-intent",views.createintent),
    path("googlelogin",views.Googlelogin),
    path("signup",views.Signup),
    path("loginuser",views.Loginuser),
    path("refresh", RefreshTokenView.as_view()),
    path("logout",LogoutView.as_view()),
]
      