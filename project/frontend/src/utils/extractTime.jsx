import React from 'react';
import "../index.css";

export function extractTime(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return "Invalid Date";
  }
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}

const TimeDisplay = ({ time }) => {
  return <div className="time-display">{time}</div>;
};

export default TimeDisplay;
