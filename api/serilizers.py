from rest_framework.serializers import ModelSerializer
from .models import Note
from django.contrib.auth.models import User


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        # fields = ['title', 'body', 'Owner']
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
