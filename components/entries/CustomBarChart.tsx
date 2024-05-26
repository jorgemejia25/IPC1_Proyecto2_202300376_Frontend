// components/MyLineChart.tsx
"use client";

import { Bar, Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import React from "react";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

interface CustomBarChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ data }) => {
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};
export default CustomBarChart;
