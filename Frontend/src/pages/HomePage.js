// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import { bookingAPI } from '../services/api';
// import BookingCard from '../components/BookingCard';
// import SearchBar from '../components/SearchBar';
// import FilterSidebar from '../components/FilterSidebar';
// import LoadingSpinner from '../components/LoadingSpinner';
// import './HomePage.css';

// const HomePage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [filters, setFilters] = useState({
//     page: 1,
//     limit: 8,
//     serviceType: '',
//     carType: '',
//     status: '',
//     startDate: '',
//     endDate: '',
//     sortBy: 'date',
//     sortOrder: 'desc'
//   });
//   const [pagination, setPagination] = useState({});

//   const fetchBookings = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const response = await bookingAPI.getBookings(filters);
//       setBookings(response.data);
//       setPagination(response.pagination);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching bookings:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   useEffect(() => {
//     fetchBookings();
//   }, [fetchBookings]);

//   const handleSearch = (query) => {
//     if (query) {
//       // Implement search functionality
//       bookingAPI.searchBookings(query)
//         .then(response => {
//           setBookings(response.data);
//           setPagination(response.pagination);
//         })
//         .catch(err => setError(err.message));
//     } else {
//       fetchBookings();
//     }
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
//   };

//   const handlePageChange = (newPage) => {
//     setFilters(prev => ({ ...prev, page: newPage }));
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     try {
//       await bookingAPI.deleteBooking(bookingId);
//       setBookings(prev => prev.filter(booking => booking._id !== bookingId));
//       // Refresh to maintain pagination consistency
//       fetchBookings();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="homepage">
//       <div className="container">
//         <div className="page-header">
//           <h1>Car Wash Bookings</h1>
//           <Link to="/add-booking" className="btn btn-primary">
//             Add New Booking
//           </Link>
//         </div>

//         <div className="search-filter-section">
//           <SearchBar onSearch={handleSearch} />
//         </div>

//         <div className="content-layout">
//           <FilterSidebar 
//             filters={filters}
//             onFilterChange={handleFilterChange}
//           />
          
//           <div className="main-content">
//             {error && (
//               <div className="error-message">
//                 {error}
//               </div>
//             )}

//             {loading ? (
//               <LoadingSpinner />
//             ) : (
//               <>
//                 <div className="bookings-grid">
//                   {bookings.map(booking => (
//                     <BookingCard 
//                       key={booking._id}
//                       booking={booking}
//                       onDelete={handleDeleteBooking}
//                     />
//                   ))}
//                 </div>

//                 {bookings.length === 0 && (
//                   <div className="no-bookings">
//                     <p>No bookings found matching your criteria.</p>
//                     <Link to="/add-booking" className="btn btn-primary">
//                       Create Your First Booking
//                     </Link>
//                   </div>
//                 )}

//                 {pagination.totalPages > 1 && (
//                   <div className="pagination">
//                     <button
//                       disabled={filters.page === 1}
//                       onClick={() => handlePageChange(filters.page - 1)}
//                       className="pagination-btn"
//                     >
//                       Previous
//                     </button>
                    
//                     <span className="pagination-info">
//                       Page {pagination.page} of {pagination.totalPages}
//                     </span>
                    
//                     <button
//                       disabled={filters.page === pagination.totalPages}
//                       onClick={() => handlePageChange(filters.page + 1)}
//                       className="pagination-btn"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;




import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import BookingCard from '../components/BookingCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import './HomePage.css';

const HomePage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
    serviceType: '',
    carType: '',
    status: '',
    startDate: '',
    endDate: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({});

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await bookingAPI.getBookings(filters);
      setBookings(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleSearch = (query) => {
    if (query) {
      bookingAPI.searchBookings(query)
        .then(response => {
          setBookings(response.data);
          setPagination(response.pagination);
        })
        .catch(err => setError(err.message));
    } else {
      fetchBookings();
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await bookingAPI.deleteBooking(bookingId);
      setBookings(prev => prev.filter(booking => booking._id !== bookingId));
      fetchBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="homepage">
      <div className="container">
        <div className="page-header">
          <h1>Car Wash Bookings</h1>
          <Link to="/add-booking" className="btn btn-primary">
            Add New Booking
          </Link>
        </div>

        <div className="search-filter-section">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="content-layout">
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          
          <div className="main-content">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {loading ? (
              <LoadingSpinner text="Loading bookings..." />
            ) : (
              <>
                <div className="bookings-grid">
                  {bookings.map(booking => (
                    <BookingCard 
                      key={booking._id}
                      booking={booking}
                      onDelete={handleDeleteBooking}
                    />
                  ))}
                </div>

                {bookings.length === 0 && (
                  <div className="no-bookings">
                    <p>No bookings found matching your criteria.</p>
                    <Link to="/add-booking" className="btn btn-primary">
                      Create Your First Booking
                    </Link>
                  </div>
                )}

                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    <button
                      disabled={filters.page === 1}
                      onClick={() => handlePageChange(filters.page - 1)}
                      className="pagination-btn"
                    >
                      Previous
                    </button>
                    
                    <span className="pagination-info">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    
                    <button
                      disabled={filters.page === pagination.totalPages}
                      onClick={() => handlePageChange(filters.page + 1)}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;