from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,BaseUserManager,Permission


class CustomManager(BaseUserManager):
    def create_user(self,email,name=None,password=None):
        if not email:
            raise ValueError("email is required")
        email=self.normalize_email(email)
   
        user=self.model(
            name=name,
            email=email,
            )
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user
    
    
class UserAccount(AbstractBaseUser,PermissionsMixin):
    name=models.CharField(null=True,blank=True,max_length=150,)
    email=models.EmailField(unique=True,null=True,blank=True)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=True)
    
    objects = CustomManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email
    
    
    
class Registerpremium(models.Model):
    user=models.ForeignKey(UserAccount,on_delete=models.CASCADE)
    Registerdate=models.DateField(auto_now_add=True)
    Enddate=models.DateField()
    premiummode=models.IntegerField(default=0)
    
