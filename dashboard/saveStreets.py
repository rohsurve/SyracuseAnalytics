import pandas
import sys
import json
from pymongo import MongoClient

def populateStreetsData():
    data_df = pandas.read_csv("C:\\Users\\Rohit Surve\\Desktop\\hacakthon\\data\\" + "streets.csv",low_memory=False,header=0)
    Cols = []
    for item in list(data_df.columns):
        print(item)
        if("." not in item):
            if item not in Cols:
                Cols.append(item)
    df2 = data_df[Cols]
    client = MongoClient()
    db = client.syracusedb
    collection = db.streets
    records = json.loads(df2.T.to_json()).values()
    collection.insert_many(records)

if __name__ == "__main__":
    populateStreetsData()

