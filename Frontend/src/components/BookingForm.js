import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import './BookingForm.css';

const BookingForm = ({ bookingId, initialData = {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    carDetails: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      type: 'sedan'
    },
    serviceType: 'Basic Wash',
    date: '',
    timeSlot: '09:00',
    duration: 30,
    status: 'Pending',
    addOns: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!!bookingId);

  const carTypes = ['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van'];
  const serviceTypes = ['Basic Wash', 'Deluxe Wash', 'Full Detailing'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  const addOnOptions = [
    'Interior Cleaning', 'Polishing', 'Waxing', 'Odor Removal', 'Engine Cleaning'
  ];

  useEffect(() => {
    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getBooking(bookingId);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching booking:', error);
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('carDetails.')) {
      const carField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        carDetails: {
          ...prev.carDetails,
          [carField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddOnChange = (addOn) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOn)
        ? prev.addOns.filter(a => a !== addOn)
        : [...prev.addOns, addOn]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData.carDetails.make.trim()) {
      newErrors['carDetails.make'] = 'Car make is required';
    }

    if (!formData.carDetails.model.trim()) {
      newErrors['carDetails.model'] = 'Car model is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (new Date(formData.date) < new Date().setHours(0,0,0,0)) {
      newErrors.date = 'Date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (isEditing) {
        await bookingAPI.updateBooking(bookingId, formData);
      } else {
        await bookingAPI.createBooking(formData);
      }
      
      navigate('/');
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="loading">Loading booking details...</div>;
  }

  return (
    <div className="booking-form-container">
      <h2>{isEditing ? 'Edit Booking' : 'Create New Booking'}</h2>
      
      {errors.general && (
        <div className="error-message general-error">{errors.general}</div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        {/* Customer Information */}
        <div className="form-section">
          <h3>Customer Information</h3>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className={errors.customerName ? 'error' : ''}
              placeholder="Enter customer name"
            />
            {errors.customerName && (
              <span className="error-text">{errors.customerName}</span>
            )}
          </div>
        </div>

        {/* Car Details */}
        <div className="form-section">
          <h3>Car Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="carMake">Make *</label>
              <input
                type="text"
                id="carMake"
                name="carDetails.make"
                value={formData.carDetails.make}
                onChange={handleInputChange}
                className={errors['carDetails.make'] ? 'error' : ''}
                placeholder="e.g., Toyota"
              />
              {errors['carDetails.make'] && (
                <span className="error-text">{errors['carDetails.make']}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="carModel">Model *</label>
              <input
                type="text"
                id="carModel"
                name="carDetails.model"
                value={formData.carDetails.model}
                onChange={handleInputChange}
                className={errors['carDetails.model'] ? 'error' : ''}
                placeholder="e.g., Camry"
              />
              {errors['carDetails.model'] && (
                <span className="error-text">{errors['carDetails.model']}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="carYear">Year *</label>
              <input
                type="number"
                id="carYear"
                name="carDetails.year"
                value={formData.carDetails.year}
                onChange={handleInputChange}
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div className="form-group">
              <label htmlFor="carType">Car Type *</label>
              <select
                id="carType"
                name="carDetails.type"
                value={formData.carDetails.type}
                onChange={handleInputChange}
              >
                {carTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="form-section">
          <h3>Service Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="serviceType">Service Type *</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
              >
                {serviceTypes.map(service => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (minutes) *</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="15"
                max="480"
                step="15"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={errors.date ? 'error' : ''}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.date && (
                <span className="error-text">{errors.date}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="timeSlot">Time Slot *</label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
              >
                {timeSlots.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="form-section">
          <h3>Add-ons</h3>
          <div className="add-ons-grid">
            {addOnOptions.map(addOn => (
              <label key={addOn} className="add-on-checkbox">
                <input
                  type="checkbox"
                  checked={formData.addOns.includes(addOn)}
                  onChange={() => handleAddOnChange(addOn)}
                />
                <span className="checkmark"></span>
                {addOn}
              </label>
            ))}
          </div>
        </div>

        {/* Status (for editing) */}
        {isEditing && (
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Booking' : 'Create Booking')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
