# Generated by Django 4.1.1 on 2022-10-04 13:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("budgetAPI", "0003_profile_avatar_url"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="profile",
            name="bio",
        ),
    ]
