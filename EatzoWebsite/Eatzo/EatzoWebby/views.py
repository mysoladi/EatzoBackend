from django.shortcuts import render

def index(request):
    return render(request, 'index.html')


def catering_events(request):
    return render(request, 'catering-events.html')

