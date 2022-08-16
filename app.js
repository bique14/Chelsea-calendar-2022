const fs = require("fs");
const { google } = require("googleapis");
const Secret = require("./keys.json");
const Fixtures = require("./fixture/fixture.json");
const _ = require("./setup");
require("dotenv").config();

const GOOGLE_CALENDAR_ID = process.env.CALENDAR_ID;
const { jwtClient, calendar, auth } = _.setup();

const addCalendarEvent = async (event) => {
  const client = await auth.getClient();

  await calendar.events.insert(
    {
      client,
      calendarId: GOOGLE_CALENDAR_ID,
      resource: event,
    },
    function (error, response) {
      console.log("Event title: ", response?.data.summary);
      console.log("Event description: ", response?.data.description);
      console.log("Event start: ", response?.data.start.dateTime);
      console.log("Event end: ", response?.data.end.dateTime);
      console.log();

      if (error) {
        console.log("Event details: ", response);
        console.log("Something went wrong: " + error); // If there is an error, log it to the console
        return;
      }
      console.log("Event created successfully.");
    }
  );
};

const toDateTime = (date, time) => {
  const [d, m, y] = date.split("-");
  const [hour, minute] = time.split(":");

  let newEndHours;
  let newEndDay;

  if (parseInt(hour) + 2 >= 24) {
    newEndHours = (0 + (24 - +hour)).toString().padStart(2, "0");
    newEndDay = (+d + 1).toString().padStart(2, "0");
  } else {
    newEndHours = (+hour + 2).toString().padStart(2, "0");
    newEndDay = d;
  }

  const startTime = `${hour}:${minute}:00`;
  const startDate = `${y}-${m}-${d}T${startTime}`;

  const endTime = `${+hour + 2 === 24 ? "00" : newEndHours}:${minute}:00`;
  const endDate = `${y}-${m}-${newEndDay}T${endTime}`;

  return { startDate, endDate };
};

const toCalendarEvent = (fixture, i) => {
  const { home, away, time } = fixture.fixtures[0];
  const { startDate, endDate } = toDateTime(fixture.date.datetime, time);
  const title = `⚽ ${home} - ${away}`;

  return {
    summary: title,
    description: `English premier league #${i + 3}`,
    start: {
      dateTime: startDate,
      timeZone: "Asia/Bangkok",
    },
    end: {
      dateTime: endDate,
      timeZone: "Asia/Bangkok",
    },
    attendees: [],
  };
};

const sleep = async (second) =>
  new Promise((resolve) => setTimeout(resolve, second * 1000));

Fixtures.forEach(async (match, i) => {
  const eventObject = toCalendarEvent(match, i);
  addCalendarEvent(eventObject);
});

module.exports = {
  toDateTime,
  toCalendarEvent,
};
