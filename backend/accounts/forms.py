from django import forms
from django.contrib.auth.hashers import make_password

from .models import User


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "password"]

    def save(self, commit=True):
        email = self.cleaned_data.get('email')
        first_name = self.cleaned_data.get('first_name')
        last_name = self.cleaned_data.get('last_name')
        password = self.cleaned_data.get('password')
        user = User.objects.update_or_create(email=email, first_name=first_name,
                                             last_name=last_name, password=make_password(password))