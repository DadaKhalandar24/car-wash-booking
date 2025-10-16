import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingDetail from './pages/BookingDetail';
import BookingForm from './components/BookingForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/:id" element={<BookingDetail />} />
          <Route path="/add-booking" element={<BookingForm />} />
          <Route path="/edit-booking/:id" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
