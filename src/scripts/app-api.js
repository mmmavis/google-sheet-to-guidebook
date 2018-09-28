/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*
*  This file is totally a WIP. It's not even 50% finished so DO NOT USE IT as is.
*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/








// import getSessionsFromSheet from './lib/get-sessions-from-spreadsheet';
// import Service from './lib/service';
// import createLogFileMeta from './lib/create-log-file-meta';
// import exportAsJson from './lib/export-as-json';
// import exportAsCsv from './lib/export-as-csv';

// const FILE_NAME_SESSIONS = `formatted-sessions-for-guidebook`;
// const FILE_NAME_FACILITATORS = `formatted-facilitators-for-guidebook`;

// getSessionsFromSheet((err, sessions, facilitators) => {
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




getSessionsFromSheet((err, sessions, facilitators) => {
  let session = {
    "start_time": `2017-09-18T16:00:00`,
    "end_time": `2017-09-18T17:00:00`,
    "description_html": sessions[0][`Description (Optional)`],
    "name": sessions[0][`Session Title`],
  };

  Service.session.post(session, (err, response) => {

  });

});
