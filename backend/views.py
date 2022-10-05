import urllib.parse
from django.urls import reverse
from django.shortcuts import render, redirect
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView


class GitHubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    client_class = OAuth2Client

    @property
    def callback_url(self):
        # print(self.request.build_absolute_uri(reverse("github_callback")))
        return self.request.build_absolute_uri(reverse("github_callback"))


def github_callback(request):
    params = urllib.parse.urlencode(request.GET)
    return redirect(f"http://127.0.0.1:5173/github/login?{params}")
