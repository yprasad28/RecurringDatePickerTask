# Recurring Date Picker

A modern, reusable React component for selecting recurring dates—supporting advanced patterns like “the second Tuesday of every month.”

**Live Demo:**  
[Try it on CodeSandbox](https://codesandbox.io/p/github/yprasad28/RecurringDatePickerTask/main?workspaceId=ws_HvLqDZhsmf9j9mSeoyNn1P)

---

## ✨ Features

- **Recurrence Types:** Daily, Weekly, Monthly, Yearly
- **Advanced Patterns:**  
  - Every X days/weeks/months/years  
  - Select specific days of the week  
  - Patterns like “the second Tuesday of every month” or “the last Friday of every month”
- **Date Range:**  
  - Select a start date  
  - Optional end date
- **Mini Calendar Preview:**  
  - Instantly see all selected recurring dates
- **Responsive UI:**  
  - Built with Tailwind CSS for a clean, modern look
- **State Management:**  
  - Uses React Context for scalable, maintainable state
- **Tested:**  
  - Includes unit and integration tests with Jest and React Testing Library

---

## 🚀 Live Demo

[Open the Recurring Date Picker on CodeSandbox](https://codesandbox.io/p/github/yprasad28/RecurringDatePickerTask/main?workspaceId=ws_HvLqDZhsmf9j9mSeoyNn1P)

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yprasad28/RecurringDatePickerTask.git
   cd RecurringDatePickerTask
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   or for Create React App:
   ```bash
   npm start
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

---

## 🏗️ Project Structure

```
components/
  ├── RecurringDatePicker.tsx      # Main context and logic
  ├── CustomizationControls.tsx    # UI for recurrence patterns
  ├── RecurrenceOptions.tsx        # Daily/Weekly/Monthly/Yearly selector
  ├── DateRangePicker.tsx          # Start/end date selection
  ├── CalendarPreview.tsx          # Calendar visualization
  └── RecurringDatePicker.test.tsx # Tests
```

---

## 🧑‍💻 Usage

Import and use the component in your app:

```tsx
import RecurringDatePicker from "./components/RecurringDatePicker";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <RecurringDatePicker />
      </div>
    </div>
  );
}
```

---

## 🧠 How It Works

- **Context-Driven:** All recurrence logic and state are managed via React Context, making the component easy to use and extend.
- **Pattern Support:** Advanced monthly patterns are supported (e.g., “the second Tuesday of every month”) using dropdowns for week and weekday.
- **Real-Time Preview:** The calendar updates instantly as you change options, so you always know which dates are selected.

---

## 🧪 Testing

- Tests are written with Jest and React Testing Library.
- To run all tests:
  ```bash
  npm test
  ```

---

## 📄 License

MIT

---


**Live Demo:**  
[https://codesandbox.io/p/github/yprasad28/RecurringDatePickerTask/main?workspaceId=ws_HvLqDZhsmf9j9mSeoyNn1P](https://codesandbox.io/p/github/yprasad28/RecurringDatePickerTask/main?workspaceId=ws_HvLqDZhsmf9j9mSeoyNn1P)


