import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);
function LineChart(){
    const data = {
        labels: ['2019-2020', '2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025', '2025-2026'],
        datasets: [
          {
            label: 'Sales',
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56, 55, 100],
          },
        ],
      };
    
      const options = {
        plugins: {
          legend: {
              labels: {
                  font: {
                      size: 6,
                      family:"Poppins, sanserif"
                  }
              }
          }
      },
        scales: {
          x : {
            grid: {
                display: false
            },
            
        }
      },
      maintainAspectRatio: false
      
      }

      return (
        
        <div style={{ height: '90%', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
      );
}

export default LineChart