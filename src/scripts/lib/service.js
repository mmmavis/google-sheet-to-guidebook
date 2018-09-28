/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*
*  This module is totally a WIP. It's not even 50% finished so DO NOT USE IT as is.
*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/




import request from 'request';
import getEnvVars from './get-env-vars';

const ENV_VARS = getEnvVars();
const GUIDEBOOK_API = ENV_VARS.GUIDEBOOK_API;


// https://builder.guidebook.com/open-api/v1/sessions/?guide=92271

/**
 * Make a GET request to Guidebook
 * Useful for making a call to an endpoint that does return data.
 * @param  {String} endpoint A Guidebook API endpoint
 * @param  {Object} params A key-value object to be serialized as a query string
 * @param {requestCallback} cb - The callback that handles the response
 * @returns {void}
 */
function getDataFromGuidebook(endpoint, params, cb) {
  let combinedParams = Object.assign({
  }, params);

  let options = {
    method: `GET`,
    url: endpoint,
    qs: combinedParams,
    headers: {
      // Accept: ``,
      // "User-Agent": ``,
      Authorization: `JWT ${ENV_VARS.GUIDEBOOK_API_KEY}`
    },
    json: true
  };

  request(
    options,
    (err, response, body) => {
      if (err) {
        // console.log(err);
      } else {
        // console.log(body);
      }

      cb(err, response);
    }
  );
}

/**
 * Make a POST request to Guidebook
 * @param {String} endpoint A Guidebook API endpoint
 * @param  {Object} data A key-value object to be posted
 * @param {requestCallback} cb - The callback that handles the response
 * @returns {void}
 */
function postDataToGuidebook(endpoint, data = {}, cb) {
  let options = {
    method: `POST`,
    url: endpoint,
    headers: {
      // Accept: ``,
      // "User-Agent": ``,
      Authorization: `JWT ${ENV_VARS.GUIDEBOOK_API_KEY}`
    },
    json: data
  };

  request(
    options,
    (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
      }

      cb(err, response);
    }
  );

  return {};
}


let Service = {
  guides: {
    get: function(params) {
      return getDataFromGuidebook(`${GUIDEBOOK_API}/guides/`, params);
    },
    // post: function(entryData) {
    //   return postDataToGuidebook(`POST`,`${guidebookApi}/entries/`, entryData);
    // }
  },
  sessions: {
    get: function(params) { // get ALL `Sessions` you have access to
      return getDataFromGuidebook(`${GUIDEBOOK_API}/sessions/`, params);
    }
  },
  session: {
    get: function(sessionId) {
      return getDataFromGuidebook(`${GUIDEBOOK_API}/sessions/${sessionId}`);
    },
    post: function(session, cb) {
      session = Object.assign({
        guide: ENV_VARS.GUIDEBOOK_GUIDE_ID,
        "allow_rating": false
      }, session);

      return postDataToGuidebook(`${GUIDEBOOK_API}/sessions/`, session, cb);
    }
  },
  tracks: {
    get: function(params) { // get ALL `ScheduleTracks` you have access to
      return getDataFromGuidebook(`${GUIDEBOOK_API}/schedule-tracks/`, params);
    }
  },
  track: {
    get: function(trackId) {
      return getDataFromGuidebook(`${GUIDEBOOK_API}/schedule-tracks/${trackId}`);
    },
    post: function(track) {
      return postDataToGuidebook(`${GUIDEBOOK_API}/schedule-tracks/`, track);
    }
  },
  customListItem: {
    get: function(customListItemId) {
      return getDataFromGuidebook(`${GUIDEBOOK_API}/custom-list-items/${customListItemId}`);
    },
    post: function(customListItem) {
      return postDataToGuidebook(`${GUIDEBOOK_API}/custom-list-items/`, customListItem);
    }
  },
  customListItemRelation: {
    get: function(customListItemId) {
      return getDataFromGuidebook(`${GUIDEBOOK_API}/custom-list-item-relations/${customListItemId}`);
    },
    post: function(relation) {
      return postDataToGuidebook(`${GUIDEBOOK_API}/custom-list-item-relations/`, relation);
    }
  },
  facilitatorToSessionLink: {
    post: function(facilitatorId, sessionId) {
      let link = {
        guide: ENV_VARS.GUIDEBOOK_GUIDE_ID,
        'source_content_type': `custom_list.customlistitem`,
        'source_object_id': facilitatorId,
        'target_content_type': `schedule.session`,
        'target_object_id': sessionId,
      };

      return postDataToGuidebook(`${GUIDEBOOK_API}/links/`, link);
    }
  }
};

export default Service;
