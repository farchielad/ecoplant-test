import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';
import dayjs from "dayjs";
import { Column } from '@material-table/core';
import CsvDataTable from '../components/table/table.component';
import { useStyles } from './metrics.styles';

interface CsvData {
  timestamp: string;
  kwh: number;
  pressure: number;
  temp: number;
}

const METRICS_ENDPOINT = 'http://localhost:3001/api/metricsData';
const DATE_TIME_FORMAT = 'MM/DD/YYYY HH:mm';

const MetricsPage: React.FC = () => {
  const [data, setData] = useState<CsvData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<any>({
    start: null,
    end: null,
  });

  const classes = useStyles();

  const filterDataByTimeRange = (data: CsvData[], startTime: string, endTime: string) => {
    if (!selectedDates.start || !selectedDates.end) {
      return data;
    }

    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);
    return data.filter(item => {
      const timestamp = new Date(item.timestamp);
      return timestamp >= startDateTime && timestamp <= endDateTime;
    });
  };

  const handleDateChange = ([startDateTime, endDateTime]: any) => {
    if (isNaN(dayjs(startDateTime).valueOf()) || isNaN(dayjs(endDateTime).valueOf())) {
      return;
    }
    const formattedStartDateTime = dayjs(startDateTime).format(DATE_TIME_FORMAT);
    const formattedEndDateTime = dayjs(endDateTime).format(DATE_TIME_FORMAT);
    setSelectedDates({
      start: formattedStartDateTime,
      end: formattedEndDateTime
    });
  };

  useEffect(() => {
    const fetchMetricsData = async () => {
      try {
        const response = await fetch(METRICS_ENDPOINT);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
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
    return (<div>Error: {error}</div>);
  }

  return (
    <div className={classes.metricsPageWrapper}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SingleInputDateTimeRangeField
          className={classes.datePickerWrapper}
          label="From Date - To Date"
          onChange={(newDates) => handleDateChange(newDates)}
        />
      </LocalizationProvider>
      <div className={classes.tableWrapper}>
        <CsvDataTable
          data={filterDataByTimeRange(data, selectedDates.start, selectedDates.end)}
          columns={columns}
          maxHeight="60vh"
        />
      </div>
    </div>
  );
};

export default MetricsPage;
