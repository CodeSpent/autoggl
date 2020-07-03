const axios = require("axios");

// Validate the provided apiToken by ensuring we can
// authenticate a request to the Toggl api.
const validateApiToken = (apiToken) => {
  // Make a request to the 'me' endpoint to get the
  // profile of the user owning the provided apiToken.
  return axios({
    method: "get",
    url: "https://www.toggl.com/api/v8/me",
    auth: {
      // Per Toggl API docs supply the apiToken as the
      // username, and a string of 'api_token' for the password.
      // Reference: https://github.com/toggl/toggl_api_docs/blob/master/chapters/authentication.md
      username: apiToken,
      password: "api_token",
    },
  })
    .then((response) => {
      let validatedApiToken = response.data.data.api_token;

      if (validatedApiToken === apiToken) {
        return { success: true };
      } else {
        // This implies that the request was authenticated
        // but for some reason the api_tokens don't match.
        // This should be highly unlikely.
        return { success: false };
      }
    })
    .catch((error) => {
      return { error: error.message };
    });
};

exports.validateApiToken = validateApiToken;
