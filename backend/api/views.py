from urllib import request
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .serializers import TodoSerializer, TodoToggleCompleteSerializer
from todo.models import Todo

#to sign up
from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

#to login
from django.contrib.auth import authenticate

#to login-email
from api import send_email
from api.models import LoginCode
import threading

import environ
env = environ.Env()

class TodoListCreate(generics.ListCreateAPIView):
    #ListApyView requires two mandatory attributes serializers_class and queryset
    #We specify TodoSerializer which we have earlier implemented 
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user).order_by('-created')

    def perform_create(self, serializer):
        #serializer holds a django model
        serializer.save(user=self.request.user)

class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        #user can only update, delete own posts
        return Todo.objects.filter(user=user)

class TodoToggleComplete(generics.UpdateAPIView):
    serializer_class = TodoToggleCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user)
    
    def perform_update(self, serializer):
        serializer.instance.completed = not(serializer.instance.completed)
        serializer.save()

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request) #data is a dictionary
            
            #ToDo validate username and password

            user = User.objects.create(
                username=data['username'],
                password=data['password']
            )
            user.set_password(data['password'])
            user.save()
            token = Token.objects.create(user=user)

            return JsonResponse({'token':str(token)}, status=201)
        except IntegrityError:
            return JsonResponse({'error':'username taken. take another else'}, status=400)

def is_password_accepted(password):
    if (len(password) >= 8):
        return True

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user = authenticate(
            request,
            username=data['username'],
            password=data['password'])
        if user is None:
            return JsonResponse({'error':'unable to login. check username and password'},status=400)
        else: # return user token
            try:
                token = Token.objects.get(user=user)
            except: # if token not in db, create a new one
                token = Token.objects.create(user=user)
            return JsonResponse({'token':str(token)}, status=201)

@csrf_exempt
def user(request):
    if request.method == 'PATCH':
        data = JSONParser().parse(request)

        user = authenticate(request, username=data['username'], password=data['password'])

        if user is None:
            return JsonResponse({'error':'unable to login. check username and password'},status=400)
        else:
            try:

                new_username = data.get('new_username', '')
                if len(new_username) > 0:
                    try:
                        another_user = User.objects.get(username=new_username)
                        return JsonResponse({'error':'username not allowed'},status=400)
                    except:
                        user.username = new_username

                new_password = data.get('new_password', '')
                if len(new_password) > 0:
                    if is_password_accepted(new_password):
                        user.set_password(new_password)
                    else:
                        return JsonResponse({'error':'New password not allowed'},status=400)

                if len(new_username) <= 0 and len(new_password) <= 0:
                    return JsonResponse({'error':'Nothing to update'},status=404)

                user.save()

                return JsonResponse({'success':'User updated!'},status=200)
            except:
                return JsonResponse({'error':'Unable to update user'},status=400)
    
    if request.method == 'DELETE':
        data = JSONParser().parse(request)

        user = authenticate(request,
                            username=data['username'],
                            password=data['password'])

        if user is None:
            return JsonResponse({'error':'Unable to login. check username and password'},status=400)
        else:
            try:
                user.delete()
                return JsonResponse({'success':'User deleted!'},status=200)
            except:
                return JsonResponse({'error':'Unable to delete user'},status=400)

@csrf_exempt
def login_email(request, email):
    if request.method == 'GET':
        try:
            userAkser = User.objects.get(username=email)
        except:
            return JsonResponse({'Error':'Email / username wrong or not available.'},status=404)

        try:
            loginCode = LoginCode.objects.create(user=userAkser)
        except:
            return JsonResponse({'Error':'Impossible to create code.'},status=400)

        try:
            msg=f"""
                    If you want to log in click in the link\n
                    {env("URL_FRONTEND")}/{str(userAkser)}/{loginCode.code}/
                 """
            html = f"""
                <h4>If you want to log in click in the link</h4>
                <a href='{env("URL_FRONTEND")}/{str(userAkser)}/{loginCode.code}/' >Log in</a>
                <p>or</p>
                <p>{env("URL_FRONTEND")}/{str(userAkser)}/{loginCode.code}/</p>
            """
            send_email.send_mail(from_email="To-Do app", subject='Login with Email', to_emails=[email,], text=msg, html=html)

            response = {
                "Done":"Email sent.",
                "To":str(userAkser)
            }
            return JsonResponse(response, status=200)
        except:
            return JsonResponse({'Error':'We couldn\'t send the email'},status=400)

@csrf_exempt
def login_code(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            user_asker = User.objects.get(username=data['email'])
        except:
            return JsonResponse({'Error':'Email wrong or not available.'},status=404)

        try:
            loginCode = LoginCode.objects.get(user=user_asker, code=data['code'])
        except:
            return JsonResponse({'Error':'Code wrong or not available.'},status=404)

        try:
            token = Token.objects.get(user=user_asker)
        except: # if token not in db, create a new one
            token = Token.objects.create(user=user_asker)

        clean_login_codes(user_asker)

        response = {
            "username":str(user_asker),
            "token":str(token),
        }

        return JsonResponse(response, status=200)

def clean_login_codes(user=None):
    code_deleter = threading.Thread(target=clean_code_of, args=(user, ))
    code_deleter.run()

def clean_code_of(user=None):
    all_code_by_user = LoginCode.objects.filter(user=user)
    for code in all_code_by_user:
        code.delete()