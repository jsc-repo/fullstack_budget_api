from django.db import models
from django.urls import reverse
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from allauth.account.signals import user_signed_up


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # bio = models.TextField(max_length=500, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    avatar_url = models.URLField(default="")

    def __str__(self) -> str:
        return self.user.username


@receiver(user_signed_up)
def populate_profile(sociallogin, user, *args, **kwargs):

    user.profile = Profile()

    if sociallogin.account.provider == "github":
        data = user.socialaccount_set.filter(provider="github")[0].extra_data
        print("DATA", data)
        avatar_url = data.get("avatar_url")
        email = data.get("email")

    if sociallogin.account.provider == "google":
        data = user.socialaccount_set.filter(provider="google")[0].extra_data
        avatar_url = data.get("avatar_url")
        email = data.get("email")

    user.profile.avatar_url = avatar_url
    user.email = email
    user.profile.save()


# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)


# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()


# @receiver(user_signed_up)
# def populate_profile(sociallogin, user, *args, **kwargs):
#     print(sociallogin)
#     profile = Profile(user=user)

#     if sociallogin.account.provider == "github":
#         data = user.socialaccount_set.filter(provider="github")[0].extra_data
#         print("DATA", data)
#         avatar_url = data.get("avatar_url")

#     if sociallogin.account.provider == "google":
#         data = user.socialaccount_set.filter(provider="google")[0].extra_data
#         avatar_url = data.get("avatar_url")

#     user.profile.avatar_url = avatar_url
#     user.profile.save()


class Category(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories")
    # project = models.ForeignKey(
    #     Project, on_delete=models.CASCADE, related_name="categories", blank=True
    # )
    category_name = models.CharField(max_length=50, unique=True, blank=False)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return self.category_name


class Project(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="projects"
    )
    name = models.CharField(max_length=50)
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self) -> str:
        return f"{self.name} - {self.user.username}"

    def get_absolute_url(self):
        return reverse("projectdetail", kwargs={"pk": self.pk})


class Expense(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="expenses"
    )
    project = models.ForeignKey(
        Project, related_name="expenses", on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category,
        related_name="expenses",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    expense_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date_of_expense = models.DateField()
    created_at = models.DateTimeField(name="created at", auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.expense_name} ${self.amount}"
