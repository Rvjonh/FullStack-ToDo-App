from django.db import models
import uuid
from django.contrib.auth.models import User

# Create your models here.

class LoginCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=100, blank=True, unique=True,default=uuid.uuid4)

    def __str__(self) -> str:
        return f'{self.user} - {self.code}'
