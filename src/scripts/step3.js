import getFacilitatorsFromSheet from './lib/get-facilitators-from-spreadsheet';
import createLogFileMeta from './lib/create-log-file-meta';
import exportAsJson from './lib/export-as-json';
import exportAsCsv from './lib/export-as-csv';

const FILE_NAME_FACILITATORS = `formatted-facilitators-for-guidebook`;

getFacilitatorsFromSheet((err, facilitators) => {
  exportAsJson(facilitators, createLogFileMeta(FILE_NAME_FACILITATORS, `.json`).filePath, (exportJsonError) => {
    if (exportJsonError) {
      console.log(exportJsonError);
    }
  });

  exportAsCsv(facilitators, createLogFileMeta(FILE_NAME_FACILITATORS, `.csv`).filePath, (exportCsvError) => {
    if (exportCsvError) {
      console.log(exportCsvError);
    }
  });
});
