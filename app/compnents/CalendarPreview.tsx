"use client";
import React, { useState } from "react";
import { useRecurringDatePicker } from "./RecurringDatePicker";

const CalendarPreview: React.FC = () => {
  const { selectedDates, dateRange } = useRecurringDatePicker();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isDateInRange = (date: Date): boolean => {
    return (
      date >= dateRange.startDate &&
      (!dateRange.endDate || date <= dateRange.endDate)
    );
  };

  const isSelectedDate = (date: Date): boolean => {
    return selectedDates.some((selectedDate) => isSameDay(selectedDate, date));
  };

  const getCalendarDays = (): (Date | null)[] => {
    const days: (Date | null)[] = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      );
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Calendar Preview
      </h3>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          ←
        </button>
        <h4 className="text-lg font-semibold">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h4>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg overflow-hidden border">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 bg-gray-100">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {getCalendarDays().map((date, index) => (
            <div
              key={index}
              className={`p-2 text-center text-sm border-r border-b border-gray-200 min-h-[40px] flex items-center justify-center ${
                !date
                  ? "bg-gray-50"
                  : !isDateInRange(date)
                  ? "bg-gray-100 text-gray-400"
                  : isSelectedDate(date)
                  ? "bg-blue-500 text-white font-medium"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {date ? date.getDate() : ""}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span>Out of range</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarPreview;
