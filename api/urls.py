from distutils.log import Log
from django.urls import path
from .views import NotesView,  NoteView, LoginView, RegisterView, LogoutView
# , NoteUpdateView, NoteCreationView, NoteView
urlpatterns = [
    path('', LoginView, name='login'),
    path('notes/', NotesView, name='notes'),
    path('notes/<str:pk>/', NoteView, name='note'),
    path('register/', RegisterView, name='register'),
    path('logout/', LogoutView, name='logout')
]

# path('note/<str:pk>/', NoteView, name='note-view'),
# path('update/<str:pk>/', NoteUpdateView, name='update-view'),
# path('create/', NoteCreationView, name='create-view'),
