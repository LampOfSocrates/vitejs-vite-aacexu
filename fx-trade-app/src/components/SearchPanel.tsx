import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SearchPanelProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  filterDropdown: { [key: string]: string };
  handleDropdownChange: (field: string, value: string) => void;
  clearFilter: () => void;
  data: any[];
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  selectedDate,
  setSelectedDate,
  filterDropdown,
  handleDropdownChange,
  clearFilter,
  data,
}) => {
  return (
    <div className="search-panel">
      <div className="filter-group">
        <label>Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/MM/yyyy"
        />
      </div>
      <div className="filter-group">
        <label>Currency Pair:</label>
        <select
          value={filterDropdown['Currency Pair'] || ''}
          onChange={(e) =>
            handleDropdownChange('Currency Pair', e.target.value)
          }
        >
          <option value="">All</option>
          {Array.from(new Set(data.map((item) => item['Currency Pair']))).map(
            (option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            )
          )}
        </select>
      </div>
      <div className="filter-group">
        <label>Status:</label>
        <select
          value={filterDropdown['Status'] || ''}
          onChange={(e) => handleDropdownChange('Status', e.target.value)}
        >
          <option value="">All</option>
          {Array.from(new Set(data.map((item) => item.Status))).map(
            (option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            )
          )}
        </select>
      </div>
      <div className="filter-buttons">
        <button onClick={clearFilter}>Clear Filter</button>
      </div>
    </div>
  );
};

export default SearchPanel;
