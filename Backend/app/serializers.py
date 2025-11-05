from rest_framework import serializers
from .models import *
from datetime import datetime, timedelta
import random
from django.conf import settings

#------------------------------
#  📋 USER SERIALIZER
#------------------------------

class SongSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Song
        fields = ['id', 'user', 'name', 'file']
        read_only_fields = ['user']

