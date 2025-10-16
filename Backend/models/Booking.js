
// // const mongoose = require('mongoose');

// // const bookingSchema = new mongoose.Schema({
// //   customerName: {
// //     type: String,
// //     required: [true, 'Customer name is required'],
// //     trim: true,
// //     maxlength: [100, 'Customer name cannot exceed 100 characters']
// //   },
// //   carDetails: {
// //     make: {
// //       type: String,
// //       required: [true, 'Car make is required'],
// //       trim: true
// //     },
// //     model: {
// //       type: String,
// //       required: [true, 'Car model is required'],
// //       trim: true
// //     },
// //     year: {
// //       type: Number,
// //       required: [true, 'Car year is required'],
// //       min: [1990, 'Car year must be 1990 or later'],
// //       max: [new Date().getFullYear() + 1, 'Car year cannot be in the future']
// //     },
// //     type: {
// //       type: String,
// //       required: [true, 'Car type is required'],
// //       enum: ['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van']
// //     }
// //   },
// //   serviceType: {
// //     type: String,
// //     required: [true, 'Service type is required'],
// //     enum: ['Basic Wash', 'Deluxe Wash', 'Full Detailing']
// //   },
// //   date: {
// //     type: Date,
// //     required: [true, 'Booking date is required'],
// //     validate: {
// //       validator: function(date) {
// //         return date >= new Date().setHours(0,0,0,0);
// //       },
// //       message: 'Booking date cannot be in the past'
// //     }
// //   },
// //   timeSlot: {
// //     type: String,
// //     required: [true, 'Time slot is required'],
// //     match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time slot must be in HH:MM format']
// //   },
// //   duration: {
// //     type: Number,
// //     required: [true, 'Duration is required'],
// //     min: [15, 'Duration must be at least 15 minutes'],
// //     max: [480, 'Duration cannot exceed 8 hours']
// //   },
// //   price: {
// //     type: Number,
// //     required: [true, 'Price is required'],
// //     min: [0, 'Price cannot be negative']
// //   },
// //   status: {
// //     type: String,
// //     enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
// //     default: 'Pending'
// //   },
// //   rating: {
// //     type: Number,
// //     min: [1, 'Rating must be at least 1'],
// //     max: [5, 'Rating cannot exceed 5'],
// //     default: null
// //   },
// //   addOns: [{
// //     type: String,
// //     enum: ['Interior Cleaning', 'Polishing', 'Waxing', 'Odor Removal', 'Engine Cleaning']
// //   }]
// // }, {
// //   timestamps: true
// // });

// // // Calculate price based on service type and car type
// // bookingSchema.pre('save', function(next) {
// //   if (this.isModified('serviceType') || this.isModified('carDetails.type') || !this.price) {
// //     const basePrices = {
// //       'Basic Wash': { sedan: 25, suv: 35, hatchback: 20, luxury: 50, truck: 40, van: 45 },
// //       'Deluxe Wash': { sedan: 45, suv: 55, hatchback: 40, luxury: 75, truck: 65, van: 70 },
// //       'Full Detailing': { sedan: 120, suv: 150, hatchback: 100, luxury: 200, truck: 180, van: 190 }
// //     };
    
// //     const addOnPrices = {
// //       'Interior Cleaning': 25,
// //       'Polishing': 30,
// //       'Waxing': 40,
// //       'Odor Removal': 20,
// //       'Engine Cleaning': 35
// //     };
    
// //     let total = basePrices[this.serviceType][this.carDetails.type] || 0;
    
// //     // Add add-ons prices
// //     this.addOns.forEach(addOn => {
// //       total += addOnPrices[addOn] || 0;
// //     });
    
// //     this.price = total;
// //   }
// //   next();
// // });

// // // Index for better query performance
// // bookingSchema.index({ customerName: 'text', 'carDetails.make': 'text', 'carDetails.model': 'text' });
// // bookingSchema.index({ date: 1 });
// // bookingSchema.index({ status: 1 });
// // bookingSchema.index({ serviceType: 1 });

// // module.exports = mongoose.model('Booking', bookingSchema);





// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   customerName: {
//     type: String,
//     required: [true, 'Customer name is required'],
//     trim: true,
//     maxlength: [100, 'Customer name cannot exceed 100 characters']
//   },
//   carDetails: {
//     make: {
//       type: String,
//       required: [true, 'Car make is required'],
//       trim: true
//     },
//     model: {
//       type: String,
//       required: [true, 'Car model is required'],
//       trim: true
//     },
//     year: {
//       type: Number,
//       required: [true, 'Car year is required'],
//       min: [1990, 'Car year must be 1990 or later'],
//       max: [new Date().getFullYear() + 1, 'Car year cannot be in the future']
//     },
//     type: {
//       type: String,
//       required: [true, 'Car type is required'],
//       enum: ['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van']
//     }
//   },
//   serviceType: {
//     type: String,
//     required: [true, 'Service type is required'],
//     enum: ['Basic Wash', 'Deluxe Wash', 'Full Detailing']
//   },
//   date: {
//     type: Date,
//     required: [true, 'Booking date is required']
//   },
//   timeSlot: {
//     type: String,
//     required: [true, 'Time slot is required'],
//     match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time slot must be in HH:MM format']
//   },
//   duration: {
//     type: Number,
//     required: [true, 'Duration is required'],
//     min: [15, 'Duration must be at least 15 minutes'],
//     max: [480, 'Duration cannot exceed 8 hours']
//   },
//   price: {
//     type: Number,
//     required: [true, 'Price is required'],
//     min: [0, 'Price cannot be negative']
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
//     default: 'Pending'
//   },
//   rating: {
//     type: Number,
//     min: [1, 'Rating must be at least 1'],
//     max: [5, 'Rating cannot exceed 5'],
//     default: null
//   },
//   addOns: [{
//     type: String,
//     enum: ['Interior Cleaning', 'Polishing', 'Waxing', 'Odor Removal', 'Engine Cleaning']
//   }]
// }, {
//   timestamps: true
// });

// // Calculate price based on service type and car type
// bookingSchema.pre('save', function(next) {
//   if (this.isModified('serviceType') || this.isModified('carDetails.type') || !this.price) {
//     const basePrices = {
//       'Basic Wash': { sedan: 25, suv: 35, hatchback: 20, luxury: 50, truck: 40, van: 45 },
//       'Deluxe Wash': { sedan: 45, suv: 55, hatchback: 40, luxury: 75, truck: 65, van: 70 },
//       'Full Detailing': { sedan: 120, suv: 150, hatchback: 100, luxury: 200, truck: 180, van: 190 }
//     };
    
//     const addOnPrices = {
//       'Interior Cleaning': 25,
//       'Polishing': 30,
//       'Waxing': 40,
//       'Odor Removal': 20,
//       'Engine Cleaning': 35
//     };
    
//     let total = basePrices[this.serviceType][this.carDetails.type] || 0;
    
//     // Add add-ons prices
//     this.addOns.forEach(addOn => {
//       total += addOnPrices[addOn] || 0;
//     });
    
//     this.price = total;
//   }
//   next();
// });

// module.exports = mongoose.model('Booking', bookingSchema);




const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Customer name cannot exceed 100 characters']
  },
  carDetails: {
    make: {
      type: String,
      required: [true, 'Car make is required'],
      trim: true
    },
    model: {
      type: String,
      required: [true, 'Car model is required'],
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'Car year is required'],
      min: [1990, 'Car year must be 1990 or later'],
      max: [new Date().getFullYear() + 1, 'Car year cannot be in the future']
    },
    type: {
      type: String,
      required: [true, 'Car type is required'],
      enum: ['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van']
    }
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: ['Basic Wash', 'Deluxe Wash', 'Full Detailing']
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time slot must be in HH:MM format']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [15, 'Duration must be at least 15 minutes'],
    max: [480, 'Duration cannot exceed 8 hours']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    default: 0 // Add default value
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: null
  },
  addOns: [{
    type: String,
    enum: ['Interior Cleaning', 'Polishing', 'Waxing', 'Odor Removal', 'Engine Cleaning']
  }]
}, {
  timestamps: true
});

// Calculate price based on service type and car type
bookingSchema.pre('save', function(next) {
  // Only calculate price if it's a new document or serviceType/carType/addOns are modified
  if (this.isNew || this.isModified('serviceType') || this.isModified('carDetails.type') || this.isModified('addOns')) {
    const basePrices = {
      'Basic Wash': { 
        sedan: 25, suv: 35, hatchback: 20, luxury: 50, truck: 40, van: 45 
      },
      'Deluxe Wash': { 
        sedan: 45, suv: 55, hatchback: 40, luxury: 75, truck: 65, van: 70 
      },
      'Full Detailing': { 
        sedan: 120, suv: 150, hatchback: 100, luxury: 200, truck: 180, van: 190 
      }
    };
    
    const addOnPrices = {
      'Interior Cleaning': 25,
      'Polishing': 30,
      'Waxing': 40,
      'Odor Removal': 20,
      'Engine Cleaning': 35
    };
    
    // Get base price for service type and car type
    const basePrice = basePrices[this.serviceType]?.[this.carDetails.type] || 0;
    
    // Calculate add-ons total
    let addOnsTotal = 0;
    if (this.addOns && this.addOns.length > 0) {
      addOnsTotal = this.addOns.reduce((total, addOn) => {
        return total + (addOnPrices[addOn] || 0);
      }, 0);
    }
    
    // Set the total price
    this.price = basePrice + addOnsTotal;
  }
  next();
});

// Add index for better query performance
bookingSchema.index({ customerName: 'text', 'carDetails.make': 'text', 'carDetails.model': 'text' });
bookingSchema.index({ date: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ serviceType: 1 });

module.exports = mongoose.model('Booking', bookingSchema);