import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, Filler);

const AreaChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Tuition Fees Paid ($)',
        data: [2000, 2500, 2200, 2800, 3000, 3500, 4000],
        fill: true, // This makes it an area chart
        backgroundColor: 'rgba(75, 192, 192, 0.3)', // Fill color with transparency
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        tension: 0.4, // Smooth curve
        pointRadius: 4,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Tuition Fees Over Time (Area Chart)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '700px', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChart;