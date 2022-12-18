
from django.urls import URLPattern, path

from . import views

urlpatterns = [
    path('todos/', views.TodoListCreate.as_view()),
    path('todos/<int:pk>', views.TodoRetrieveUpdateDestroy.as_view()),
    path('todos/<int:pk>/complete', views.TodoToggleComplete.as_view()),
    path('signup/', views.signup),
    path('login/',views.login),
    path('user/', views.user),
    path('login-email/<str:email>', views.login_email),
    path('login-code/', views.login_code),
]