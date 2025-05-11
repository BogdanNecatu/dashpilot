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
import { groupUsersByWeightRange } from "./utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  users: User[];
};

export default function WeightDistributionChart({ users }: Props) {
  const grouped = groupUsersByWeightRange(users);

  const data = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Users per weight range",
        data: Object.values(grouped),
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

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow">
      <Bar data={data} options={options} />
    </div>
  );
}
