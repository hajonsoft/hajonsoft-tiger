"""Migrate specific travel agent photos from sql server data base to the travel agent specified by the firebaseConfig, 
supply the company Id as the first parameter in the command line
photos will be uploaded directly to storage and a copy will be placed under c:\temp
"""

import pyrebase
import os
import pyodbc
import sys
from pprint import pprint as pp

localhost_cnxn_str = ("Driver={SQL Server Native Client 11.0};"
                      "Server=USCBD-JS7B163,1433;"
                      "Database=onsoft_ireland_restore;"
                      "Trusted_Connection=yes;")

forhajj_cnxn_str = ("Driver={SQL Server Native Client 11.0};"
                    "Server=52.17.53.82,1433;"
                    "Database=onSoft;"
                    "PWD=paris123;"
                    "UID=aliayman;")

cnxn_str = forhajj_cnxn_str

hajonsoft2020 = {
    "apiKey": "AIzaSyC9qB4VUiNl4GuI2_ABEJ8KPA71rBV2tZw",
    "authDomain": "hajonsoft2020.firebaseapp.com",
    "databaseURL": "https://hajonsoft2020-default-rtdb.firebaseio.com",
    "projectId": "hajonsoft2020",
    "storageBucket": "hajonsoft2020.appspot.com",
    "messagingSenderId": "309798473169",
    "appId": "1:309798473169:web:a7e58104d84b8e08d0a4f0"
}

forhajj = {
    "apiKey": "AIzaSyA0Qw2E_ZtjtOzVXZpiK-6Y54bsjgPPVwM",
    "authDomain": "forhajjnow.firebaseapp.com",
    "databaseURL": "https://forhajjnow-default-rtdb.firebaseio.com",
    "projectId": "forhajjnow",
    "storageBucket": "forhajjnow.appspot.com",
    "messagingSenderId": "532600289334",
    "appId": "1:532600289334:web:acb29de5b7e0e86ba44097"
}

firebaseConfig = forhajj

firebase = pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()

conn = pyodbc.connect(cnxn_str)
def getRecords(companyId):
    cursor = conn.cursor()
    cursor.execute('SELECT i.imagedata, p.name, c.hajId, c.passportnumber, c.nationality, c.fullname FROM hajImage i join hajcustomer c on i.hajid = c.hajid join hajcompany p on c.companyid = p.companyid where c.passportnumber is not null and i.imagedata is not null and c.nationality is not null and imageType=? and c.companyid = ? and  c.hajId < ? order by c.hajId desc', "PHOTO", companyId, 99999999)
    return cursor

def savePhotos(cursor):
    folder = 'c:\\temp\\photos'
    if not os.path.exists(folder):
        os.makedirs(folder)
    counter = 0
    for row in cursor:
        try:
            nationality = row[4]
            passportnumber = row[3]
            imageData = row[0]
            companyName = row[1]
            customerName= row[5]
            fileFolder = folder + '\\' + nationality
            if not os.path.exists(fileFolder):
                os.makedirs(fileFolder)
            fileName = fileFolder + '\\' + passportnumber + ".jpg"
            file1 = open(fileName, "wb")
            file1.write(imageData)
            counter = counter + 1
            pp(fileName, passportnumber, companyName, counter , customerName)
            file1.close()
            storage.child(nationality).child(passportnumber + ".jpg").put(fileName)
        except Exception as ex:
            pp("Oops!  Error ", ex)

if __name__ == '__main__':
    cursor = getRecords(sys.argv[1])
    pp('company id: ' + sys.argv[1])
    savePhotos(cursor)


