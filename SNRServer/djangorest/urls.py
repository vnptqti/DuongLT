"""djangorest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path
#
# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

# url.py
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.views import *
#from rest.views import PostListCreateAPIView, PostDetailUpdateAPIView, FileUploadView
from rest.views import  FileUploadView

router = routers.SimpleRouter()
# router.register(r'posts', PostListCreateAPIView, base_name="Posts")  # đăng ký API vào router
# router.register(r'posts', PostDetailUpdateAPIView, base_name="Posts")

urlpatterns = [
    path('', FileUploadView.as_view())
]

urlpatterns = [
    url('^api/', include(router.urls)),  # Đăng ký router url vào project url
    url(r'^admin/', admin.site.urls),
    # url(r'^upload/', include(router.urls)),
    path('upload/', FileUploadView.as_view()),

]
if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
