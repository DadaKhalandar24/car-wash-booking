// // const express = require('express');
// // const { body, validationResult } = require('express-validator');
// // const Booking = require('../models/Booking');
// // const router = express.Router();

// // // Validation rules
// // const bookingValidation = [
// //   body('customerName').notEmpty().withMessage('Customer name is required').trim(),
// //   body('carDetails.make').notEmpty().withMessage('Car make is required'),
// //   body('carDetails.model').notEmpty().withMessage('Car model is required'),
// //   body('carDetails.year').isInt({ min: 1990, max: new Date().getFullYear() + 1 }),
// //   body('carDetails.type').isIn(['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van']),
// //   body('serviceType').isIn(['Basic Wash', 'Deluxe Wash', 'Full Detailing']),
// //   body('date').isISO8601().withMessage('Valid date is required'),
// //   body('timeSlot').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
// //   body('duration').isInt({ min: 15, max: 480 }),
// //   body('status').optional().isIn(['Pending', 'Confirmed', 'Completed', 'Cancelled']),
// //   body('rating').optional().isInt({ min: 1, max: 5 }),
// //   body('addOns').optional().isArray()
// // ];

// // // GET /api/bookings - List all bookings with filters and pagination
// // router.get('/', async (req, res) => {
// //   try {
// //     const {
// //       page = 1,
// //       limit = 8,
// //       serviceType,
// //       carType,
// //       status,
// //       startDate,
// //       endDate,
// //       sortBy = 'date',
// //       sortOrder = 'desc'
// //     } = req.query;

// //     // Build filter object
// //     const filter = {};
// //     if (serviceType) filter.serviceType = serviceType;
// //     if (carType) filter['carDetails.type'] = carType;
// //     if (status) filter.status = status;
    
// //     // Date range filter
// //     if (startDate || endDate) {
// //       filter.date = {};
// //       if (startDate) filter.date.$gte = new Date(startDate);
// //       if (endDate) filter.date.$lte = new Date(endDate);
// //     }

// //     // Calculate pagination
// //     const skip = (page - 1) * limit;
// //     const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

// //     // Execute query
// //     const bookings = await Booking.find(filter)
// //       .sort(sort)
// //       .skip(skip)
// //       .limit(parseInt(limit))
// //       .lean();

// //     const total = await Booking.countDocuments(filter);
// //     const totalPages = Math.ceil(total / limit);

// //     res.json({
// //       success: true,
// //       data: bookings,
// //       pagination: {
// //         page: parseInt(page),
// //         limit: parseInt(limit),
// //         total,
// //         totalPages
// //       }
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: 'Error fetching bookings',
// //       error: error.message
// //     });
// //   }
// // });

// // // GET /api/bookings/search - Search bookings
// // router.get('/search', async (req, res) => {
// //   try {
// //     const { q, page = 1, limit = 8 } = req.query;
    
// //     if (!q) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Search query is required'
// //       });
// //     }

// //     const skip = (page - 1) * limit;
    
// //     const bookings = await Booking.find({
// //       $or: [
// //         { customerName: { $regex: q, $options: 'i' } },
// //         { 'carDetails.make': { $regex: q, $options: 'i' } },
// //         { 'carDetails.model': { $regex: q, $options: 'i' } }
// //       ]
// //     })
// //     .sort({ date: -1 })
// //     .skip(skip)
// //     .limit(parseInt(limit))
// //     .lean();

// //     const total = await Booking.countDocuments({
// //       $or: [
// //         { customerName: { $regex: q, $options: 'i' } },
// //         { 'carDetails.make': { $regex: q, $options: 'i' } },
// //         { 'carDetails.model': { $regex: q, $options: 'i' } }
// //       ]
// //     });

// //     res.json({
// //       success: true,
// //       data: bookings,
// //       pagination: {
// //         page: parseInt(page),
// //         limit: parseInt(limit),
// //         total,
// //         totalPages: Math.ceil(total / limit)
// //       }
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: 'Error searching bookings',
// //       error: error.message
// //     });
// //   }
// // });

// // // GET /api/bookings/:id - Get single booking
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const booking = await Booking.findById(req.params.id);
    
// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Booking not found'
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       data: booking
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: 'Error fetching booking',
// //       error: error.message
// //     });
// //   }
// // });

// // // POST /api/bookings - Create new booking
// // router.post('/', bookingValidation, async (req, res) => {
// //   try {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Validation failed',
// //         errors: errors.array()
// //       });
// //     }

// //     const booking = new Booking(req.body);
// //     await booking.save();

