# ecoplant-test

Fetch data from local node and display data in table including dates filtering.

## Running the project

- Used Node 14. Please ensure your Node version matches.

## Assumptions

- There were no limitations regarding using components libraries in this exercise according to the email reply I received.
- For the table, I used [material-table](https://www.npmjs.com/package/material-table).
- For the dates and time component, I used [Mui Pickers](https://mui.com/x/api/date-pickers/single-input-date-range-field/).
- Initially, upon loading, I fetch all the data regardless of dates.

## Server

In the root project directory:
1. Run `npm install`.
2. Run `node server.js`.

## Client

In the `client` folder:
1. Run `npm install`.
2. Run `npm start`.

## Testing

I am using Jest as a test framework. I have created some basic tests, more can be added in the future if needed.
To run tests, in the `client` folder, please run:
- `npm test`
