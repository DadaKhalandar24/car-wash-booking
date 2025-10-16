import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BookingDetail = () => {
  const { id } = useParams();
  
  // For now, return a simple page - you can implement the full detail view later
  return (
    <div style={{ padding: '20px' }}>
      <h1>Booking Details</h1>
      <p>Booking ID: {id}</p>
      <p>This is the booking detail page for booking {id}</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default BookingDetail;