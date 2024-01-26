const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');

const CSV_PATH = './FE_dev_exam_log.csv';

const app = express();
app.use(cors());

const csvData = [];

// Read CSV file and populate csvData array
fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on('data', (row) => {
    const formattedRow = {
      timestamp: row[Object.keys(row)[0]] || '',
      kwh: parseFloat(row.kwh) || 0,
      pressure: parseFloat(row.pressure) || 0,
      temp: parseFloat(row.temp) || 0,
    };
    csvData.push(formattedRow);
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });

app.get('/api/metricsData', (req, res) => {
  try {
    if (csvData.length === 0) {
      throw new Error('No data available.');
    }

    res.json(csvData);
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred.' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
