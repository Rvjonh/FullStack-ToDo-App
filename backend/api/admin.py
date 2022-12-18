from django.contrib import admin
from api.models import LoginCode

# Register your models here.

class LoginCodeAdmin(admin.ModelAdmin):
    list_display = ('user', 'code')

admin.site.register(LoginCode, LoginCodeAdmin)