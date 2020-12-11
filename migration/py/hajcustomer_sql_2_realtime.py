"""Migrate specific travel agent photos from sql server data base to the travel agent specified by the firebaseConfig, 
supply the company Id as the first parameter in the command line
photos will be uploaded directly to storage and a copy will be placed under c:\temp
"""

import pyrebase
import os
import pyodbc
import sys
import re

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
db = firebase.database()

conn = pyodbc.connect(cnxn_str)
def getRecords(companyId):
    cursor = conn.cursor()
    query="""SELECT HajId
      ,FullName
      ,PackageName
      ,Comments
      ,Relationship
      ,DOB
      ,Cell
      ,Email
      ,Nationality
      ,Sex
      ,PassportNumber
      ,PassportIssueDate
      ,PassportExireDate
      ,PlaceOfBirth
      ,CompanyId
      ,CreateDt
      ,Occupation
      ,PassportIssuePlace
      ,HajType
      ,FullNameArabic
      ,CivilId
      ,CodeLine
      ,cidIssueDate
      ,cidExpireDate FROM hajcustomer
      where Nationality is not null and PassportNumber is not null and PassportNumber <> ''
    and CompanyId is not null and PackageName <> '' and PackageName is not null and companyid = ?"""
    cursor.execute(query, companyId)
    return cursor

def saveData(data):
    counter = 0
    for row in cursor:
        hajId = row[0]
        name=row[1]
        packageName=re.sub("[^0-9a-zA-Z]+", "",row[2])
        if (packageName == ''):
            packageName = 'unknown'
        Comments=row[3]
        Relationship=row[4]
        DOB=str(row[5])
        Cell=row[6]
        Email=row[7]
        Nationality=row[8]
        Sex=row[9]
        PassportNumber=row[10]
        PassportIssueDate=str(row[11])
        PassportExireDate=str(row[12])
        PlaceOfBirth=row[13]
        CompanyId=row[14]
        CreateDt=row[15]
        Occupation=row[16]
        PassportIssuePlace=row[17]
        FullNameArabic=row[19]
        CivilId=row[20]
        cidIssueDate=str(row[22])
        cidExpireDate=str(row[23])
        newCustomer = {'nationality': Nationality, 'passportNumber': PassportNumber}
        newCustomer['name'] = name
        newCustomer['nameArabic'] = FullNameArabic
        newCustomer['phone'] = Cell
        newCustomer['email'] = Email
        newCustomer['createDt'] = str(CreateDt)
        newCustomer['passIssueDate'] = PassportIssueDate
        newCustomer['passPlaceOfIssue'] = PassportIssuePlace
        newCustomer['relationship'] = Relationship
        newCustomer['passExpireDt'] = PassportExireDate
        newCustomer['birthDate'] = DOB
        newCustomer['birthPlace'] = PlaceOfBirth
        newCustomer['profession'] = Occupation
        newCustomer['comments'] = Comments
        newCustomer['gender'] = Sex
        newCustomer['onSoftId'] = CompanyId
        newCustomer['idNumber'] = CivilId
        newCustomer['idNumberExpireDate'] = cidExpireDate
        newCustomer['idNumberIssueDate'] = cidIssueDate
        counter = counter + 1
        db.child('customer').child(packageName).child(hajId).update(newCustomer)
        print(counter)

if __name__ == '__main__':
    cursor = getRecords(sys.argv[1])
    print('company id: ' + sys.argv[1])
    saveData(cursor)


