from django.conf import settings
from rest_framework import serializers
from budgetAPI.models import Category, Expense, Profile, Project


# class CategorySerializer(serializers.ModelSerializer):
#     user = serializers.HiddenField(default=serializers.CurrentUserDefault())

#     class Meta:
#         model = Category
#         fields = ["id", "category_name", "project", "user"]

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         request = self.context.get("request")

#         if request:
#             user = request.user
#             self.fields["project"].queryset = user.projects.all()


class ReadCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["category_name"]
        read_only_fields = fields


class ReadExpenseSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    category = ReadCategorySerializer(read_only=True)

    class Meta:
        model = Expense
        fields = [
            "id",
            "user",
            # "project",
            "expense_name",
            "amount",
            "date_of_expense",
            "category",
        ]

        read_only_fields = fields

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     request = self.context.get("request")

    #     if request:
    #         user = request.user
    #         self.fields["project"].queryset = user.projects.all()


class WriteExpenseSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Expense
        fields = [
            "user",
            "project",
            "expense_name",
            "amount",
            "date_of_expense",
            "category",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get("request")
        user = request.user
        self.fields.get("project").queryset = user.projects.all()


class ReadProjectSerializer(serializers.ModelSerializer):
    expenses = ReadExpenseSerializer(read_only=True, many=True)

    class Meta:
        model = Project
        fields = ["id", "name", "budget", "expenses"]
        read_only_fields = fields


class WriteProjectSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # def create(self, validated_data):
    #     return super().create(validated_data)

    class Meta:
        model = Project
        fields = ["user", "name", "budget"]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ["user"]


# class ReadUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = settings.AUTH_USER_MODEL
#         fields = [
#             "id",
#             "username",
#         ]
#         read_only_fields = fields
