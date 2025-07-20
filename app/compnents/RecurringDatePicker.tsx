"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import RecurrenceOptions from "./RecurrenceOptions";
import CustomizationControls from "./CustomizationControls";
import DateRangePicker from "./DateRangePicker";
import CalendarPreview from "./CalendarPreview";

// Types for recurrence rules and date range
export interface RecurrenceRule {
  type: "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
  daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
  weekOfMonth?: number; // 1-4 = first-fourth, 5 = last
  dayOfWeek?: number; // 0-6 (Sunday-Saturday)
}

export interface DateRange {
  startDate: Date;
  endDate?: Date;
}

// Context type
interface RecurringDatePickerContextType {
  recurrenceRule: RecurrenceRule;
  dateRange: DateRange;
  setRecurrenceRule: (rule: RecurrenceRule) => void;
  setDateRange: (range: DateRange) => void;
  selectedDates: Date[];
}

// Create context
const RecurringDatePickerContext = createContext<
  RecurringDatePickerContextType | undefined
>(undefined);

// Custom hook to use context
export const useRecurringDatePicker = () => {
  const context = useContext(RecurringDatePickerContext);
  if (!context) {
    throw new Error(
      "useRecurringDatePicker must be used within a RecurringDatePickerProvider"
    );
  }
  return context;
};

// Provider component
export const RecurringDatePickerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recurrenceRule, setRecurrenceRule] = useState<RecurrenceRule>({
    type: "daily",
    interval: 1,
  });

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
  });

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Calculate selected dates based on recurrence rule and date range
  React.useEffect(() => {
    const dates = calculateRecurringDates(recurrenceRule, dateRange);
    setSelectedDates(dates);
  }, [recurrenceRule, dateRange]);

  const value: RecurringDatePickerContextType = {
    recurrenceRule,
    dateRange,
    setRecurrenceRule,
    setDateRange,
    selectedDates,
  };

  return (
    <RecurringDatePickerContext.Provider value={value}>
      {children}
    </RecurringDatePickerContext.Provider>
  );
};

// Helper function to calculate recurring dates
function calculateRecurringDates(
  rule: RecurrenceRule,
  range: DateRange
): Date[] {
  const dates: Date[] = [];
  if (!range.startDate) return dates;

  const startDate = new Date(range.startDate);
  const endDate = range.endDate
    ? new Date(range.endDate)
    : new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Default: 30 days

  const currentDate = new Date(startDate);


  while (currentDate <= endDate) {
    let shouldInclude = false;

    switch (rule.type) {
      case "daily":
        shouldInclude = true;
        break;

      case "weekly":
        if (rule.daysOfWeek && rule.daysOfWeek.includes(currentDate.getDay())) {
          shouldInclude = true;
        }
        break;

      case "monthly":
        if (rule.weekOfMonth && rule.dayOfWeek !== undefined) {
          // Advanced pattern: nth weekday of the month
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          let weekdayCount = 0;
          let targetDate = null;

          if (rule.weekOfMonth < 5) {
            // First, Second, Third, Fourth
            for (let d = 1; d <= 31; d++) {
              const date = new Date(year, month, d);
              if (date.getMonth() !== month) break;
              if (date.getDay() === rule.dayOfWeek) {
                weekdayCount++;
                if (weekdayCount === rule.weekOfMonth) {
                  targetDate = date;
                  break;
                }
              }
            }
          } else {
            // Last
            for (let d = 31; d >= 1; d--) {
              const date = new Date(year, month, d);
              if (date.getMonth() !== month) continue;
              if (date.getDay() === rule.dayOfWeek) {
                targetDate = date;
                break;
              }
            }
          }

          if (targetDate && targetDate >= startDate && targetDate <= endDate) {
            dates.push(targetDate);
          }
        } else {
          // Fallback to start date's day logic
          if (currentDate.getDate() === startDate.getDate()) {
            shouldInclude = true;
          }
        }
        break;

      case "yearly":
        // Use the start date's month and day for each year
        const target = new Date(
          currentDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        );
        if (
          target >= startDate &&
          target <= endDate &&
          target.getFullYear() === currentDate.getFullYear()
        ) {
          dates.push(target);
        }
        currentDate.setFullYear(currentDate.getFullYear() + rule.interval);
        continue;
    }

    if (shouldInclude) {
      dates.push(new Date(currentDate));
    }

    // Move to next interval for daily/weekly/monthly
    switch (rule.type) {
      case "daily":
        currentDate.setDate(currentDate.getDate() + rule.interval);
        break;
      case "weekly":
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case "monthly":
        currentDate.setMonth(currentDate.getMonth() + rule.interval);
        break;
    }
  }

  return dates;
}

// Main component
const RecurringDatePicker: React.FC = () => {
  return (
    <RecurringDatePickerProvider>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recurring Date Picker
        </h2>
        <RecurrenceOptions />
        <CustomizationControls />
        <DateRangePicker />
        <CalendarPreview />
      </div>
    </RecurringDatePickerProvider>
  );
};

export default RecurringDatePicker;
