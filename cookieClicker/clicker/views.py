from django.shortcuts import render
from django.urls import reverse
from django.views import generic
from django.template import Context, loader

from django import template

from django.http import HttpResponse

from django.shortcuts import render_to_response

# # Create your views here.

def index(request):

    # page = open('/home/student/Desktop/cookie/cookieClicker/clicker/template/cookieClicker/index.html','r')
    # page1 = Template(page.read())
    
    # html = Template(page)
    # page.close()
    # return HttpResponse(html)

    # template = loader.get_template("clicker/index.html")
    # return HttpResponse(template.render())

    #return render(request, 'clickers/index.html')

    return render(request, 'index.html')