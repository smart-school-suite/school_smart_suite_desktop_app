import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'My Dataset',
        data: [12, 19, 8, 10, 11, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',   
          'rgba(54, 162, 235, 0.8)',   
          'rgba(255, 206, 86, 0.8)',   
          'rgba(75, 192, 192, 0.8)',   
          'rgba(153, 102, 255, 0.8)',  
          'rgba(255, 159, 64, 0.8)'    
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
        borderRadius: 2, 
        spacing: 5
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        display:false
      },
      title: {
        display: false,
        text: 'Styled Doughnut Chart'
      }
    },
    cutout: '70%',
  };
  const styles = {
     width:"100%",
     height:"75%",
     display:"flex",
     flexDirection:"row",
     alignItems:"center",
     justifyContent:"center",
  }
  return (
     <div style={styles}>
        <Doughnut data={data} options={options} />
     </div>
  );
};

export default DoughnutChart;