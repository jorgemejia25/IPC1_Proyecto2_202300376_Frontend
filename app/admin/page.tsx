"use client";

import {
  CategoryCountResponse,
  getCategoryCount,
} from "@/app/actions/entries/getCategoryCount";
import React, { useEffect, useState } from "react";
import {
  UserCountResponse,
  getTop10Users,
} from "@/app/actions/entries/getTop10Users";

import CustomBarChart from "@/components/entries/CustomBarChart";
import CustomPieChart from "@/components/entries/custom-pie-chart";
import { Entry } from "@/utils/interfaces/entry";
import { getTop5Entries } from "@/app/actions/entries/getTop5Entries";

const DataPage = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [categories, setCategories] = useState<CategoryCountResponse[]>();
  const [users, setUsers] = useState<UserCountResponse[]>();

  useEffect(() => {
    (async () => {
      const responsePosts = await getTop5Entries();
      const responseCategories = await getCategoryCount();
      const responseUsers = await getTop10Users();

      setCategories(responseCategories);
      setEntries(responsePosts);
      setUsers(responseUsers);
    })();
  }, []);

  return (
    <div>
      <h2 className="pt-9 text-4xl text-slate-500 font-semibold">Reportes</h2>
      <h4 className="pt-4 pb-9 text-xl text-slate-400 font-medium">
        Reportes visuales sobre tendencias y resultados.
      </h4>
      <div className="grid grid-cols-2 gap-4 py-6">
        <div>
          <div className="shadow-lg border-gray-300 border-2 p-5 rounded-md flex flex-col items-center justify-center">
            <h3 className="text-center mb-4  text-slate-500">
              <span className="text-2xl font-semibold">Top 5</span> Posts
            </h3>
            <div className="max-w-2xl">
              <CustomPieChart
                data={
                  entries
                    ? {
                        labels: entries.map((entry) => entry.description),
                        datasets: [
                          {
                            data: entries.map((entry) => entry.likes.length),
                            backgroundColor: [
                              "#FF6384",
                              "#36A2EB",
                              "#FFCE56",
                              "#FF6384",
                              "#36A2EB",
                            ],
                          },
                        ],
                      }
                    : { labels: [], datasets: [] }
                }
              />
            </div>
          </div>
        </div>
        <div>
          <div className="shadow-lg border-gray-300 border-2 p-5 rounded-md flex flex-col items-center justify-center">
            <h3 className="text-center mb-4  text-slate-500">
              <span className="text-2xl font-semibold">Más Populares</span>{" "}
              Categorías
            </h3>

            <div className="max-w-2xl">
              <CustomPieChart
                data={
                  categories
                    ? {
                        labels: categories.map((category) => category._id),
                        datasets: [
                          {
                            data: categories.map((category) => category.count),
                            backgroundColor: [
                              "#FF6384",
                              "#36A2EB",
                              "#FFCE56",
                              "#FF6384",
                              "#36A2EB",
                            ],
                          },
                        ],
                      }
                    : { labels: [], datasets: [] }
                }
              />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="shadow-lg border-gray-300 border-2 p-5 rounded-md flex flex-col items-center justify-center">
            <h3 className="text-center mb-4  text-slate-500">
              <span className="text-2xl font-semibold">Usuarios</span> Activos
            </h3>

            <div className="max-w-2xl">
              <CustomBarChart
                data={
                  users
                    ? {
                        labels: users.map((user) => user._id),
                        datasets: [
                          {
                            data: users.map((user) => user.count),
                            backgroundColor: [
                              "#FF6384",
                              "#36A2EB",
                              "#FFCE56",
                              "#FF6384",
                              "#36A2EB",
                            ],
                          },
                        ],
                      }
                    : { labels: [], datasets: [] }
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
