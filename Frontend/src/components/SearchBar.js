import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by customer name, car make or model..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        {query && (
          <button type="button" onClick={handleClear} className="btn btn-secondary">
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;