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
5. Import the .csv file as schedule(sessions) to Guidebook. Important note: `date` and `time` related fields are required. So make sure all sessions have these meta filled before importing the file to Guidebook.
    - Import the .csv to Google Spreadsheet
    - Export as .csv again so columns and data are formatted in the way Guidebook accepts (Google Spreadsheet auto formats things to the way Guidebook likes that's why we are doing these seem-to-be-redundant steps).
    - Import the new .csv file to Guidebook.


## Import session facilitators to Guidebook

1. Get list of session facilitators from the same Google Spreadsheet.
2. Find out what meta are needed for Guidebook
3. Format facilitators so only the meta Guidebook needs are kept. Make sure these meta are in the right format as well.
4. Save the transformed proposal objects in a JSON and a CSV file. (This is for logging and backup purposes)
5. Import the .csv file as Custom List Items(session facilitators) to Guidebook.
    - Import the .csv to Google Spreadsheet
    - Export as .csv again so columns and data are formatted in the way Guidebook accepts (Google Spreadsheet auto formats things to the way Guidebook likes that's why we are doing these seem-to-be-redundant steps).
    - Import the new .csv file to Guidebook


## Export sessions(schedule) from Guidebook

1. Export sessions(schedule) from Guidebook into a CSV file.


## Export facilitators(Custom List) from Guidebook

1. Export facilitators(Custom List) from Guidebook as a CSV file.


## Link facilitators to their related sessions

1. Find the link template CSV file Guidebook provided (`sample-csv/guidebook/import/link-template.csv`)
2. Fill out the template to link facilitators to their related sessions.
3. Import the filled CSV file to Guidebook.








- make sure your google service account has edit access to the google spreadsheet



- !!! make sure sheet doesn't have empty rows in between
- generate sessions.csv (step1.js)
- import to Guidebook
- export from Guidebook. make all sessions are exported
- import to the same Google Spreadsheet. guidebook Sessions(sheet #3).
- make sure env var in .env is up to date. (sheet index)
- add column `guidebooksessionid` to sheet #1 (all accepted proposals)
- run script to map Guidebook Session ID to Sheet #1 (all accepted proposals) (build and run step2.js)



- run script (build and run step3.js) to generate facilitators.csv
- import facilitators.csv to Guidebook AND google spreadsheet: facilitators(sheet #4)
- export facilitators from guidebook. make sure all facilitators are exported
- import to the same Google Spreadsheet. guidebook facilitators(sheet #5). make sure env var in .env is up to date.
- add column `guidebookfacilitatorid` to sheet #4
- make sure there's no empty rows in between in the sheet
- run scripts to map Guidebook ID to Sheet #4 (facilitators sheet) (build and run step4.js)



now the facilitator sheet (sheet #4) has all the info you need to link facilitators to sessions on Guidebook
- import the CSV file Guidebook provided (`sample-csv/guidebook/import/link-template.csv`) to Google sheet (sheet #6)
- copy over values from sheet #4 to Sheet #6
   - `guidebookfacilitatorid` as `Item ID (Optional)`
   - `Name` as `Item Name (Optional)`
   - `Guidebook Session Id` as `Link To Session ID (Optional)`
   - `Session Name` as `Link To Session Name (Optional)`
- export Sheet #6 as .csv
- go to "session facilitators" on guidebook & import that .csv as links to Guidebook
- done!


