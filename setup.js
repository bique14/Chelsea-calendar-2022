const { google } = require("googleapis");
const Secret = require("./keys.json");
require("dotenv").config();

const SCOPES = "https://www.googleapis.com/auth/calendar";
const GOOGLE_PRIVATE_KEY = Secret.private_key;
const GOOGLE_CLIENT_EMAIL = Secret.client_email;
const GOOGLE_PROJECT_NUMBER = Secret.project_id;

const setup = () => {
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  const calendar = google.calendar({
    version: "v3",
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient,
  });

  const auth = new google.auth.GoogleAuth({
    keyFile: "./keys.json",
    scopes: SCOPES,
  });

  return { jwtClient, calendar, auth };
};

module.exports = {
  setup,
};
