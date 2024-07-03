import React, { useState } from 'react';

interface FilterProps {
  onFilter: (filters: any) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [date, setDate] = useState('');
  const [currencyPair, setCurrencyPair] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    onFilter({ date, currencyPair, status });
  };

  const handleClear = () => {
    setDate('');
    setCurrencyPair('');
    setStatus('');
    onFilter({ date: '', currencyPair: '', status: '' });
  };

  return (
    <div className="filter">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
      />
      <input
        type="text"
        value={currencyPair}
        onChange={(e) => setCurrencyPair(e.target.value)}
        placeholder="Currency Pair"
      />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
      />
      <button onClick={handleFilter}>Apply Filters</button>
      <button onClick={handleClear}>Clear Filters</button>
    </div>
  );
};

export default Filter;
