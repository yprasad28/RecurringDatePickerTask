"use client";
import React from "react";
import { useRecurringDatePicker } from "./RecurringDatePicker";

const CustomizationControls: React.FC = () => {
  const { recurrenceRule, setRecurrenceRule } = useRecurringDatePicker();

  const daysOfWeek = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  const handleIntervalChange = (interval: number) => {
    setRecurrenceRule({
      ...recurrenceRule,
      interval: Math.max(1, interval),
    });
  };

  const handleDayOfWeekToggle = (day: number) => {
    const currentDays = recurrenceRule.daysOfWeek || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day].sort();

    setRecurrenceRule({
      ...recurrenceRule,
      daysOfWeek: newDays,
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Customization</h3>

      {/* Interval Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Every {recurrenceRule.interval}{" "}
          {recurrenceRule.type === "daily"
            ? "day(s)"
            : recurrenceRule.type === "weekly"
            ? "week(s)"
            : recurrenceRule.type === "monthly"
            ? "month(s)"
            : "year(s)"}
        </label>
        <input
          type="number"
          min="1"
          max="99"
          value={recurrenceRule.interval}
          onChange={(e) => handleIntervalChange(parseInt(e.target.value) || 1)}
          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Weekly - Days of Week */}
      {recurrenceRule.type === "weekly" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days of the week
          </label>
          <div className="grid grid-cols-2 gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day.value}
                onClick={() => handleDayOfWeekToggle(day.value)}
                className={`p-2 rounded-md text-sm transition-colors ${
                  (recurrenceRule.daysOfWeek || []).includes(day.value)
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Monthly - Advanced Pattern Picker */}
      {recurrenceRule.type === "monthly" && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <select
              value={recurrenceRule.weekOfMonth || 1}
              onChange={(e) =>
                setRecurrenceRule({
                  ...recurrenceRule,
                  weekOfMonth: parseInt(e.target.value, 10),
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value={1}>First</option>
              <option value={2}>Second</option>
              <option value={3}>Third</option>
              <option value={4}>Fourth</option>
              <option value={5}>Last</option>
            </select>
            <select
              value={recurrenceRule.dayOfWeek ?? 0}
              onChange={(e) =>
                setRecurrenceRule({
                  ...recurrenceRule,
                  dayOfWeek: parseInt(e.target.value, 10),
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              {daysOfWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
            <span className="self-center text-sm text-gray-600">
              of the month
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationControls;
