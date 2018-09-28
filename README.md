# google-sheet-to-guidebook
:stop_sign: :stop_sign: :stop_sign:

WIP, see draft plan below.

:stop_sign: :stop_sign: :stop_sign:

(Tedious and long workflow but oh well as least it works...)

## Set Up / Requirements

### Google Spreadsheet

1. Google Service Account
2. A Google Spreadsheet that contains accepted proposals info.
  - Make sure there's no empty row in between any filled rows as the [google-spreadsheet module](https://www.npmjs.com/package/google-spreadsheet) we are using to access Google Spreadsheet will not be able to access any rows after an empty row)
  - Give your Google Service Account "Edit" access to this Google Spreadsheet.

### Guidebook

- A Custom List "Session Facilitators"

### Repo

- `> git clone https://github.com/mmmavis/google-sheet-to-guidebook.git`
- `> cd google-sheet-to-guidebook.git`
- `> npm install`
- `> cp sample.env test.env`
- `> cp sample.env prod-real.env`
- fill out both `test.env` and `prod-real.env`
- By default the scripts reads env vars from `test.env`, if you'd like it to use `prod-real.env` go to `src/scripts/lib/get-env-vars.js` and set `ENV_TYPE` to `PROD`, e.g., ```const ENV_TYPE = `PROD`;```
- `> npm build`


## Steps to Port Session and Failicator Info from Google Spreadsheet to Guidebook

Make sure you finish every step in the Set Up section above.

### Step 1: Import Sessions to Guidebook

1. Run the following command to generate a CSV file and a JSON file that contain session info to be ported to Guidebook.

```
> node run dist/scripts/step1.js
```
2. Go to your console/terminal to find the location where the CSV file and JSON file are. (Should be in the `/log/` directory)
3. Go to Guidebook's admin dashboard, import the just-generated `[timestamp]-formatted-sessions-for-guidebook.csv` file to Guidebook.
4. Confirm that the CSV import process has successfully went through.

### Step 2: Map Guidebook Session IDs to the Accepted Propoals Google Spreadsheet

1. Export sessions info from Guidebook into a CSV file.
2. Import the CSV file from Guidebook to Google Spreadsheet.
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
> node run dist/scripts/step3.js
```
2. Import the CSV file to Google Spreadsheet. And add a `guidebookfacilitatorid` column to it.
3. Make sure you update the `SPREADSHEET_FACILITATORS_WORKSHEET_INDEX` env var in your `.env` file. If you make changes to the file, don't forget to run `npm build` again.
4. Import the same CSV file as Custom List Items (facilitators) to Guidebook.
5. Confirm that the CSV import process has successfully went through.
6. Export facilitators info from Guidebook into a CSV file.
7. Import the CSV file from the above step to Google Spreadsheet.
8. Make sure you update the `SPREADSHEET_GUIDEBOOK_FACILITATORS_WORKSHEET_INDEX` env var in your `.env` file. If you make changes to the file, don't forget to run `npm build` again.

### Step 4: Map Guidebook Facilitator IDs to Our Facilitator Sheet

1. Run script to map Guidebook facilitator IDs to the Facilitators worksheet and wait for the script to finish its job.
```
> node dist/scripts/step4.js
```

### Step 5: Link Facilitators to Their Related Sessions

Now the facilitators sheet has all the info you need to link facilitators to sessions on Guidebook.

1. Import the CSV file Guidebook provided (`sample-csv/guidebook/import/link-template.csv`) to Google spreadsheet.
2. Copying values over from the facilitators sheet to this "link template" sheet.
   - `guidebookfacilitatorid` as `Item ID (Optional)`
   - `Name` as `Item Name (Optional)`
   - `Guidebook Session Id` as `Link To Session ID (Optional)`
   - `Session Name` as `Link To Session Name (Optional)`
3. Export this "link template" sheet into a CSV file. On Google Spreadsheet, Go to File > Download as > CSV
4. Go to "Session Facilitators" on Guidebook & Import that CSV file as "links" to Guidebook.
5. All done!
