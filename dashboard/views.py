from django.template import RequestContext
from django.http import HttpResponse
from django.shortcuts import render_to_response, render,get_object_or_404, redirect
from dashboard.models import RoadRatings,Streets,Potholes
import os
import json
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncosder.default(self, o)

def index(request):
    context = dict()
    context['data'] = ""
    return render(request, 'index.html', context)

def roadRatingsByYear(request):
    year = request.GET.get('year')
    roadRatings = RoadRatings.objects.filter().filter(dateRated__ne=None,dateRated=year).aggregate(

        {"$group": {
            "_id": {
                "streetName":"$streetName",
                "streetID": "$streetID",
            },
            "crack": {"$push": "$crack"},
            "patch": {"$push": "$patch"},
            "overall": {"$push": "$overall"}
        }},
    )
    results = list()
    for document in roadRatings:
        data = {
            "streetName": document['_id']['streetName'],
            "streetID": document['_id']['streetID'],
            "crack": document['crack'],
            "patch": document['patch'],
            "overall": document['overall'],
        }
        results.append(data)
    print(results)
    return HttpResponse(json.dumps(results), content_type='application/json')

def potHolesByStreet(request):
    potholes = Potholes.objects.filter().filter(street_id__ne=None).aggregate(
        {"$group": {
            "_id": {
                "streetID": "$STREET_ID",
            },
            "potholes_count": {"$sum": 1},
        }},
    )
    results = []
    for document in potholes:
        data = {
            "streetID": document['_id']['streetID'],
            "potholesCnt": document['potholes_count'],
        }
        results.append(data)
    print(results)
    return HttpResponse(json.dumps(results), content_type='application/json')


def roadRatings(request):
    streetName = request.GET.get('streetName')
    roadRatings = RoadRatings.objects.filter().filter(dateRated__ne=None,streetName__ne=None,streetName=streetName).aggregate(

        {"$group": {
            "_id": {
                "dateRated":"$dateLastOverlay",
            },
            "crack": {"$push": "$crack"},
            "patch": {"$push": "$patch"},
            "overall": {"$push": "$overall"}
        }},
    )
    results = list()
    for document in roadRatings:
        data = {
            "dateRated": document['_id']['dateRated'],
            "crack": document['crack'],
            "patch": document['patch'],
            "overall": document['overall']
        }
        results.append(data)
    print(results)
    return HttpResponse(json.dumps(results), content_type='application/json')

def streetNames(request):
    streets = Streets.objects.filter().filter(streetName__ne=None)
    results = list()
    for document in streets:
        data = {
            "streetId": document['streetId'],
            "streetName": document['streetName'],
        }
        results.append(data)
    print(results)
    return HttpResponse(json.dumps(results), content_type='application/json')




# def generatePotHolesCharts(request):
#     RScriptCmd = u"D:\\R\\R-3.3.1\\bin\\Rscript.exe"
#     Rfilepath = os.path.join(PROJECT_ROOT, 'static/scripts', "potholes.R ")
#     command = [RScriptCmd, Rfilepath, ""]
#     output = subprocess.check_output(command)
#     return HttpResponse(JSONEncoder().encode(output), content_type='application/json')
#
# def generateRatingCharts(request):
#     RScriptCmd = u"D:\\R\\R-3.3.1\\bin\\Rscript.exe"
#     Rfilepath = os.path.join(PROJECT_ROOT, 'static/scripts', "rating.R ")
#     command = [RScriptCmd, Rfilepath, ""]
#     output = subprocess.check_output(command)
#     return HttpResponse(JSONEncoder().encode(output), content_type='application/json')