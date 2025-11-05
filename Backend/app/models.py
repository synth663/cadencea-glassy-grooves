from django.db import models
from django.core.exceptions import ValidationError
from django.conf import settings
from django.contrib.auth.models import(
    AbstractUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.validators import RegexValidator, validate_email


# ------------------------------
# 📦 PACKAGE MODEL
# ------------------------------
class Package(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name




class Song(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='songs'
    )
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='songs/')

    def __str__(self):
        return self.name



