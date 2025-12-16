from django.contrib.auth.models import User
from rest_framework import serializers

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}} #this makes passwords be hushed and not returned by json
        
    def create(self, validate_data):
        user = User.objects.create_user(**validate_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author':{'read_only': True}} #only the signed in user will be displayed. Users cannot define the author
        
        