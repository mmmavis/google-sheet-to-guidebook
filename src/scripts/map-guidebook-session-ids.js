import GoogleSpreadsheet from 'google-spreadsheet';
import getEnvVars from './lib/get-env-vars';

const ENV_VARS = getEnvVars();
const GOOGLE_API_CLIENT_EMAIL = ENV_VARS.GOOGLE_API_CLIENT_EMAIL_2018;
const GOOGLE_API_PRIVATE_KEY = ENV_VARS.GOOGLE_API_PRIVATE_KEY_2018;
const ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID = ENV_VARS.ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID;
const SPREADSHEET_ACCEPTED_PROPOSALS_WORKSHEET_INDEX = ENV_VARS.SPREADSHEET_ACCEPTED_PROPOSALS_WORKSHEET_INDEX;
const SPREADSHEET_GUIDEBOOK_SESSIONS_WORKSHEET_INDEX = ENV_VARS.SPREADSHEET_GUIDEBOOK_SESSIONS_WORKSHEET_INDEX;


function getGuidebookSessions(googleSheet, worksheetIndex, callback) {
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

    getGuidebookSessions(googleSheet, SPREADSHEET_GUIDEBOOK_SESSIONS_WORKSHEET_INDEX, (error, guidebookSessions) => {
      let guidebookIdMap = {};
      guidebookSessions.forEach(session => {
        guidebookIdMap[session.sessiontitle.trim()] = session.sessionid;
      });

      console.log(guidebookIdMap);
      console.log(`\n\n`);

      getSessionsFromMasterSheet(googleSheet, SPREADSHEET_ACCEPTED_PROPOSALS_WORKSHEET_INDEX, (msError, sheetRows) => {

        let numAllRows = sheetRows.length;
        let numRowUpdated = 0;
        let updateRow = (rows, cb) => {
          if (numRowUpdated < numAllRows) {

            let row = rows[numRowUpdated];
            let sessionName = row.sessionname.trim();
            row.guidebooksessionid = guidebookIdMap[sessionName];
            row.save(() => {
              console.log(`yay`, numRowUpdated+1, sessionName, guidebookIdMap[sessionName]);
              numRowUpdated++;

              updateRow(rows, cb);
            });
          }

          if (numRowUpdated === numAllRows) cb(`DONEEEEE`);
        };

        updateRow(sheetRows, () => {
          console.log(`\nWHOOOHOOOOOO`);
          callback();
        });
      });
    });
  });
}

