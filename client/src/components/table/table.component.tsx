import React from 'react';
import MaterialTable, { Column } from '@material-table/core';
import { CsvData } from '../../interfaces';

interface CsvDataTableProps {
  data: CsvData[];
  columns: Column<CsvData>[];
  maxHeight: string;
}

const CsvDataTable: React.FC<CsvDataTableProps> = ({ data, columns, maxHeight }) => {
  return (
    <MaterialTable
      title={<div style={{ color: '#142d4a' }}>CSV Data</div>}
      columns={columns}
      data={data}
      options={{
        headerStyle: {
          position: 'sticky',
          top: 0,
          background: '#96b964'
        },
        paging: true,
        pageSize: 20,
        pageSizeOptions: [20],
        search: false,
        maxBodyHeight: maxHeight,
      }}
    />
  );
};

export default CsvDataTable;
