"use client";
import Loader from "@components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
function TeamDetails({ params }) {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timings, setTimigs] = useState([]);
  const getTeamDetails = async () => {
    const { teamId } = params;
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/teams/${teamId}`);
      const { data: timeData } = await axios.get("/api/event-times");
      console.log(timeData);
      console.log(data);
      setLoading(false);
      if (!data) {
        router.push("/404");
      }
      setDetails(data);
      setTimigs(timeData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeamDetails();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="container my-10 mx-auto md:px-6">
      <section className="mb-32 text-center lg:text-left">
        <h2 className="mb-12 text-center text-xl font-bold">
          Meet the Team{" "}
          <u className="text-primary dark:text-primary-400">
            {details?.team?.teamName.toUpperCase()}
          </u>
        </h2>

        <div className="grid gap-6 md:grid-cols-3 xl:gap-x-12">
          <div className="mb-6 lg:mb-0">
            <div className="relative block rounded-lg p-6 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex-row items-center lg:flex">
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-5/12 lg:pr-6">
                  <img
                    src={details?.team.leader.image}
                    alt="Trendy Pants and Shoes"
                    className="mb-6 w-full rounded-md lg:mb-0"
                  />
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                  <h5 className="mb-2 text-lg font-bold">
                    {details?.team.leader.name}
                    <span className="bg-green-100 text-green-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">
                      Leader
                    </span>
                  </h5>
                  <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                    {details?.team.leader.email}
                  </p>
                  <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                    {details?.team.leader.department}{" "}
                    {details?.team.leader.year}
                  </p>
                  <ul className="mx-auto flex list-inside justify-center lg:justify-start"></ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 lg:mb-0">
            <div className="relative block rounded-lg p-6 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex-row items-center lg:flex">
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-5/12 lg:pr-6">
                  <img
                    src={details?.team.teamMember.image}
                    alt="Trendy Pants and Shoes"
                    className="mb-6 w-full rounded-md lg:mb-0"
                  />
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                  <h5 className="mb-2 text-lg font-bold">
                    {details?.team.teamMember.name}
                  </h5>
                  <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                    {details?.team.teamMember.email}
                  </p>
                  <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                    {details?.team.teamMember.department}{" "}
                    {details?.team.teamMember.year}
                  </p>
                  <ul className="mx-auto flex list-inside justify-center lg:justify-start"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10">
          <p>
            Payment Status:{" "}
            {details?.team?.payment ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">
                Completed
              </span>
            ) : (
              <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-purple-100 dark:bg-gray-700 dark:border-purple-500 dark:text-purple-400">
                Due
              </span>
            )}
          </p>
          <ul className="my-10 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              {!details?.first ? (
                <div className="flex items-center pl-3">
                  <input
                    disabled={!checkTime(timings, "First Round")}
                    id="vue-checkbox-list"
                    type="checkbox"
                    value={details?.first}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="vue-checkbox-list"
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    First Round
                  </label>
                </div>
              ) : (
                <p className="flex items-center pl-3">
                  First Round{" "}
                  <span className="bg-green-100 text-green-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">
                    Qualified
                  </span>
                </p>
              )}
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  disabled={!checkTime(timings, "2nd Round")}
                  id="react-checkbox-list"
                  type="checkbox"
                  value={details?.second}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="react-checkbox-list"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Second Round
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  disabled={!checkTime(timings, "3rd Round")}
                  id="angular-checkbox-list"
                  type="checkbox"
                  value={details?.third}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="angular-checkbox-list"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Final Round
                </label>
              </div>
            </li>
            <li className="w-full dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  disabled={!checkTime(timings, "Lunch")}
                  id="laravel-checkbox-list"
                  type="checkbox"
                  value={details?.lunch}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="laravel-checkbox-list"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lunch
                </label>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default TeamDetails;

const checkTime = (times, time) => {
  let flag = false;
  times?.forEach((ele) => {
    if (ele.name === time) {
      console.log(ele.name);
      const today = new Date();
      console.log(
        today >= new Date(ele.startTime) && today < new Date(ele.endTime)
      );
      flag = today >= new Date(ele.startTime) && today < new Date(ele.endTime);
    }
  });
  return flag;
};
