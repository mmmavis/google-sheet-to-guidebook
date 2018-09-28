import GoogleSpreadsheet from 'google-spreadsheet';
import getEnvVars from './get-env-vars';
import Formatter from './formatter';

const ENV_VARS = getEnvVars();
const GOOGLE_API_CLIENT_EMAIL_2018 = ENV_VARS.GOOGLE_API_CLIENT_EMAIL_2018;
const GOOGLE_API_PRIVATE_KEY_2018 = ENV_VARS.GOOGLE_API_PRIVATE_KEY_2018;
const ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID = ENV_VARS.ACCEPTED_PROPOSALS_GOOGLE_SPREADSHEET_ID;
const SPREADSHEET_ACCEPTED_PROPOSALS_WORKSHEET_INDEX = ENV_VARS.SPREADSHEET_ACCEPTED_PROPOSALS_WORKSHEET_INDEX;

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
    sheet.getRows(SPREADSHEET_ACCEPTED_PROPOSALS_WORKSHEET_INDEX, (getRowError, rows) => {
      console.log(`Number of sessions processed: ${rows.length}`);

      if (getRowError) {
        console.log(`[getRowError]`, getRowError);
        callback(getRowError);
      }

      let sessions = rows.map(row => Formatter.formatSession(row));

      callback(null, sessions);
    });
  });
}
