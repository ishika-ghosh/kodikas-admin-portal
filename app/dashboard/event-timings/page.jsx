"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "@components/Modal";
import Loader from "@components/Loader";
import { useRouter } from "next/navigation";
function Timings() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [times, setTimes] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [modalData, setModalData] = useState({
    name: "",
    startTime: new Date(),
    endTime: new Date(),
  });
  const getTimes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/event-times`
      );
      // console.log(data);
      setTimes(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      router.push("/dashboard");
    }
  };
  useEffect(() => {
    getTimes();
  }, []);
  const handleActivateDeactivate = async (id, option) => {
    try {
      let res;
      if (option) {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/event-times/activate`,
          {
            eventId: id,
          }
        );
      } else {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/event-times/disable`,
          {
            eventId: id,
          }
        );
      }
      if (res.data.success) {
        getTimes();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = (id) => {
    setCurrentId(id);
    const timeData = times.find((time) => time._id === id);
    // console.log(timeData);
    setModalData({
      name: timeData.name,
      startTime: timeData.startTime,
      endTime: timeData.endTime,
    });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setCurrentId(null);
    setModalData({
      name: "",
      startTime: new Date(),
      endTime: new Date(),
    });
  };
  const handleUpdate = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/event-times/${currentId}`,
        modalData
      );
      // console.log(data);
      closeModal();
      getTimes();
    } catch (error) {
      console.log(error);
      const {
        response: { data },
      } = error;
      alert(data.message);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="relative h-screen">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Events
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Start Time
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      End Time/deadline
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {times.map((time) => (
                    <TableBody
                      key={time._id}
                      time={time}
                      id={time._id}
                      handleActivateDeactivate={handleActivateDeactivate}
                      openModal={() => openModal(time._id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          closeModal={closeModal}
          modalData={modalData}
          setModalData={setModalData}
          handleUpdate={handleUpdate}
          showInput={true}
        />
      )}
    </div>
  );
}

export default Timings;

export function TableBody({ time, id, handleActivateDeactivate, openModal }) {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={id}>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {time.name}
          </div>
        </div>
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {new Date(time.startTime).toDateString()}
          </div>
        </div>
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="text-sm font-normal text-gray-800 dark:text-gray-400">
          {new Date(time.startTime).toLocaleTimeString()}
        </div>
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {new Date(time.endTime).toDateString()}
          </div>
        </div>
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="text-sm font-normal text-gray-800 dark:text-gray-400">
          {new Date(time.endTime).toLocaleTimeString()}
        </div>
      </td>
      <td className="p-4 space-x-2 whitespace-nowrap">
        <button
          type="button"
          data-modal-toggle="edit-user-modal"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={openModal}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            ></path>
          </svg>
          Edit Times
        </button>
        <button
          type="button"
          data-modal-toggle="edit-user-modal"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={() => handleActivateDeactivate(id, 1)}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            ></path>
          </svg>
          Activate
        </button>
        <button
          type="button"
          data-modal-toggle="delete-user-modal"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
          onClick={() => handleActivateDeactivate(id, 0)}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Disable
        </button>
      </td>
    </tr>
  );
}
