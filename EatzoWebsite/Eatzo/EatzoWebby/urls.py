from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('catering-events.html', views.catering_events, name='catering-events'),

]
