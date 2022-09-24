# import urllib.parse
# from django.urls import reverse
# from django.shortcuts import render, redirect
# from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from dj_rest_auth.registration.views import SocialLoginView


# class GitHubLogin(SocialLoginView):
#     adapter_class = GitHubOAuth2Adapter
#     # callback_url = "http://127.0.0.1:8000/accounts/github/login/callback/"
#     client_class = OAuth2Client

#     @property
#     def callback_url(self):
#         print(self.request.build_absolute_uri(reverse("github_callback")))
#         return self.request.build_absolute_uri(reverse("github_callback"))


# def github_callback(request):
#     params = urllib.parse.urlencode(request.get)
#     print(params)
#     return redirect(f"http://127.0.0.1:5173/?{params}")


# # Create your views here.
