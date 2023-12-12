from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from pymongo import MongoClient

# Google Sheets API setup
SCOPES = ['https://docs.google.com/spreadsheets/d/1dGNEMxhnOL4UHAmRgMAJkloO1ZT5ql8AFewYCL-PKt4/edit#gid=610372130']
SPREADSHEET_ID = '1dGNEMxhnOL4UHAmRgMAJkloO1ZT5ql8AFewYCL-PKt4'
RANGE_NAME = 'Sheet1!A1:B10'  # Adjust the range as needed

# MongoDB setup
MONGODB_CONNECTION_STRING = 'mongodb+srv://pranavdhawan:Hellothere1!@cluster0.sudeopk.mongodb.net/'
MONGODB_DATABASE_NAME = 'Dashboard'
MONGODB_COLLECTION_NAME = 'records'

def get_google_sheets_data():
    # Set up OAuth 2.0 for user authentication
    flow = InstalledAppFlow.from_client_secrets_file('client_secret_228493226597-sbca4o4h2msc6q3m5rd26l7v4gviibgm.apps.googleusercontent.com.json', SCOPES)
    credentials = flow.run_local_server(port=0)

    # Create a service object for interacting with the Google Sheets API
    service = build('sheets', 'v4', credentials=credentials)

    # Call the Sheets API to get values from the specified range
    result = service.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()
    values = result.get('values', [])

    return values

def store_data_in_mongodb(data):
    # Connect to MongoDB
    client = MongoClient(MONGODB_CONNECTION_STRING)
    db = client[MONGODB_DATABASE_NAME]
    collection = db[MONGODB_COLLECTION_NAME]

    # Insert data into MongoDB collection
    for row in data:
        document = {
            'column1': row[0],
            'column2': row[1],
            # Add more fields as needed
        }
        collection.insert_one(document)

if __name__ == '__main__':
    # Get data from Google Sheets
    sheets_data = get_google_sheets_data()

    # Store data in MongoDB collection
    store_data_in_mongodb(sheets_data)
