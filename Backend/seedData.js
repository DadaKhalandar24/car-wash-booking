const mongoose = require('mongoose');
const Booking = require('./models/Booking');

// Price calculation function (same as in routes)
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

const sampleBookings = [
  {
    customerName: "John Smith",
    carDetails: {
      make: "Toyota",
      model: "Camry",
      year: 2020,
      type: "sedan"
    },
    serviceType: "Basic Wash",
    date: new Date('2024-01-15'),
    timeSlot: "10:00",
    duration: 30,
    status: "Completed",
    rating: 5,
    addOns: ["Interior Cleaning"],
    price: calculatePrice("Basic Wash", "sedan", ["Interior Cleaning"]) // 25 + 25 = 50
  },
  {
    customerName: "Sarah Johnson",
    carDetails: {
      make: "BMW",
      model: "X5",
      year: 2022,
      type: "luxury"
    },
    serviceType: "Full Detailing",
    date: new Date('2024-01-20'),
    timeSlot: "14:00",
    duration: 120,
    status: "Confirmed",
    addOns: ["Polishing", "Waxing"],
    price: calculatePrice("Full Detailing", "luxury", ["Polishing", "Waxing"]) // 200 + 30 + 40 = 270
  },
  {
    customerName: "Mike Davis",
    carDetails: {
      make: "Honda",
      model: "CR-V",
      year: 2019,
      type: "suv"
    },
    serviceType: "Deluxe Wash",
    date: new Date('2024-01-25'),
    timeSlot: "11:00",
    duration: 45,
    status: "Pending",
    addOns: ["Odor Removal"],
    price: calculatePrice("Deluxe Wash", "suv", ["Odor Removal"]) // 55 + 20 = 75
  },
  {
    customerName: "Emily Wilson",
    carDetails: {
      make: "Ford",
      model: "Focus",
      year: 2021,
      type: "hatchback"
    },
    serviceType: "Basic Wash",
    date: new Date('2024-01-18'),
    timeSlot: "09:00",
    duration: 30,
    status: "Completed",
    rating: 4,
    addOns: [],
    price: calculatePrice("Basic Wash", "hatchback", []) // 20
  },
  {
    customerName: "Robert Brown",
    carDetails: {
      make: "Chevrolet",
      model: "Silverado",
      year: 2020,
      type: "truck"
    },
    serviceType: "Deluxe Wash",
    date: new Date('2024-01-22'),
    timeSlot: "13:00",
    duration: 60,
    status: "Cancelled",
    addOns: ["Engine Cleaning"],
    price: calculatePrice("Deluxe Wash", "truck", ["Engine Cleaning"]) // 65 + 35 = 100
  },
  {
    customerName: "Lisa Anderson",
    carDetails: {
      make: "Mercedes",
      model: "E-Class",
      year: 2023,
      type: "luxury"
    },
    serviceType: "Full Detailing",
    date: new Date('2024-01-30'),
    timeSlot: "15:00",
    duration: 180,
    status: "Confirmed",
    addOns: ["Polishing", "Waxing", "Interior Cleaning"],
    price: calculatePrice("Full Detailing", "luxury", ["Polishing", "Waxing", "Interior Cleaning"]) // 200 + 30 + 40 + 25 = 295
  },
  {
    customerName: "David Miller",
    carDetails: {
      make: "Toyota",
      model: "RAV4",
      year: 2021,
      type: "suv"
    },
    serviceType: "Basic Wash",
    date: new Date('2024-01-17'),
    timeSlot: "16:00",
    duration: 30,
    status: "Completed",
    rating: 3,
    addOns: [],
    price: calculatePrice("Basic Wash", "suv", []) // 35
  },
  {
    customerName: "Jennifer Taylor",
    carDetails: {
      make: "Volkswagen",
      model: "Golf",
      year: 2022,
      type: "hatchback"
    },
    serviceType: "Deluxe Wash",
    date: new Date('2024-01-28'),
    timeSlot: "10:00",
    duration: 45,
    status: "Pending",
    addOns: [],
    price: calculatePrice("Deluxe Wash", "hatchback", []) // 40
  },
  {
    customerName: "Michael Clark",
    carDetails: {
      make: "Ford",
      model: "Transit",
      year: 2020,
      type: "van"
    },
    serviceType: "Full Detailing",
    date: new Date('2024-02-01'),
    timeSlot: "11:00",
    duration: 150,
    status: "Confirmed",
    addOns: ["Interior Cleaning", "Odor Removal"],
    price: calculatePrice("Full Detailing", "van", ["Interior Cleaning", "Odor Removal"]) // 190 + 25 + 20 = 235
  },
  {
    customerName: "Amanda White",
    carDetails: {
      make: "Audi",
      model: "A4",
      year: 2023,
      type: "luxury"
    },
    serviceType: "Deluxe Wash",
    date: new Date('2024-02-05'),
    timeSlot: "14:00",
    duration: 60,
    status: "Pending",
    addOns: ["Waxing"],
    price: calculatePrice("Deluxe Wash", "luxury", ["Waxing"]) // 75 + 40 = 115
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/carwash');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Booking.deleteMany({});
    console.log('Cleared existing bookings');

    // Insert sample data
    await Booking.insertMany(sampleBookings);
    console.log('Sample bookings inserted successfully');
    console.log(`Inserted ${sampleBookings.length} sample bookings`);

    // Display the inserted bookings with their calculated prices
    const insertedBookings = await Booking.find().sort({ date: 1 });
    console.log('\nInserted Bookings:');
    insertedBookings.forEach(booking => {
      console.log(`- ${booking.customerName}: ${booking.serviceType} for ${booking.carDetails.make} ${booking.carDetails.model} (${booking.carDetails.type}) - $${booking.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();