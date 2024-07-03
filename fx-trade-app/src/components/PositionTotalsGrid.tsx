import React, { useMemo, useEffect, useRef } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface PositionTotalsGridProps {
  filteredData: any[];
}

const PositionTotalsGrid: React.FC<PositionTotalsGridProps> = ({
  filteredData,
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const aggregatePositions = () => {
    const positions: { [key: string]: number } = {};
    filteredData.forEach((row) => {
      if (!positions[row['Currency Pair']]) {
        positions[row['Currency Pair']] = 0;
      }
      positions[row['Currency Pair']] += parseFloat(row.Amount);
    });
    return Object.keys(positions).map((currency) => ({
      Currency: currency,
      Quantity: positions[currency],
    }));
  };

  const positionColumns = useMemo<AgGridReactProps['columnDefs']>(
    () => [
      { headerName: 'Currency', field: 'Currency', sortable: true },
      { headerName: 'Quantity', field: 'Quantity', sortable: true },
    ],
    []
  );

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [filteredData]);

  return (
    <div
      className="position-totals-grid ag-theme-alpine compact-grid campfire-grid"
      style={{ height: 200, width: 'auto', overflowX: 'auto' }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={aggregatePositions()}
        columnDefs={positionColumns}
        defaultColDef={{
          sortable: true,
          flex: 1,
        }}
        pagination={true}
        paginationPageSize={20}
        getRowStyle={() => ({ height: 'var(--ag-row-height)' })} // Use CSS variable
        onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
      />
    </div>
  );
};

export default PositionTotalsGrid;
