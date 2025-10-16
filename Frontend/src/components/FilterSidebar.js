import React from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const carTypes = ['', 'sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van'];
  const serviceTypes = ['', 'Basic Wash', 'Deluxe Wash', 'Full Detailing'];
  const statusTypes = ['', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];
  const sortOptions = [
    { value: 'date:desc', label: 'Newest First' },
    { value: 'date:asc', label: 'Oldest First' },
    { value: 'price:desc', label: 'Price: High to Low' },
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'customerName:asc', label: 'Customer Name: A-Z' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const handleSortChange = (value) => {
    const [sortBy, sortOrder] = value.split(':');
    onFilterChange({ sortBy, sortOrder });
  };

  const clearFilters = () => {
    onFilterChange({
      serviceType: '',
      carType: '',
      status: '',
      startDate: '',
      endDate: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = filters.serviceType || filters.carType || filters.status || filters.startDate || filters.endDate;

  return (
    <div className="filter-sidebar" style={{
      width: '280px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      height: 'fit-content'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Filters</h3>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline'
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sort Options */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Sort By</label>
        <select
          value={`${filters.sortBy}:${filters.sortOrder}`}
          onChange={(e) => handleSortChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Service Type Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Service Type</label>
        <select
          value={filters.serviceType || ''}
          onChange={(e) => handleFilterChange('serviceType', e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        >
          {serviceTypes.map(type => (
            <option key={type} value={type}>
              {type || 'All Services'}
            </option>
          ))}
        </select>
      </div>

      {/* Car Type Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Car Type</label>
        <select
          value={filters.carType || ''}
          onChange={(e) => handleFilterChange('carType', e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        >
          {carTypes.map(type => (
            <option key={type} value={type}>
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'All Car Types'}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Status</label>
        <select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        >
          {statusTypes.map(status => (
            <option key={status} value={status}>
              {status || 'All Statuses'}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Filters */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Start Date</label>
        <input
          type="date"
          value={filters.startDate || ''}
          onChange={(e) => handleFilterChange('startDate', e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>End Date</label>
        <input
          type="date"
          value={filters.endDate || ''}
          onChange={(e) => handleFilterChange('endDate', e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;