import React from 'react';
import { Link } from 'react-router-dom';
import './BookingCard.css';

const BookingCard = ({ booking, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      'Pending': 'status-pending',
      'Confirmed': 'status-confirmed',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    };
    return statusClasses[status] || 'status-pending';
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      onDelete(booking._id);
    }
  };

  return (
    <div className="booking-card">
      <div className="booking-header">
        <h3 className="customer-name">{booking.customerName}</h3>
        <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="booking-details">
        <div className="detail-row">
          <span className="label">Car:</span>
          <span className="value">
            {booking.carDetails.year} {booking.carDetails.make} {booking.carDetails.model}
          </span>
        </div>
        
        <div className="detail-row">
          <span className="label">Type:</span>
          <span className="value">{booking.carDetails.type}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Service:</span>
          <span className="value service-type">{booking.serviceType}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Date & Time:</span>
          <span className="value">
            {formatDate(booking.date)} at {booking.timeSlot}
          </span>
        </div>
        
        <div className="detail-row">
          <span className="label">Duration:</span>
          <span className="value">{booking.duration} min</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Price:</span>
          <span className="value price">${booking.price}</span>
        </div>
        
        {booking.rating && (
          <div className="detail-row">
            <span className="label">Rating:</span>
            <span className="value rating">
              {'★'.repeat(booking.rating)}{'☆'.repeat(5 - booking.rating)}
            </span>
          </div>
        )}
      </div>
      
      {booking.addOns && booking.addOns.length > 0 && (
        <div className="add-ons">
          <span className="label">Add-ons:</span>
          <div className="add-ons-list">
            {booking.addOns.map((addOn, index) => (
              <span key={index} className="add-on-tag">{addOn}</span>
            ))}
          </div>
        </div>
      )}
      
      <div className="booking-actions">
        <Link to={`/booking/${booking._id}`} className="btn btn-secondary">
          View Details
        </Link>
        <Link to={`/edit-booking/${booking._id}`} className="btn btn-primary">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
