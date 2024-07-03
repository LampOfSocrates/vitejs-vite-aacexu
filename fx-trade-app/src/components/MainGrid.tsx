import React, { useMemo } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface MainGridProps {
  filteredData: any[];
}

const MainGrid: React.FC<MainGridProps> = ({ filteredData }) => {
  const columns = useMemo<AgGridReactProps['columnDefs']>(
    () => [
      { headerName: 'Transaction ID', field: 'Transaction ID', sortable: true },
      { headerName: 'Date', field: 'Date', sortable: true },
      { headerName: 'Currency Pair', field: 'Currency Pair', sortable: true },
      { headerName: 'Buy/Sell', field: 'Buy/Sell', sortable: true },
      { headerName: 'Amount', field: 'Amount', sortable: true },
      { headerName: 'Price', field: 'Price', sortable: true },
      { headerName: 'Total', field: 'Total', sortable: true },
      { headerName: 'Status', field: 'Status', sortable: true },
    ],
    []
  );

  return (
    <div
      className="main-grid ag-theme-alpine compact-grid campfire-grid"
      style={{ height: 400, width: '100%' }}
    >
      <AgGridReact
        rowData={filteredData}
        columnDefs={columns}
        defaultColDef={{
          sortable: true,
          flex: 1,
        }}
        pagination={true}
        paginationPageSize={20}
        getRowStyle={() => ({ height: 'var(--ag-row-height)' })} // Use CSS variable
      />
    </div>
  );
};

export default MainGrid;
