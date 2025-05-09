"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { User } from "@/entities/user/types";
import { groupUsersByAgeRange } from "./utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  users: User[];
};

export default function AgeBarChart({ users }: Props) {
  const ageGroups = groupUsersByAgeRange(users);

  const data = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: "Users",
        data: Object.values(ageGroups),
        backgroundColor: "rgba(59,130,246,0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
}
