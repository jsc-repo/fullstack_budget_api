"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views

from allauth.socialaccount.providers.github import views as github_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("dj_rest_auth.urls")),
    # path("accounts/", include("allauth.urls")),
    # path("accounts/", include("accounts.urls")),
    path("api/v1/", include("budgetAPI.urls")),
    path("auth/github/", views.GitHubLogin.as_view(), name="github_login"),
    path("auth/github/login/", github_views.oauth2_login),
    path("auth/github/login/callback/", views.github_callback, name="github_callback"),
]

# urlpatterns += [
#     path("github/", views.GitHubLogin.as_view()),
#     path("auth/github/login/", github_views.oauth2_login),
#     path("auth/github/login/callback/", views.github_callback, name="github_callback"),
# ]
