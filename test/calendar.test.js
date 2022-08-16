const { toCalendarEvent } = require("../app");

test("Chelsea - Liverpool 21:00", () => {
  const fixture = {
    date: {
      datetime: "21-08-2022",
      month: "August",
    },
    fixtures: [
      {
        home: "Chelsea",
        away: "Liverpool",
        time: "21:00",
      },
    ],
  };

  const actual = toCalendarEvent(fixture, 0);
  const expected = {
    summary: "⚽ Chelsea - Liverpool",
    description: "English premier league #3",
    start: { dateTime: "2022-08-21T21:00:00", timeZone: "Asia/Bangkok" },
    end: { dateTime: "2022-08-21T23:00:00", timeZone: "Asia/Bangkok" },
    attendees: [],
  };

  const actualKeys = Object.keys(actual);
  const expectedKeys = Object.keys(expected);

  const actualStartKeys = Object.keys(actual.start);
  const expectedStartKeys = Object.keys(actual.start);

  const actualEndKeys = Object.keys(actual.end);
  const expectedEndKeys = Object.keys(actual.end);

  expect(actual).toEqual(expected);
  expect(actualKeys).toEqual(expectedKeys);
  expect(actualStartKeys).toEqual(expectedStartKeys);
  expect(actualEndKeys).toEqual(expectedEndKeys);
});
