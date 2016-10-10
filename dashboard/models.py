from mongoengine import *

class RoadRatings(Document):
    street_id = StringField(max_length=50,db_field="streetID")
    overall = DecimalField(max_length=50, db_field="overall")
    crack = DecimalField(max_length=50, db_field="crack")
    patch = DecimalField(max_length=100, db_field="patch")
    streetName = StringField(max_length=100, db_field="streetName")
    dateRated = StringField(max_length=100, db_field="dateLastOverlay")

    meta = {
        'collection': 'roadratings',
        'strict': False
    }

class Potholes(Document):
    street_id = StringField(max_length=50, db_field="STREET_ID")
    latitude = StringField(max_length=50, db_field="Latitude")
    longitude = StringField(max_length=50, db_field="Longitude")
    dtTime = DateTimeField(max_length=100, db_field="dtTime")
    streetName = StringField(max_length=100, db_field="StreetName")

    meta = {
        'collection': 'potholes',
        'strict': False
    }


class Streets(Document):
    streetId = StringField(max_length=50, db_field="STREET_ID")
    streetName = StringField(max_length=100, db_field="STREET")
    meta = {
        'collection': 'streets',
        'strict': False
    }



