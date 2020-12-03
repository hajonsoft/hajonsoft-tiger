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
cursor.execute('SELECT top 5 fullname FROM  hajcustomer')

folder = 'c:\\temp\\travellers'
if not os.path.exists(folder):
    os.makedirs(folder)
for row in cursor:
    try:
        name=row[0]
        fileName= folder + "\\data.json" 
        file1 = open(fileName,"w")
        file1.write(name)
        file1.close()
    except Exception as ex:
        print("Oops!  Error ", ex)