// //     res.status(201).json({
// //       success: true,
// //       message: 'Booking created successfully',
// //       data: booking
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: 'Error creating booking',
// //       error: error.message
// //     });
// //   }
// // });

// // // PUT /api/bookings/:id - Update booking
// // router.put('/:id', bookingValidation, async (req, res) => {
// //   try {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Validation failed',
// //         errors: errors.array()
// //       });
// //     }

// //     const booking = await Booking.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true, runValidators: true }
// //     );

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Booking not found'
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       message: 'Booking updated successfully',
// //       data: booking
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: 'Error updating booking',
// //       error: error.message
// //     });
// //   }
// // });

// // // DELETE /api/bookings/:id - Delete booking
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     const booking = await Booking.findByIdAndDelete(req.params.id);

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Booking not found'
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       message: 'Booking deleted successfully'
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: 'Error deleting booking',
// //       error: error.message
// //     });
// //   }
// // });

// // module.exports = router;



// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const Booking = require('../models/Booking');
// const router = express.Router();

// // Validation rules
// const bookingValidation = [
//   body('customerName').notEmpty().withMessage('Customer name is required').trim().isLength({ max: 100 }),
//   body('carDetails.make').notEmpty().withMessage('Car make is required').trim(),
//   body('carDetails.model').notEmpty().withMessage('Car model is required').trim(),
//   body('carDetails.year').isInt({ min: 1990, max: new Date().getFullYear() + 1 }),
//   body('carDetails.type').isIn(['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van']),
//   body('serviceType').isIn(['Basic Wash', 'Deluxe Wash', 'Full Detailing']),
//   body('date').isISO8601().withMessage('Valid date is required'),
//   body('timeSlot').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
//   body('duration').isInt({ min: 15, max: 480 }),
//   body('status').optional().isIn(['Pending', 'Confirmed', 'Completed', 'Cancelled']),
//   body('rating').optional().isInt({ min: 1, max: 5 }),
//   body('addOns').optional().isArray()
// ];

// // GET /api/bookings - List all bookings with filters and pagination
// router.get('/', async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 8,
//       serviceType,
//       carType,
//       status,
//       startDate,
//       endDate,
//       sortBy = 'date',
//       sortOrder = 'desc'
//     } = req.query;

//     // Build filter object
//     const filter = {};
//     if (serviceType) filter.serviceType = serviceType;
//     if (carType) filter['carDetails.type'] = carType;
//     if (status) filter.status = status;
    
//     // Date range filter
//     if (startDate || endDate) {
//       filter.date = {};
//       if (startDate) filter.date.$gte = new Date(startDate);
//       if (endDate) filter.date.$lte = new Date(endDate);
//     }

//     // Calculate pagination
//     const skip = (page - 1) * parseInt(limit);
//     const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

//     // Execute query
//     const bookings = await Booking.find(filter)
//       .sort(sort)
//       .skip(skip)
//       .limit(parseInt(limit))
//       .lean();

//     const total = await Booking.countDocuments(filter);
//     const totalPages = Math.ceil(total / limit);

//     res.json({
//       success: true,
//       data: bookings,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         totalPages
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching bookings',
//       error: error.message
//     });
//   }
// });

// // GET /api/bookings/search - Search bookings
// router.get('/search', async (req, res) => {
//   try {
//     const { q, page = 1, limit = 8 } = req.query;
    
//     if (!q) {
//       return res.status(400).json({
//         success: false,
//         message: 'Search query is required'
//       });
//     }

//     const skip = (page - 1) * parseInt(limit);
    
//     const bookings = await Booking.find({
//       $or: [
//         { customerName: { $regex: q, $options: 'i' } },
//         { 'carDetails.make': { $regex: q, $options: 'i' } },
//         { 'carDetails.model': { $regex: q, $options: 'i' } }
//       ]
//     })
//     .sort({ date: -1 })
//     .skip(skip)
//     .limit(parseInt(limit))
//     .lean();

//     const total = await Booking.countDocuments({
//       $or: [
//         { customerName: { $regex: q, $options: 'i' } },
//         { 'carDetails.make': { $regex: q, $options: 'i' } },
//         { 'carDetails.model': { $regex: q, $options: 'i' } }
//       ]
//     });

//     res.json({
//       success: true,
//       data: bookings,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         totalPages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     console.error('Error searching bookings:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error searching bookings',
//       error: error.message
//     });
//   }
// });

// // GET /api/bookings/:id - Get single booking
// router.get('/:id', async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
    
//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: 'Booking not found'
//       });
//     }

