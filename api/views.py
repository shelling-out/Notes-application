from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.http import Http404
from django.contrib.auth.models import User
from .models import Note
from rest_framework.response import Response
from .serilizers import NoteSerializer, UserSerializer
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt


@api_view(['GET', 'POST'])
def NotesView(request):

    if not request.user.is_authenticated:
        return Response('YOU ARE NOT AUTHENTICATED',status=status.HTTP_400_BAD_REQUEST)

    ######## GET #########
    if request.method == 'GET':
        user = request.user
        query = user.note_set.all()
        serializedQuery = NoteSerializer(query, many=True)
        return Response(serializedQuery.data)

    ######## POST #########
    elif request.method == 'POST':
        serialized = NoteSerializer(data=request.data, many=False)
        if serialized.is_valid():
            serialized.validated_data['Owner'] = request.user
            serialized.save()
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response('BAD REQUEST' , status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'DELETE', 'PUT'])
def NoteView(reqeust, pk):
    try:
        note = Note.objects.get(id=pk)
    except:
        return Response('Note not found' ,status=status.HTTP_400_BAD_REQUEST)

    if not reqeust.user.is_authenticated:
        # change this to redirect to login page or registeration
        Response('You are not authniticated',status=status.HTTP_400_BAD_REQUEST)

    if reqeust.user != note.Owner:
        return Response('Note not found' ,status=status.HTTP_400_BAD_REQUEST)

    ######## GET #########
    if reqeust.method == 'GET':
        serializedQuery = NoteSerializer(note, many=False)
        return Response(serializedQuery.data)

    ######## PUT #########
    elif reqeust.method == 'PUT':
        serializedQuery = NoteSerializer(instance=note, data=reqeust.data)
        if serializedQuery.is_valid():
            serializedQuery.save()
            return Response(serializedQuery.data)
        return Response('DATA NOT VALID',status=status.HTTP_400_BAD_REQUEST)

    ######## DELETE #########
    elif reqeust.method == 'DELETE':
        note.delete()
        return Response('notes')
    return Response('BAD REQUEST' , status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def LoginView(reqeust):
    if reqeust.user.is_authenticated:
        return Response('YOU ARE ALREADY AUTHENTICATED',status=status.HTTP_400_BAD_REQUEST)

    username = reqeust.data['username']
    password = reqeust.data['password']
    try:
        user = User.objects.get(username=username)
    except:
        return Response('USERNAME OR PASSWORD IS WRONG' , status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(reqeust, username=username, password=password)
    if user is not None:
        login(reqeust, user)
        return Response(status.HTTP_201_CREATED)
    return Response('USERNAME OR PASSWORD IS WRONG' ,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def RegisterView(request):
    if request.user.is_authenticated:
        return Response('YOU ALREADY HAVE AN ACCOUT',status=status.HTTP_400_BAD_REQUEST)

    username = request.data['username']
    password = request.data['password']
    try:
        User.objects.get(username=username)
        return Response('USERNAME ALREADY EXIST',status=status.HTTP_400_BAD_REQUEST)
    except:
        user = User.objects.create(username=username)
        user.set_password(password)
        user.save()
        return Response('USER HAS BEEN CREATED')


@api_view(['GET'])
def LogoutView(reqeust):
    logout(reqeust)
    return Response('logged out')


# {
#     "username": "peter2",
#     "password": "p13243s334."
# }
# {
#     "title": "this is title",
#     "body": "body"
# }
