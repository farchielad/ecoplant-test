// Import necessary libraries
import express from 'express';
import cors from 'cors';
import csv from 'csv-parser';
import fs from 'fs';

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Define a type for the CSV data
interface CsvData {
  timestamp: string;
  kwh: number;
  pressure: number;
  tepm: number;
}

let csvData: CsvData[] = [];

// Read CSV file and populate csvData array
fs.createReadStream('./FE_dev_exam_log.csv')
  .pipe(csv())
  .on('data', (row) => {
    const formattedRow = {
      timestamp: row[Object.keys(row)[0]] || '',
      kwh: parseFloat(row.kwh) || 0,
      pressure: parseFloat(row.pressure) || 0,
      temp: parseFloat(row.tepm) || 0,
    };
    csvData.push(formattedRow as any);
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
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'An error occurred.' });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
