"""Migrate travel agents from archive project under alialiayman@gmail.com to hajonsoft2020 project under hajonsoft.com"""
import pyrebase
import os
import json

hosConfig = {
 "apiKey": "AIzaSyC9qB4VUiNl4GuI2_ABEJ8KPA71rBV2tZw",
    "authDomain": "hajonsoft2020.firebaseapp.com",
    "databaseURL": "https://hajonsoft2020-default-rtdb.firebaseio.com",
    "projectId": "hajonsoft2020",
    "storageBucket": "hajonsoft2020.appspot.com",
    "messagingSenderId": "309798473169",
    "appId": "1:309798473169:web:a7e58104d84b8e08d0a4f0"
}

archiveConfig = {
  "apiKey": "AIzaSyCTsSz6OgYo7Ed5QiQ-c0x9gx7sKi0T4g4",
  "authDomain": "archive-tables.firebaseapp.com",
  "databaseURL": "https://archive-tables.firebaseio.com",
  "projectId": "archive-tables",
  "storageBucket": "archive-tables.appspot.com",
  "messagingSenderId": "934861122008",
  "appId": "1:934861122008:web:760cb5c013e10016d12aad"
};

archive_firebase = pyrebase.initialize_app(archiveConfig)
archive_db = archive_firebase.database()

hos_firebase = pyrebase.initialize_app(hosConfig)
hos_db = hos_firebase.database()

def getCustomers():
    data = archive_db.child('customers').get()
    return data.val()

def merge(data):
    result = {}
    for country_companies in data.items():
        country = country_companies[0]
        companies = country_companies[1]
        newCompanies = {}
        for company in companies.values():
            if (company['onsoftId'] == ''):
                pass
            newCompany = {'nationality': country, 'passportNumber': company['onsoftId']}
            if ('name' in company):
                newCompany['name'] = company['name']
            if ('nameAra' in company):
                newCompany['nameArabic'] = company['nameAra']
            if ('phone' in company ):
                newCompany['phone'] = company['phone']
            if ('email' in company):
                newCompany['email'] = company['email']
            if ('CreateDt' in company):
                newCompany['createDt'] = company['CreateDt']
            if ('contact' in company):
                newCompany['mahramName'] = company['contact']
            if ('logo' in company):
                newCompany['relationship'] = company['logo']
            if ('expire' in company):
                newCompany['passExpireDt'] = company['expire']
            if ('comment' in company):
                newCompany['birthPlace'] = company['comment']
            if ('website' in company):
                newCompany['profession'] = company['website']
            newCompanies.update({company['onsoftId'] : newCompany})
        result.update({country: newCompanies})
    return result

def main():
    data = getCustomers()
    merged = merge(data)
    hos_db.set({'customer' : merged})
    # print(json.dumps(merged, indent=2))


if __name__ == '__main__':
    main()

# migration = {'USA': {'name': 'dar'}, 'Canada': 'classy'}

# hos_db.set({'customer': migration})
