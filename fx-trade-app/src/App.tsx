import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import './App.css';
import SearchPanel from './components/SearchPanel';
import MainGrid from './components/MainGrid';
import PositionTotalsGrid from './components/PositionTotalsGrid';
import PriceChart from './components/PriceChart';

interface TransactionRow {
  'Transaction ID': number;
  Date: string;
  'Currency Pair': string;
  'Buy/Sell': string;
  Amount: number;
  Price: number;
  Total: number;
  Status: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<TransactionRow[]>([]);
  const [filteredData, setFilteredData] = useState<TransactionRow[]>([]);
  const [filterText, setFilterText] = useState<{ [key: string]: string }>({});
  const [filterDropdown, setFilterDropdown] = useState<{
    [key: string]: string;
  }>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    Papa.parse('/fx_transactions.csv', {
      header: true,
      download: true,
      complete: (result) => {
        let loadedData = result.data as TransactionRow[];
        
        setData(loadedData);
        setFilteredData(loadedData);
        saveGeneratedCSV(loadedData);
      },
      error: (error) => {
        console.error('Error loading CSV:', error);
      },
    });
  }, []);

  const generateAdditionalRows = (
    existingRows: TransactionRow[],
    count: number
  ): TransactionRow[] => {
    const additionalRows: TransactionRow[] = [];

    for (let i = 0; i < count; i++) {
      const randomRow =
        existingRows[Math.floor(Math.random() * existingRows.length)];
      const noise = Math.random() * 0.4 - 0.2; // Random noise between -20% to 20%
      const newPrice = randomRow.Price * (1 + noise);
      const newRow: TransactionRow = {
        'Transaction ID': existingRows.length + i + 1,
        Date: randomRow.Date,
        'Currency Pair': randomRow['Currency Pair'],
        'Buy/Sell': randomRow['Buy/Sell'],
        Amount: randomRow.Amount,
        Price: parseFloat(newPrice.toFixed(4)), // Adjust price with noise
        Total: parseFloat((randomRow.Amount * newPrice).toFixed(2)), // Adjust total accordingly
        Status: randomRow.Status,
      };

      additionalRows.push(newRow);
    }

    return additionalRows;
  };

  const saveGeneratedCSV = (data: TransactionRow[]) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'fx-gen.csv');
  };

  useEffect(() => {
    let filtered = data;
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      filtered = filtered.filter((row) => row.Date === formattedDate);
    }
    filtered = filtered.filter(
      (row) =>
        Object.keys(filterText).every((key) =>
          row[key as keyof TransactionRow]
            .toString()
            .toLowerCase()
            .includes(filterText[key].toLowerCase())
        ) &&
        Object.keys(filterDropdown).every((key) =>
          filterDropdown[key]
            ? row[key as keyof TransactionRow] === filterDropdown[key]
            : true
        )
    );
    setFilteredData(filtered);
  }, [data, filterText, filterDropdown, selectedDate]);

  const handleFilterTextChange = (field: string, value: string) => {
    setFilterText({ ...filterText, [field]: value });
  };

  const handleDropdownChange = (field: string, value: string) => {
    setFilterDropdown({ ...filterDropdown, [field]: value });
  };

  const clearFilter = () => {
    setFilterText({});
    setFilterDropdown({});
    setSelectedDate(null);
    setFilteredData(data);
  };

  return (
    <div className="app-container">
      <div className="panel">
        <h2>Filter</h2>
        <SearchPanel
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          filterDropdown={filterDropdown}
          handleDropdownChange={handleDropdownChange}
          clearFilter={clearFilter}
          data={data}
        />
      </div>
      <div className="panel">
        <h2>Transactions</h2>
        <MainGrid filteredData={filteredData} />
      </div>
      <div className="panel">
        <h2>Positions</h2>
        <PositionTotalsGrid filteredData={filteredData} />
      </div>
      <div className="panel">
        <h2>Price vs Date</h2>
        <PriceChart data={filteredData} />
      </div>
    </div>
  );
};

export default App;
