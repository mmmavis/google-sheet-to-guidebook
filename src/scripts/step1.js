import getSessionsFromSheet from './lib/get-sessions-from-spreadsheet';
import createLogFileMeta from './lib/create-log-file-meta';
import exportAsJson from './lib/export-as-json';
import exportAsCsv from './lib/export-as-csv';

const FILE_NAME_SESSIONS = `formatted-sessions-for-guidebook`;

getSessionsFromSheet((err, sessions) => {
  exportAsJson(sessions, createLogFileMeta(FILE_NAME_SESSIONS, `.json`).filePath, (exportJsonError) => {
    if (exportJsonError) {
      console.log(exportJsonError);
    }
  });

  exportAsCsv(sessions, createLogFileMeta(FILE_NAME_SESSIONS, `.csv`).filePath, (exportCsvError) => {
    if (exportCsvError) {
      console.log(exportCsvError);
    }
  });
});

