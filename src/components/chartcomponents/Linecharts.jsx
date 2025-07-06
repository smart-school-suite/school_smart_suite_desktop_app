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
function LineChart({ config }){
    const data = {
        labels: config.label,
        datasets: [
          {
            label: 'Sales',
            fill: true,
            backgroundColor: config.bgColor,
            borderColor: config.borderColor,
            borderWidth: 1,
            data: config.data,
            tension:0.5,
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
      x: {
        // --- Remove X-axis line/border ---
        border: {
          display: false, // Removes the axis line itself
        },
        // --- Remove X-axis grid lines ---
        grid: {
          display: false, // Removes vertical grid lines
          drawBorder: false, // Ensures no border is drawn for the grid
        },
        // --- Remove X-axis tick marks ---
        ticks: {
          display: true, // Keep labels visible
          color: '#666', // Adjust label color
          drawTicks: false, // Removes the small tick lines
          drawOnChartArea: false, // Ensures ticks are not drawn on the chart area
           font: {
            family: 'Poppins, sans-serif', // Apply Poppins font to x-axis ticks
          },
        },
      },
      y: {
        // --- Remove Y-axis line/border ---
        border: {
          display: false, // Removes the axis line itself
        },
        // --- Remove Y-axis grid lines ---
        grid: {
          display: false, // Removes horizontal grid lines
          drawBorder: false, // Ensures no border is drawn for the grid
        },
        // --- Remove Y-axis tick marks ---
        ticks: {
          display: true, // Keep labels visible
          color: '#666', // Adjust label color
          drawTicks: false, // Removes the small tick lines
          drawOnChartArea: false, // Ensures ticks are not drawn on the chart area
          // --- Custom callback for formatting large numbers ---
          callback: function(value, index, values) {
            if (value >= 1000000000) {
              return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
            }
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
            }
            if (value >= 1000) {
              return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
            }
            return value;
          },
          font: {
            family: 'Poppins, sans-serif', // Apply Poppins font to x-axis ticks
          },
        },
      },
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