//     res.json({
//       success: true,
//       data: booking
//     });
//   } catch (error) {
//     console.error('Error fetching booking:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching booking',
//       error: error.message
//     });
//   }
// });

// // POST /api/bookings - Create new booking
// router.post('/', bookingValidation, async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: errors.array()
//       });
//     }

//     const booking = new Booking(req.body);
//     await booking.save();

//     res.status(201).json({
//       success: true,
//       message: 'Booking created successfully',
//       data: booking
//     });
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating booking',
//       error: error.message
//     });
//   }
// });

// // PUT /api/bookings/:id - Update booking
// router.put('/:id', bookingValidation, async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: errors.array()
//       });
//     }

//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: 'Booking not found'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Booking updated successfully',
//       data: booking
//     });
//   } catch (error) {
//     console.error('Error updating booking:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating booking',
//       error: error.message
//     });
//   }
// });

// // DELETE /api/bookings/:id - Delete booking
// router.delete('/:id', async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndDelete(req.params.id);

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: 'Booking not found'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Booking deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting booking:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting booking',
//       error: error.message
//     });
//   }
// });

// module.exports = router;



const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const router = express.Router();

// Price calculation function
const calculatePrice = (serviceType, carType, addOns = []) => {
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
  
  const basePrice = basePrices[serviceType]?.[carType] || 0;
  const addOnsTotal = addOns.reduce((total, addOn) => {
    return total + (addOnPrices[addOn] || 0);
  }, 0);
  
  return basePrice + addOnsTotal;
};

// Validation rules
const bookingValidation = [
  body('customerName').notEmpty().withMessage('Customer name is required').trim().isLength({ max: 100 }),
  body('carDetails.make').notEmpty().withMessage('Car make is required').trim(),
  body('carDetails.model').notEmpty().withMessage('Car model is required').trim(),
  body('carDetails.year').isInt({ min: 1990, max: new Date().getFullYear() + 1 }),
  body('carDetails.type').isIn(['sedan', 'suv', 'hatchback', 'luxury', 'truck', 'van']),
  body('serviceType').isIn(['Basic Wash', 'Deluxe Wash', 'Full Detailing']),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('timeSlot').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('duration').isInt({ min: 15, max: 480 }),
  body('status').optional().isIn(['Pending', 'Confirmed', 'Completed', 'Cancelled']),
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('addOns').optional().isArray()
];

// POST /api/bookings - Create new booking
router.post('/', bookingValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Calculate price before creating booking
    const { serviceType, carDetails, addOns = [] } = req.body;
    const calculatedPrice = calculatePrice(serviceType, carDetails.type, addOns);
    
    const bookingData = {
      ...req.body,
      price: calculatedPrice
    };

    const booking = new Booking(bookingData);
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// PUT /api/bookings/:id - Update booking
router.put('/:id', bookingValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Calculate price if serviceType, carType, or addOns are being updated
    const { serviceType, carDetails, addOns = [] } = req.body;
    const calculatedPrice = calculatePrice(serviceType, carDetails.type, addOns);
    
    const updateData = {
      ...req.body,
      price: calculatedPrice
    };

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: error.message
    });
  }
});

// GET /api/bookings - List all bookings with filters and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 8,
      serviceType,
      carType,
      status,
      startDate,
      endDate,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (serviceType) filter.serviceType = serviceType;
    if (carType) filter['carDetails.type'] = carType;
    if (status) filter.status = status;
    
    // Date range filter
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Calculate pagination
    const skip = (page - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    // Execute query
    const bookings = await Booking.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// GET /api/bookings/search - Search bookings
router.get('/search', async (req, res) => {
  try {
    const { q, page = 1, limit = 8 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const skip = (page - 1) * parseInt(limit);
    
    const bookings = await Booking.find({
      $or: [
        { customerName: { $regex: q, $options: 'i' } },
        { 'carDetails.make': { $regex: q, $options: 'i' } },
        { 'carDetails.model': { $regex: q, $options: 'i' } }
      ]
    })
    .sort({ date: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

    const total = await Booking.countDocuments({
      $or: [
        { customerName: { $regex: q, $options: 'i' } },
        { 'carDetails.make': { $regex: q, $options: 'i' } },
        { 'carDetails.model': { $regex: q, $options: 'i' } }
      ]
    });

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error searching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching bookings',
      error: error.message
    });
  }
});

// GET /api/bookings/:id - Get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
});

// DELETE /api/bookings/:id - Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message
    });
  }
});

module.exports = router;