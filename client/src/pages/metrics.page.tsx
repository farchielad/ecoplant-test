import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';
import CircularProgress from "@material-ui/core/CircularProgress";
import dayjs from "dayjs";
import { Column } from '@material-table/core';
import CsvDataTable from "../components/table/table.component";
import { useStyles } from "./metrics.styles";
import { CsvData} from "../interfaces";

const METRICS_ENDPOINT = 'http://localhost:3001/api/metricsData';
const DATE_TIME_FORMAT = 'MM/DD/YYYY HH:mm'; // assuming table data is also in this format.

const MetricsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
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

  const fetchMetricsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(METRICS_ENDPOINT);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError((error as Error).message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  if (loading) {
    return (
      <div className={classes.loadingSpinner}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={classes.metricsPageWrapper}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SingleInputDateTimeRangeField
          className={classes.datePickerWrapper}
          label="From Date - To Date"
          format={DATE_TIME_FORMAT}
          onChange={(newDates) => handleDateChange(newDates)}
        />
      </LocalizationProvider>
      <div className={classes.tableWrapper}>
        <CsvDataTable
          data={filterDataByTimeRange(data, selectedDates.start, selectedDates.end)}
          columns={columns}
          maxHeight="70vh"
        />
      </div>
    </div>
  );
};

export default MetricsPage;
