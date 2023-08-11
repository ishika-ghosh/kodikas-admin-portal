function ConfirmationModal({ modalData, handleSubmit, handleCancel }) {
  return (
    <div
      id="staticModal"
      data-modal-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-2 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-1/4 max-h-full responsive-width">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure to qualify the team {modalData?.team} for{" "}
              {modalData?.event}?
            </p>
          </div>

          <div className="flex items-center p-6 space-x-2  dark:border-gray-600">
            <button
              data-modal-hide="staticModal"
              type="button"
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sure!!
            </button>
            <button
              data-modal-hide="staticModal"
              type="button"
              onClick={handleCancel}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
