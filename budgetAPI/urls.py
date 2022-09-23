from django.urls import path, include
from rest_framework.routers import DefaultRouter
from budgetAPI import views


router = DefaultRouter()
router.register(r"projects", views.ProjectViewSet, basename="project")
router.register(r"categories", views.CategoryViewSet, basename="category")
router.register(r"expenses", views.ExpenseViewSet, basename="expense")
# router.register(r"profilelist", views.ProfileViewSet, basename="profile")
# router.register(r"users", views.ReadUserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
    # path("budgetapi/profile/", views.ProfileList.as_view()),
    # path("budgetapi/profile/<int:pk>/", views.ProfileDetail.as_view()),
]
