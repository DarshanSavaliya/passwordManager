from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Website(models.Model):
    url = models.CharField(max_length=40)


class User_Password(models.Model):
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    website = models.ForeignKey(
        Website, default=None, on_delete=models.CASCADE)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=128)
    note = models.TextField(default=None)

    decrypted_password = None
    decrypted_note = None
    tag_list = None

class Tag(models.Model):
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    tag_name = models.CharField(max_length=20, default=None)
    password = models.ManyToManyField(User_Password)
