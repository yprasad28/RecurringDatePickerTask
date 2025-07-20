"use client";
import React from "react";
import { useRecurringDatePicker } from "./RecurringDatePicker";

const RecurrenceOptions: React.FC = () => {
  const { recurrenceRule, setRecurrenceRule } = useRecurringDatePicker();

  const recurrenceTypes = [
    { value: "daily", label: "Daily", description: "Every day" },
    { value: "weekly", label: "Weekly", description: "Every week" },
    { value: "monthly", label: "Monthly", description: "Every month" },
    { value: "yearly", label: "Yearly", description: "Every year" },
  ] as const;

  const handleTypeChange = (
    type: "daily" | "weekly" | "monthly" | "yearly"
  ) => {
    setRecurrenceRule({
      ...recurrenceRule,
      type,
      // Reset daysOfWeek only for weekly, otherwise remove it
      daysOfWeek: type === "weekly" ? [0] : undefined,
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recurrence Type
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {recurrenceTypes.map((option) => (
          <button
            key={option.value}
            onClick={() => handleTypeChange(option.value)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              recurrenceRule.type === option.value
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="font-medium">{option.label}</div>
            <div className="text-sm text-gray-500">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
