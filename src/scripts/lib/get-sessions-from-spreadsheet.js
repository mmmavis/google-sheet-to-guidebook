import GoogleSpreadsheet from 'google-spreadsheet';
import getEnvVars from './get-env-vars';
import Formatter from './formatter';

const ENV_VARS = getEnvVars();
const GOOGLE_API_CLIENT_EMAIL_2018 = ENV_VARS.GOOGLE_API_CLIENT_EMAIL_2018;
const GOOGLE_API_PRIVATE_KEY_2018 = ENV_VARS.GOOGLE_API_PRIVATE_KEY_2018;
const ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID = ENV_VARS.ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID;

export default function(callback) {
  var sheet = new GoogleSpreadsheet(ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID);

  // line breaks are essential for the private key.
  // if reading this private key from env var this extra replace step is a MUST
  sheet.useServiceAccountAuth({
    "client_email": GOOGLE_API_CLIENT_EMAIL_2018,
    "private_key": GOOGLE_API_PRIVATE_KEY_2018.replace(/\\n/g, `\n`)
  }, (err) => {
    if (err) {
      console.log(`[Error] ${err}`);
      callback(err);
    }

    // GoogleSpreadsheet.getRows(worksheet_id, callback)
    // worksheet_id - the index of the sheet to read from (index starts at 1)
    sheet.getRows(1, (getRowError, rows) => {
      console.log(rows.length);
      if (getRowError) {
        console.log(`[getRowError]`, getRowError);
        callback(getRowError);
      }

      let sessions = rows.map(row => Formatter.formatSession(row));
      let facilitatorsArrays = rows.map(row => Formatter.formatFacilitator(row));
      let facilitators = [];

      facilitatorsArrays.forEach((arr) => {
        facilitators = facilitators.concat(arr);
      });

      callback(null, sessions, facilitators);
    });
  });
}
