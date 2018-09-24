// import getEnvVars from './lib/get-env-vars';
import getSessionsFromSheet from './lib/get-sessions-from-spreadsheet';
import Formatter from './lib/session-formatter';
import createLogFileMeta from './lib/create-log-file-meta';
import exportAsJson from './lib/export-as-json';
import exportAsCsv from './lib/export-as-csv';

// const ENV_VARS = getEnvVars();

getSessionsFromSheet((err, sessions) => {
  let formatted = sessions.map(row => Formatter.formatSheetRow(row));
  // console.log(formatted);

  exportAsJson(formatted, createLogFileMeta(`formattted-sessions-for-guidebook`, `.json`).filePath, (jsonFileErr) => {
    if (jsonFileErr) {
      console.log(jsonFileErr);
    }
  });

  exportAsCsv(formatted, createLogFileMeta(`formattted-sessions-for-guidebook`, `.csv`).filePath, (exportCsvError) => {
  });
});
