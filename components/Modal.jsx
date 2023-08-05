import CommonDateTimePicker from "./CommonDateTimePicker";

export function Modal({ closeModal, modalData, setModalData, handleUpdate }) {
  return (
    <div
      className="absolute z-50 h-screen items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0 h-modal sm:h-full"
      id="delete-user-modal"
    >
      <div className="relative w-full max-w-md px-4 modal-position md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
              data-modal-toggle="delete-user-modal"
              onClick={closeModal}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="p-6 pt-0 text-center">
            <label
              htmlFor="event-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
            >
              Event Name
            </label>
            <input
              name="event-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={modalData.name}
              onChange={(e) =>
                setModalData({ ...modalData, name: e.target.value })
              }
            />
            <CommonDateTimePicker
              name="start-Time"
              value={modalData.startTime}
              onChange={(value) =>
                setModalData({ ...modalData, startTime: value })
              }
            />
            <CommonDateTimePicker
              name="end-time"
              value={modalData.endTime}
              onChange={(value) =>
                setModalData({ ...modalData, endTime: value })
              }
            />
            <button
              onClick={handleUpdate}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
