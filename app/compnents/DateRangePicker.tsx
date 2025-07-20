"use client";
import React from "react";
import { useRecurringDatePicker } from "./RecurringDatePicker";

const DateRangePicker: React.FC = () => {
  const { dateRange, setDateRange } = useRecurringDatePicker();

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const handleStartDateChange = (dateString: string) => {
    const newStartDate = new Date(dateString);
    setDateRange({
      ...dateRange,
      startDate: newStartDate,
    });
  };

  const handleEndDateChange = (dateString: string) => {
    if (dateString) {
      const newEndDate = new Date(dateString);
      setDateRange({
        ...dateRange,
        endDate: newEndDate,
      });
    } else {
      setDateRange({
        ...dateRange,
        endDate: undefined,
      });
    }
  };

  const handleNoEndDate = () => {
    setDateRange({
      ...dateRange,
      endDate: undefined,
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Date Range</h3>

      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start Date *
        </label>
        <input
          type="date"
          value={formatDateForInput(dateRange.startDate)}
          onChange={(e) => handleStartDateChange(e.target.value)}
          min={formatDateForInput(new Date())}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          End Date (Optional)
        </label>
        <div className="space-y-2">
          <input
            type="date"
            value={
              dateRange.endDate ? formatDateForInput(dateRange.endDate) : ""
            }
            onChange={(e) => handleEndDateChange(e.target.value)}
            min={formatDateForInput(dateRange.startDate)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Select end date"
          />

          <button
            onClick={handleNoEndDate}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            No end date (repeats indefinitely)
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 rounded-md p-3">
        <p className="text-sm text-blue-800">
          <strong>Summary:</strong> Starting from{" "}
          {dateRange.startDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {dateRange.endDate && (
            <>
              {" "}
              until{" "}
              {dateRange.endDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </>
          )}
          {!dateRange.endDate && " (no end date)"}
        </p>
      </div>
    </div>
  );
};

export default DateRangePicker;
