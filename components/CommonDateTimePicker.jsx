import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function CommonDateTimePicker({ name, value, onChange }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        {name}
      </label>
      <DateTimePicker
        name={name}
        onChange={onChange}
        value={value}
        autoFocus={true}
        clearIcon={null}
        dayPlaceholder="dd"
        format="dd-MMM-y h:mm a"
        hourPlaceholder="hh"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-2"
      />
    </div>
  );
}

export default CommonDateTimePicker;
