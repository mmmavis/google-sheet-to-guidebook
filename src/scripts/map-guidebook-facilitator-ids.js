import GoogleSpreadsheet from 'google-spreadsheet';
import getEnvVars from './lib/get-env-vars';

const ENV_VARS = getEnvVars();
const GOOGLE_API_CLIENT_EMAIL = ENV_VARS.GOOGLE_API_CLIENT_EMAIL_2018;
const GOOGLE_API_PRIVATE_KEY = ENV_VARS.GOOGLE_API_PRIVATE_KEY_2018;
const ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID = ENV_VARS.ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID;
const SPREADSHEET_FACILITATORS_WORKSHEET_INDEX = ENV_VARS.SPREADSHEET_FACILITATORS_WORKSHEET_INDEX;
const SPREADSHEET_GUIDEBOOK_FACILITATORS_WORKSHEET_INDEX = ENV_VARS.SPREADSHEET_GUIDEBOOK_FACILITATORS_WORKSHEET_INDEX;

function getGuidebookFacilitators(googleSheet, worksheetIndex, callback) {
  // GoogleSpreadsheet.getRows(worksheet_id, callback)
  // worksheet_id - the index of the sheet to read from (index starts at 1)

  googleSheet.getRows(worksheetIndex, (getRowError, rows) => {
    callback(getRowError, rows);
  });
}

function getSessionsFromMasterSheet(googleSheet, worksheetIndex, callback) {
  // GoogleSpreadsheet.getRows(worksheet_id, callback)
  // worksheet_id - the index of the sheet to read from (index starts at 1)

  googleSheet.getRows(worksheetIndex, (getRowError, rows) => {
    callback(getRowError, rows);
  });
}

export default function(callback) {
  let googleSheet = new GoogleSpreadsheet(ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID);

  // line breaks are essential for the private key.
  // if reading this private key from env var this extra replace step is a MUST
  googleSheet.useServiceAccountAuth({
    "client_email": GOOGLE_API_CLIENT_EMAIL,
    "private_key": GOOGLE_API_PRIVATE_KEY.replace(/\\n/g, `\n`)
  }, (err) => {
    if (err) {
      console.log(`[Error] ${err}`);
      callback(err);
    }

    getGuidebookFacilitators(googleSheet, SPREADSHEET_GUIDEBOOK_FACILITATORS_WORKSHEET_INDEX, (error, guidebookFacilitators) => {
      let guidebookIdMap = {};
      guidebookFacilitators.forEach(facilitator => {
        guidebookIdMap[facilitator.name.trim()] = facilitator.itemidoptional;
      });

      getSessionsFromMasterSheet(googleSheet, SPREADSHEET_FACILITATORS_WORKSHEET_INDEX, (msError, sheetRows) => {
        let numAllRows = sheetRows.length;
        let numRowUpdated = 0;
        let updateRow = (rows, cb) => {
          if (numRowUpdated < numAllRows) {

            let row = rows[numRowUpdated];
            let facilitatorName = row.name.trim();
            row.guidebookfacilitatorid = guidebookIdMap[facilitatorName];
            row.save(() => {
              console.log(`yay`, numRowUpdated, facilitatorName, guidebookIdMap[facilitatorName]);
              numRowUpdated++;

              updateRow(rows, cb);
            });
          }

          if (numRowUpdated === numAllRows) cb(`DONEEEEE`);
        };

        updateRow(sheetRows, () => {
          console.log(`WHOOOHOOOOOO`);
          callback();
        });
      });
    });
  });
}

