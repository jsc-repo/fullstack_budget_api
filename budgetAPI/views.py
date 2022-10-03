from django.shortcuts import render

from budgetAPI.models import Profile, Category, Expense, Project
from budgetAPI.permissions import IsOwnerOnly, IsOwnerOrReadOnly
from budgetAPI.serializers import (
    ReadProjectSerializer,
    WriteProjectSerializer,
    ReadCategorySerializer,
    ProfileSerializer,
    ReadExpenseSerializer,
    WriteExpenseSerializer,
    # ReadUserSerializer,
)
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action


# Create your views here.
class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsOwnerOnly]

    pagination_class = None

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ReadProjectSerializer
        return WriteProjectSerializer

    def get_queryset(self):
        return (
            Project.objects.prefetch_related("expenses")
            .prefetch_related("expenses__category")
            .filter(user=self.request.user)
        )

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    @action(methods=["get"], detail=True)
    def expenses(self, request, pk=None):
        if request.method == "GET":
            # this is needed to check if the project exists
            project = Project.objects.get(pk=pk)

            queryset = project.expenses.all()
            serializer = ReadExpenseSerializer(queryset, many=True)
            # queryset = Expense.objects.filter(project__id=pk)
            # serializer = ReadExpenseSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_403_FORBIDDEN)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = ReadCategorySerializer
    # permission_classes = [permissions.IsAdminUser]

    pagination_class = None

    # def get_serializer_context(self):
    #     context = super(CategoryViewSet, self).get_serializer_context()
    #     context.update({"request": self.request})
    #     return context


class ExpenseViewSet(viewsets.ModelViewSet):
    # queryset = Expense.objects.all()

    permission_classes = [permissions.IsAuthenticated, IsOwnerOnly]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ReadExpenseSerializer
        return WriteExpenseSerializer

    # during the GET request, query only the expenses and its related objects
    # that belong to the logged in user
    def get_queryset(self):
        return Expense.objects.select_related("project", "category").filter(
            user=self.request.user
        )
        # return self.request.user.objects.select_related("expenses")

    # def perform_create(self, serializer):
    #     print("SER", serializer)
    #     serializer.save(project=self.request.user.projects)

    # def get_serializer_context(self):
    #     context = super().get_serializer_context()
    #     context.update({"request": self.request})
    #     return context


# class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer


# class ReadUserViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = ReadUserSerializer
#     permission_classes = [permissions.IsAdminUser]


# class ProfileList(generics.ListCreateAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
#     permission_classes = [permissions.IsAdminUser]


# class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
