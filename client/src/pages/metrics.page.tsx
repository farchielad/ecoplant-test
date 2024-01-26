import React, { useState, useEffect } from 'react';
import { Column } from '@material-table/core';
import CsvDataTable from '../components/table/table.component';
import DatePickerComponent from '../components/datePicker/datePicker.component';
import { useStyles } from './metrics.styles';

interface CsvData {
  timestamp: string;
  kwh: number;
  pressure: number;
  temp: number;
}

const METRICS_ENDPOINT = 'http://localhost:3001/api/metricsData';

const MetricsPage: React.FC = () => {
  const [data, setData] = useState<CsvData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const classes = useStyles();

  const handleDateChange = (start: Date | null, end: Date | null) => {
    console.log('Start Date:', start);
    console.log('End Date:', end);
  };

  useEffect(() => {
    const fetchMetricsData = async () => {
      try {
        const response = await fetch(METRICS_ENDPOINT);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('responseData: ', responseData);
        setData(responseData);
      } catch (error) {
        setError((error as Error).message || 'An error occurred while fetching data.');
      }
    };

    fetchMetricsData();
  }, []);

  const columns: Column<CsvData>[] = [
    { title: 'Timestamp', field: 'timestamp', type: 'string' },
    { title: 'KWH', field: 'kwh', type: 'numeric' },
    { title: 'Pressure', field: 'pressure', type: 'numeric' },
    { title: 'Temperature', field: 'temp', type: 'numeric' },
  ];

  if (error !== null && error !== undefined) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.MetricsPageWrapper}>
      <DatePickerComponent />
      <CsvDataTable data={data} columns={columns} maxHeight="60vh" />
    </div>
  );
};

export default MetricsPage;
