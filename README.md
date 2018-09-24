# google-sheet-to-guidebook
:stop_sign: WIP, see draft plan below

## Steps

1. Import sessions to Guidebook
2. Import session facilitators to Guidebook
3. Export sessions(schedule) from Guidebook
4. Export facilitators(Custom List) from Guidebook
5. Link facilitators to their related sessions

(for details see sections below)


## Import sessions to Guidebook

1. Use Google API to read spreadsheet of all accepted proposals
Important note from [google-spreadsheet module](https://www.npmjs.com/package/google-spreadsheet), the module we are using to access Google Spreadsheet:
> The row-based API also assumes there are no empty rows in your sheet. If any row is completely empty, you will not be able to access any rows after the empty row using the row-based API.)
2. Find out what meta/columns are needed for Guidebook
3. Format accepted proposals so only the meta Guidebook needs are kept. Make sure these meta are in the right format as well.
4. Save the transformed proposal objects in a JSON and a CSV file. (This is for logging and backup purposes)
5. Import the .csv file as schedule(sessions) to Guidebook.
  - Import the .csv to Google Spreadsheet
  - Export as .csv again so columns and data are formatted in the way Guidebook accepts (Google Spreadsheet auto formats things to the way Guidebook likes that's why we are doing these seem-to-be-redundant steps).
  - Import the new .csv file to Guidebook
Important note: `date` and `time` related fields are required. So make sure all sessions have these meta filled before importing the file to Guidebook.


## Import session facilitators to Guidebook

1. Get list of session facilitators from the JSON file we saved previously.
2. Find out what meta are needed for Guidebook
3. Format facilitators so only the meta Guidebook needs are kept. Make sure these meta are in the right format as well.
4. Save the transformed facilitator objects in a JSON and a CSV file.
5. Import the .csv file as Custom List Items to Guidebook.


## Export sessions(schedule) from Guidebook

1. Export sessions(schedule) from Guidebook into a CSV file.


## Export facilitators(Custom List) from Guidebook

1. Export facilitators(Custom List) from Guidebook as a CSV file.


## Link facilitators to their related sessions

1. Find the link template CSV file Guidebook provided (`sample-csv/guidebook/import/link-template.csv`)
2. Fill out the template to link facilitators to their related sessions.
3. Import the filled CSV file to Guidebook.


