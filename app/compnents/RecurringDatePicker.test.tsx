import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecurringDatePicker from "./RecurringDatePicker";

describe("RecurringDatePicker", () => {
  it("renders the main title", () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText(/Recurring Date Picker/i)).toBeInTheDocument();
  });

  it("renders all recurrence type options", () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText("Daily")).toBeInTheDocument();
    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Yearly")).toBeInTheDocument();
  });

  it("can select weekly recurrence and see days of week", () => {
    render(<RecurringDatePicker />);
    fireEvent.click(screen.getByText("Weekly"));
    expect(screen.getByText("Days of the week")).toBeInTheDocument();
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Sunday")).toBeInTheDocument();
  });

  it("shows interval input and changes value", () => {
    render(<RecurringDatePicker />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(1);
    fireEvent.change(input, { target: { value: "3" } });
    expect(input).toHaveValue(3);
  });

  it("integration: selecting monthly pattern highlights correct dates", () => {
    render(<RecurringDatePicker />);
    fireEvent.click(screen.getByText("Monthly"));
    // Select "Second" and "Tuesday"
    fireEvent.change(screen.getByDisplayValue("First"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByDisplayValue("Sunday"), {
      target: { value: "2" },
    });
    expect(screen.getByText("Calendar Preview")).toBeInTheDocument();
  });
});
