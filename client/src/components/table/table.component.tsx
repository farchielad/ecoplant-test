import React from 'react';
import MaterialTable from '@material-table/core';
import { CsvDataTableProps } from '../../interfaces';

const CsvDataTable: React.FC<CsvDataTableProps> = ({ data, columns, maxHeight }) => {
  return (
    <MaterialTable
      columns={columns}
      data={data}
      options={{
        thirdSortClick: false,
        toolbar: false,
        headerStyle: {
          position: 'sticky',
          top: 0,
          background: '#96b964'
        },
        paging: true,
        pageSize: Math.min(data.length, 20),
        pageSizeOptions: [20],
        search: false,
        maxBodyHeight: maxHeight,
      }}
    />
  );
};

export default CsvDataTable;
