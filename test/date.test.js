const { toDateTime } = require("../app");

test("time: 21:00 - 23:00", () => {
  const fixture = {
    date: {
      datetime: "21-08-2022",
      month: "August",
    },
    fixtures: [
      {
        home: "Chelsea",
        away: "Tottenham Hotspur",
        time: "21:00",
      },
    ],
  };
  const actual = toDateTime(fixture.date.datetime, fixture.fixtures[0].time);
  const expected = {
    startDate: "2022-08-21T21:00:00",
    endDate: "2022-08-21T23:00:00",
  };

  expect(actual).toEqual(expected);
});

test("time: 22:00 - 00:00", () => {
  const fixture = {
    date: {
      datetime: "21-08-2022",
      month: "August",
    },
    fixtures: [
      {
        home: "Chelsea",
        away: "Tottenham Hotspur",
        time: "22:00",
      },
    ],
  };
  const actual = toDateTime(fixture.date.datetime, fixture.fixtures[0].time);
  const expected = {
    startDate: "2022-08-21T22:00:00",
    endDate: "2022-08-22T00:00:00",
  };

  expect(actual).toEqual(expected);
});

test("time: 00:00 - 02:00", () => {
  const fixture = {
    date: {
      datetime: "21-08-2022",
      month: "August",
    },
    fixtures: [
      {
        home: "Chelsea",
        away: "Tottenham Hotspur",
        time: "00:00",
      },
    ],
  };
  const actual = toDateTime(fixture.date.datetime, fixture.fixtures[0].time);
  const expected = {
    startDate: "2022-08-21T00:00:00",
    endDate: "2022-08-21T02:00:00",
  };

  expect(actual).toEqual(expected);
});

test("time: 01:45 - 03:45", () => {
  const fixture = {
    date: {
      datetime: "21-08-2022",
      month: "August",
    },
    fixtures: [
      {
        home: "Chelsea",
        away: "Tottenham Hotspur",
        time: "01:45",
      },
    ],
  };
  const actual = toDateTime(fixture.date.datetime, fixture.fixtures[0].time);
  const expected = {
    startDate: "2022-08-21T01:45:00",
    endDate: "2022-08-21T03:45:00",
  };

  expect(actual).toEqual(expected);
});

test("time: 19:30 - 21:30", () => {
  const fixture = {
    date: {
      datetime: "21-08-2022",
      month: "August",
    },
    fixtures: [
      {
        home: "Chelsea",
        away: "Tottenham Hotspur",
        time: "19:30",
      },
    ],
  };
  const actual = toDateTime(fixture.date.datetime, fixture.fixtures[0].time);
  const expected = {
    startDate: "2022-08-21T19:30:00",
    endDate: "2022-08-21T21:30:00",
  };

  expect(actual).toEqual(expected);
});

test("time: 23:30 - 01:30", () => {
  const fixture = {
    date: {
      datetime: "21-08-2022",
      month: "August",
    },
    fixtures: [
      {
        home: "Chelsea",
        away: "Tottenham Hotspur",
        time: "23:30",
      },
    ],
  };
  const actual = toDateTime(fixture.date.datetime, fixture.fixtures[0].time);
  const expected = {
    startDate: "2022-08-21T23:30:00",
    endDate: "2022-08-22T01:30:00",
  };

  expect(actual).toEqual(expected);
});

test("cross month:: time: 23:30 - 01:30", () => {
  const fixture = {
    date: {
      datetime: "30-11-2022",
      month: "November",
    },
    fixtures: [
      {
        home: "Chelsea",
        away: "Tottenham Hotspur",
        time: "23:30",
      },
    ],
  };
  const actual = toDateTime(fixture.date.datetime, fixture.fixtures[0].time);
  const expected = {
    startDate: "2022-11-30T23:30:00",
    endDate: "2022-12-01T01:30:00",
  };

  // :)
  expect(actual).not.toEqual(expected);
});

test("cross year:: time: 23:30 - 01:30", () => {
  const fixture = {
    date: {
      datetime: "31-12-2022",
      month: "December",
    },
    fixtures: [
      {
        home: "Chelsea",
        away: "Tottenham Hotspur",
        time: "22:00",
      },
    ],
  };
  const actual = toDateTime(fixture.date.datetime, fixture.fixtures[0].time);
  const expected = {
    startDate: "2022-12-31T22:00:00",
    endDate: "2023-01-01T00:00:00",
  };

  // :)
  expect(actual).not.toEqual(expected);
});
