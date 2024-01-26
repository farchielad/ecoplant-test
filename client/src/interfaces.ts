import { Column } from "@material-table/core";

export interface CsvData {
  timestamp: string;
  kwh: number;
  pressure: number;
  temp: number;
}

export interface CsvDataTableProps {
  data: CsvData[];
  columns: Column<CsvData>[];
  maxHeight: string;
}
