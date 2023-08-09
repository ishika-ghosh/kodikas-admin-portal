"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@components/Loader";
import Image from "next/image";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yearSort, setYearSort] = useState(0);
  const [deptSort, setDeptSort] = useState(0);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const handler = async () => {
      try {
        let sort;
        if (!yearSort && !deptSort) sort = "";
        if (yearSort) sort = yearSort > 0 ? "year" : "-year";
        if (deptSort) sort = deptSort > 0 ? "department" : "-department";
        console.log(sort);
        const {
          data: { data },
        } = await axios.get(`/api/events?search=${search}&sort=${sort}`);
        setTeams(data);
      } catch (error) {
        console.log(error);
      }
    };
    handler();
  }, [yearSort, deptSort, search]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await axios.get(`/api/events`);
        setLoading(false);
        setTeams(data);
        console.log("Data" + teams);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700 ">
        <div className="w-full mb-1">
          <div className="mb-4">

            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              All Teams
            </h1>
          </div>
          <div className="sm:flex">
            <div className="items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
              <div className="lg:pr-3">
                <label htmlFor="teams-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <input
                    type="text"
                    name="email"
                    id="teams-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search for teams"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
              <Link
                href="/dashboard/create-team"
                type="button"
                data-modal-toggle="add-team-modal"
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add Team (if needed)
              </Link>
            </div>
          </div>
        </div>
      </div>
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
                      team
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Team name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Team Leader
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Team Member
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Entry time
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {teams?.map((team) => (
                    <tr
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      key={team._id}
                      onClick={() => { window.location.href = `http://localhost:3000/dashboard/teams/${team._id}`; }}
                    >

                      <td className="flex items-center p-4  space-x-6 whitespace-nowrap">
                        <div className="flex -space-x-4">
                          <Image className="border-2 border-white rounded-full dark:border-gray-800" src={team.team.teamMember.image} width="35" height="35" alt="" />
                          <Image className="border-2 border-white rounded-full dark:border-gray-800" src={team.team.leader.image} width="35" height="35" alt="" />
                        </div>
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          <div className="text-base font-semibold text-gray-900 dark:text-white">
                            {team.team.teamName}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-sm font-normal text-gray-800 dark:text-gray-400">
                          <div class="font-medium dark:text-white">
                            <div>{team.team.leader.name}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{team.team.leader.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-sm font-normal text-gray-800 dark:text-gray-400">
                          <div class="font-medium dark:text-white">
                            <div>{team.team.teamMember.name}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{team.team.teamMember.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-sm font-normal text-gray-800 dark:text-gray-400">
                          {team.createdAt.split("T")[1].split(".")[0]}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teams;
