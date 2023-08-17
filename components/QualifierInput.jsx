function QualifierInput({
  qualified,
  isDisabled,
  isChecked,
  handleChange,
  cardTitle,
}) {
  // console.log(cardTitle);
  return !qualified ? (
    <div className="flex items-center pl-3">
      <input
        disabled={isDisabled}
        id="vue-checkbox-list"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label
        htmlFor="vue-checkbox-list"
        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {cardTitle}
      </label>
    </div>
  ) : (
    <p className="text-center flex items-center pl-3">
      {cardTitle}
      <span className="bg-green-100 text-green-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">
        Qualified
      </span>
    </p>
  );
}

export default QualifierInput;
