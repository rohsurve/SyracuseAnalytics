"""SyracuseAnalytics URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import include, url
from django.contrib import admin
import dashboard.views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from dashboard import views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$',dashboard.views.index, name='index'),
    url(r'^roadRatings/', views.roadRatings, name="roadRatings"),
    url(r'^streetNames/', views.streetNames, name="streetNames"),
    url(r'^roadRatingsByYear/', views.roadRatingsByYear, name="roadRatingsByYear"),
    url(r'^potHolesByStreet/', views.potHolesByStreet, name="potHolesByStreet"),

]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)