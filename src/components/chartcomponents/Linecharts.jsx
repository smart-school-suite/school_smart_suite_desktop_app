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
        labels: ['19-20', '20-21', '21-22', '22-23', '23-24', '24-25', '25-26'],
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