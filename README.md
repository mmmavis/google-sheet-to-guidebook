# google-sheet-to-guidebook
:stop_sign: :stop_sign: :stop_sign:

WIP, see draft plan below.

:stop_sign: :stop_sign: :stop_sign:

(Tedious and long workflow but oh well as least it works...)

## Set Up / Requirements

### Google Spreadsheet

1. Google Service Account
2. A Google Spreadsheet that contains accepted proposals info.
    - Make sure there are **NO EMPTY ROW IN BETWEEN any filled rows** as the [google-spreadsheet module](https://www.npmjs.com/package/google-spreadsheet) we are using to access Google Spreadsheet will not be able to access any rows after an empty row)
    - Give your Google Service Account "Edit" access to this Google Spreadsheet.

### Guidebook

- A Custom List "Session Facilitators"

### Repo

- `> git clone https://github.com/mmmavis/google-sheet-to-guidebook.git`
- `> cd google-sheet-to-guidebook`
- `> npm install`
- `> cp sample.env test.env`
- `> cp sample.env prod-real.env`
- Fill out both `test.env` and `prod-real.env`. Note that `INDEX` in Google Spreadsheet starts from `1`.
- By default the scripts reads env vars from `test.env`, if you'd like it to use `prod-real.env` go to `src/scripts/lib/get-env-vars.js` and set `ENV_TYPE` to `PROD`, e.g., ```const ENV_TYPE = `PROD`;```
- `> npm run build`


## Steps to Port Session and Failicator Info from Google Spreadsheet to Guidebook

Make sure you finish every step in the Set Up section above.

### Step 1: Import Sessions to Guidebook

1. Run the following command to generate a CSV file and a JSON file that contain session info to be ported to Guidebook.

```
> node dist/scripts/step1.js
```
2. Go to your console/terminal and verify that all accepted proposals in your Spreadsheet have been processed and included. (Look for the line where it says `Number of sessions processed: ___`). If the number you are seeing is smaller than what you expected, it's most likely because you have empty rows in between filled rows in your Spreadsheet. Fix them and run `> node dist/scripts/step1.js` again.
4. Go to your console/terminal to find the location where the CSV file and JSON file are. (Should be in the `/log/` directory)
5. Go to Guidebook's admin dashboard, import the just-generated `[timestamp]-formatted-sessions-for-guidebook.csv` file to Guidebook.
6. Confirm that the CSV import process has successfully gone through.

### Step 2: Map Guidebook Session IDs to the Accepted Propoals Google Spreadsheet

1. Go to Guidebook's admin dashboard, export "Schedule Sessions" from Guidebook into a CSV file.
2. Import the CSV file from Guidebook to Google Spreadsheet. (Import file settings: Insert new sheet & Detect Separator ype automatically.) Rename the worksheet name to `Guidebook Schedule Sessions` so you can recognize it easily later.
3. Make sure you update the `SPREADSHEET_GUIDEBOOK_SESSIONS_WORKSHEET_INDEX` env var in your `.env` file. If you make changes to the file, don't forget to run `npm build` again.
4. Add a new column `guidebooksessionid` to the All Accepted Proposals worksheet (the first worksheet that you created in the setup step)
5. Run script to map Guidebook Session ID to the All Accepted Proposals worksheet and wait for the script to finish its job.
```
> node dist/scripts/step2.js
```
6. Now every row in that worksheet should have `guidebooksessionid` cell filled.

### Step 3: Import Facilitators to Guidebook

1. Run the following command to generate a CSV file and a JSON file that contain facilitators info to be ported to Guidebook.
```
> node dist/scripts/step3.js
```
2. Import the CSV file to Google Spreadsheet. Rename the worksheet name to `Facilitators` so you can recognize it easily later.
3. Add a `guidebookfacilitatorid` column to the `Facilitators` worksheet that you just created.
4. Make sure you update the `SPREADSHEET_FACILITATORS_WORKSHEET_INDEX` env var in your `.env` file. If you make changes to the file, don't forget to run `npm build` again.
5. Import the same CSV file as Custom List Items (Session Facilitators) to Guidebook.
6. Confirm that the CSV import process has successfully went through.
7. Go to Guidebook's admin dashboard, export facilitators info from Guidebook into a CSV file.
8. Import the CSV file from the above step to Google Spreadsheet. Rename the worksheet name to `Guidebook Session Facilitators` so you can recognize it easily later.
9. Make sure you update the `SPREADSHEET_GUIDEBOOK_FACILITATORS_WORKSHEET_INDEX` env var in your `.env` file. If you make changes to the file, don't forget to run `npm build` again.

### Step 4: Map Guidebook Facilitator IDs to Our Facilitator Sheet

1. Run script to map Guidebook facilitator IDs to the Facilitators worksheet and wait for the script to finish its job.
```
> node dist/scripts/step4.js
```

### Step 5: Link Facilitators to Their Related Sessions

Now the facilitators sheet has all the info you need to link facilitators to sessions on Guidebook.

1. Import the CSV file Guidebook provided (`sample-spreadsheet-and-csv/guidebook/import/link-template.csv`) to Google spreadsheet.
2. Copying values over from the facilitators sheet to this "link template" sheet.
   - `guidebookfacilitatorid` as `Item ID (Optional)`
   - `Name` as `Item Name (Optional)`
   - `Guidebook Session Id` as `Link To Session ID (Optional)`
   - `Session Name` as `Link To Session Name (Optional)`
3. Export this "link template" sheet into a CSV file. On Google Spreadsheet, Go to File > Download as > CSV
4. Go to "Session Facilitators" on Guidebook & Import that CSV file as "links" to Guidebook.


### Step 6: Clean Up and Manual Fixes

Go to Guidebook's Dashboard

1. Verify & fix "all day" session timing. Use Spreadsheet as reference:
    - Find "Saturday All Day" sessions and make sure their date, start time, and end time are properly set on Guidebook. Fix these values if needed.
    - Find "Sunday All Day" sessions and make sure their date, start time, and end time are properly set on Guidebook. Fix these values if needed.
    - Find "SAll Day Saturday & Sunday" sessions and make sure their date, start time, and end time are properly set on Guidebook. Fix these values if needed.
2. Remove facilitator dupes from Guidebook.
