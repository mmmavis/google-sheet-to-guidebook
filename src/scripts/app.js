import getSessionsFromSheet from './lib/get-sessions-from-spreadsheet';
import getFacilitatorsFromSheet from './lib/get-facilitators-from-spreadsheet';
import createLogFileMeta from './lib/create-log-file-meta';
import exportAsJson from './lib/export-as-json';
import exportAsCsv from './lib/export-as-csv';
import mapGuidebookSessionIds from './map-guidebook-session-ids';
import mapGuidebookFacilitatorIds from './map-guidebook-facilitator-ids';

const FILE_NAME_SESSIONS = `formatted-sessions-for-guidebook`;
const FILE_NAME_FACILITATORS = `formatted-facilitators-for-guidebook`;

// getSessionsFromSheet((err, sessions) => {
//   exportAsJson(sessions, createLogFileMeta(FILE_NAME_SESSIONS, `.json`).filePath, (exportJsonError) => {
//     if (exportJsonError) {
//       console.log(exportJsonError);
//     }
//   });

//   exportAsCsv(sessions, createLogFileMeta(FILE_NAME_SESSIONS, `.csv`).filePath, (exportCsvError) => {
//     if (exportCsvError) {
//       console.log(exportCsvError);
//     }
//   });
// });




// mapGuidebookSessionIds(() => {
//   console.log(`\n\n DONE! \n\n`);
// });


// getFacilitatorsFromSheet((err, facilitators) => {
//   exportAsJson(facilitators, createLogFileMeta(FILE_NAME_FACILITATORS, `.json`).filePath, (exportJsonError) => {
//     if (exportJsonError) {
//       console.log(exportJsonError);
//     }
//   });

//   exportAsCsv(facilitators, createLogFileMeta(FILE_NAME_FACILITATORS, `.csv`).filePath, (exportCsvError) => {
//     if (exportCsvError) {
//       console.log(exportCsvError);
//     }
//   });
// });



// mapGuidebookFacilitatorIds(() => {
//   console.log(`\n\n DONE! \n\n`);
// });

