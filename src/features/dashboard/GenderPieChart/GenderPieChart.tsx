"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { User } from "@/entities/user/types";
import { groupUsersByGender } from "./utils";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  users: User[];
};

export default function GenderPieChart({ users }: Props) {
  const genderCounts = groupUsersByGender(users);

  const data = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        label: "Users",
        data: Object.values(genderCounts),
        backgroundColor: [
          "rgba(59,130,246,0.7)", // blue
          "rgba(234,88,12,0.7)", // orange
          "rgba(139,92,246,0.7)", // violet
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#000",
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}
