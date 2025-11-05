from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static

router = DefaultRouter()



router = DefaultRouter()
router.register(r'songs', SongViewSet, basename='song')

urlpatterns = [
    path('', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
