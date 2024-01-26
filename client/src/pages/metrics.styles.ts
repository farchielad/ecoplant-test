import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  metricsPageWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  datePickerWrapper: {
    width: 500,
  },
  tableWrapper: {
    paddingTop: 20,
  },
  loadingSpinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
});
