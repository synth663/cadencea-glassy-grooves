from django.db import models
from base.models import User   # adjust import based on your structure

class Artist(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.SET_NULL, null=True)
    language = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    cover_image = models.ImageField(upload_to="song_covers/")
    audio_file = models.FileField(upload_to="songs/audio/")
    lrc_file = models.FileField(upload_to="songs/lyrics/")
    duration = models.PositiveIntegerField(help_text="Duration in seconds")

    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL,
                                    null=True, related_name="uploaded_songs")

    def __str__(self):
        return self.title


class SongLyricLine(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name="lyrics")
    timestamp = models.FloatField(help_text="Seconds since start of song")
    text = models.CharField(max_length=500)

    def __str__(self):
        return f"[{self.timestamp}] {self.text}"
