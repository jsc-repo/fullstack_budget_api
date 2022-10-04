from threading import local
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
        fields = ["id", "category_name"]
        read_only_fields = fields


class ReadExpenseSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    category = ReadCategorySerializer(read_only=True)
    amount = serializers.DecimalField(
        max_digits=10, decimal_places=2, default=0, localize=True
    )

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
    # category = serializers.SlugRelatedField(
    #     slug_field="category", queryset=Expense.objects.all(), many=True
    # )
    category = serializers.CharField()

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

    def create(self, validated_data):
        category_data = validated_data.pop("category")
        # category = category_data[0]
        category_name = Category.objects.get(category_name=category_data)
        expense = Expense.objects.create(**validated_data, category=category_name)

        return expense

    def update(self, instance, validated_data):
        category_data = validated_data.pop("category")
        category_name = Category.objects.get(category_name=category_data)

        instance.project = validated_data.get("project")
        instance.expense_name = validated_data.get("expense_name")
        instance.amount = validated_data.get("amount")
        instance.date_of_expense = validated_data.get("date_of_expense")
        instance.category = category_name

        instance.save()

        return instance


class ReadProjectSerializer(serializers.ModelSerializer):
    # expenses = ReadExpenseSerializer(read_only=True, many=True)
    expenses = serializers.SerializerMethodField()
    budget = serializers.DecimalField(
        max_digits=10, decimal_places=2, default=0, localize=True
    )

    class Meta:
        model = Project
        fields = ["id", "name", "budget", "expenses"]
        read_only_fields = fields

    def get_expenses(self, obj):
        return obj.expenses.values("expense_name").count()


class WriteProjectSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

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


# class Album(models.Model):
#     album_name = models.CharField(max_length=100)
#     artist = models.CharField(max_length=100)

# class Track(models.Model):
#     album = models.ForeignKey(Album, related_name='tracks', on_delete=models.CASCADE)
#     order = models.IntegerField()
#     title = models.CharField(max_length=100)
#     duration = models.IntegerField()

#     class Meta:
#         unique_together = ['album', 'order']
#         ordering = ['order']

#     def __str__(self):
#         return '%d: %s' % (self.order, self.title)
