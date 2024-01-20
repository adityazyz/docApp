// App.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DocCard from '../../components/DocCard'; 
import DoctorProfile from '../../components/DoctorProfile';

// import './App.css'; // Your Tailwind CSS styles

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

const Testing = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <>
    <DoctorProfile/>
    {/* <DocCard/>  */}
    </>
    // <div className="flex justify-around m-4">
    //   <div className="w-1/3">
    //     <Calendar onChange={handleDateChange} value={date} />
    //   </div>
    //   <div className="w-1/3">
    //     <div className="space-y-2">
    //       <h2 className="text-lg font-semibold">Available Time Slots</h2>
    //       {timeSlots.map((time) => (
    //         <div
    //           key={time}
    //           className={`p-2 cursor-pointer border ${
    //             selectedTime === time ? 'bg-green-500 text-white' : 'bg-white'
    //           }`}
    //           onClick={() => handleTimeSelect(time)}
    //         >
    //           {time}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="w-1/3">
    //     <div className="space-y-2">
    //       <h2 className="text-lg font-semibold">Appointment Details</h2>
    //       {selectedTime && (
    //         <p>
    //           You have selected {selectedTime} on {date.toDateString()} for your appointment.
    //         </p>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Testing;
