import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';

const DatePickerComponent: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<any>({
    start: null,
    end: null,
  });

  const handleDateChange = (newDates: any) => {
    console.log('newDates: ', newDates);
    setSelectedDates(newDates);
    // Your logic with the updated start and end dates goes here
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['SingleInputDateTimeRangeField']}>
        <SingleInputDateTimeRangeField
          label="From Date - To Date"
          onChange={(newDates) => handleDateChange(newDates)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
