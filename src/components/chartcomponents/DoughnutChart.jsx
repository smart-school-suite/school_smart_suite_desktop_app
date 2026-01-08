import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ labels, compData, label }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: compData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(199, 199, 199, 0.8)",
          "rgba(255, 99, 255, 0.8)",
          "rgba(0, 204, 102, 0.8)",
          "rgba(144, 238, 144, 0.8)",
          "rgba(255, 105, 180, 0.8)",
          "rgba(0, 0, 128, 0.8)",
          "rgba(210, 105, 30, 0.8)",
          "rgba(128, 0, 128, 0.8)",
          "rgba(0, 128, 128, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(255, 99, 255, 1)",
          "rgba(0, 204, 102, 1)",
          "rgba(144, 238, 144, 1)",
          "rgba(255, 105, 180, 1)",
          "rgba(0, 0, 128, 1)",
          "rgba(210, 105, 30, 1)",
          "rgba(128, 0, 128, 1)",
          "rgba(0, 128, 128, 1)",
        ],
        borderWidth: 2,
        borderRadius: 2,
        spacing: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Styled Doughnut Chart",
      },
    },
    cutout: "70%",
  };
  const styles = {
    width: "100%",
    height: "75%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={styles}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
