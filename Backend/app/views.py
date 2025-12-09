from rest_framework import generics, permissions
from .models import Song
from .serializers import SongSerializer, SongUploadSerializer

# Admin uploads song
class SongUploadView(generics.CreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongUploadSerializer
    permission_classes = [permissions.IsAdminUser]


# List songs for users
class SongListView(generics.ListAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny]


# Get single song + audio + lyrics
class SongDetailView(generics.RetrieveAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny]
