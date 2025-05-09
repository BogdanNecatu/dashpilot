"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { User } from "@/entities/user/types";
import { groupUsersByBirthYear } from "./utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

type Props = {
  users: User[];
};

export default function BirthYearLineChart({ users }: Props) {
  const birthYearCounts = groupUsersByBirthYear(users);

  const data = {
    labels: Object.keys(birthYearCounts),
    datasets: [
      {
        label: "Users by Birth Year",
        data: Object.values(birthYearCounts),
        fill: false,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.5)",
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
}
