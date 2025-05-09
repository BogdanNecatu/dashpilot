"use client";

import { useUserStore } from "@/entities/user/store/useUserStore";
import AgeBarChart from "../AgeBarChart/AgeBarChart";
import GenderPieChart from "../GenderPieChart/GenderPieChart";
import BirthYearLineChart from "../BirthYearLineChart/BirthYearLineChart";

export default function DashboardPanel() {
  const users = useUserStore((state) => state.users);

  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500">No user data available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Age Distribution
        </h3>
        <AgeBarChart users={users} />
      </div>

      <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Gender Ratio
        </h3>
        <GenderPieChart users={users} />
      </div>

      <div className="p-4 border rounded shadow bg-white dark:bg-gray-800 col-span-1 md:col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Users by Birth Year
        </h3>
        <BirthYearLineChart users={users} />
      </div>
    </div>
  );
}
