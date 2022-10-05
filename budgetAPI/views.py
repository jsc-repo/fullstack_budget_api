from email.policy import HTTP
from django.shortcuts import render
from budgetAPI import serializers

from budgetAPI.models import Profile, Category, Expense, Project
from budgetAPI.permissions import IsOwnerOnly, IsOwnerOrReadOnly
from budgetAPI.serializers import (
    ReadProjectSerializer,
    WriteProjectSerializer,
    ReadCategorySerializer,
    ReadProfileSerializer,
    WriteProfileSerializer,
    ReadExpenseSerializer,
    WriteExpenseSerializer,
    # ReadUserSerializer,
)
from rest_framework.views import APIView
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes


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


# class ProfileViewSet(viewsets.ModelViewSet):
#     permission_classes = [permissions.IsAuthenticated, IsOwnerOnly]
#     # queryset = Profile.objects.all()

#     def get_queryset(self):
#         return Profile.objects.filter(user=self.request.user)

#     def get_serializer_class(self):
#         if self.action in ["list", "retrieve"]:
#             return ReadProfileSerializer
#         elif self.action in ["update", "destroy"]:
#             return WriteProfileSerializer


@api_view(["GET", "PUT", "DELETE"])
@permission_classes((permissions.IsAuthenticated, IsOwnerOnly))
def profile(request):

    context = {"request": request}

    try:
        profile = Profile.objects.get(user=request.user)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ReadProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = WriteProfileSerializer(profile, data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class ProfileView(APIView):
#     """
#     Users can only GET or UPDATE their profile info
#     """

#     def get(self, request, format=None):
#         profile = Profile.objects.get(user=request.user)
#         serializer = ReadProfileSerializer(profile, many=True)
#         return Response(serializer.data)
