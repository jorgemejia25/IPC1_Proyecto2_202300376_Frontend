"use client";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import { Pie } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Tooltip
);

interface CustomPieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
}: CustomPieChartProps) => {
  // legend
  return (
    <>
      <Pie data={data} />   
    </>
  );
};

export default CustomPieChart;
