import pyrebase
import os
import pyodbc
cnxn_str = ("Driver={SQL Server Native Client 11.0};"
            "Server=USCBD-JS7B163,1433;"
            "Database=onsoft_ireland_restore;"
            "Trusted_Connection=yes;")

firebaseConfig = {
 "apiKey": "AIzaSyC9qB4VUiNl4GuI2_ABEJ8KPA71rBV2tZw",
    "authDomain": "hajonsoft2020.firebaseapp.com",
    "databaseURL": "https://hajonsoft2020-default-rtdb.firebaseio.com",
    "projectId": "hajonsoft2020",
    "storageBucket": "hajonsoft2020.appspot.com",
    "messagingSenderId": "309798473169",
    "appId": "1:309798473169:web:a7e58104d84b8e08d0a4f0"
}

firebase = pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()

conn = pyodbc.connect(cnxn_str)

cursor = conn.cursor()
cursor.execute('SELECT i.imagedata, p.name, c.hajId, c.passportnumber, c.nationality FROM hajImage i join hajcustomer c on i.hajid = c.hajid join hajcompany p on c.companyid = p.companyid where c.passportnumber is not null and i.imagedata is not null and c.nationality is not null and imageType=? and c.companyid = ? and  c.hajId < ? order by c.hajId desc', "PHOTO", 8730, 99999999)

folder = 'c:\\temp\\photos'
if not os.path.exists(folder):
    os.makedirs(folder)
for row in cursor:
    try:
        nationality= row[4]
        passportnumber= row[3]
        imageData= row[0]
        name=row[1]
        fileFolder = folder + '\\' + nationality
        if not os.path.exists(fileFolder):
            os.makedirs(fileFolder)
        fileName = fileFolder + '\\' +  passportnumber + ".jpg"
        file1 = open(fileName, "wb")
        file1.write(imageData)
        print(fileName, passportnumber)
        file1.close()
        meta = {
            "name": str(name),
            "contentType": 'image/jpeg'
        }
        storage.child(nationality).child(passportnumber + ".jpg").put(fileName)
    except Exception as ex:
        print("Oops!  Error ", ex)