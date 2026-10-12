import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Register the required components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
function BarChart({ config }){
    const data = {
        labels: config.labels,
        datasets: [
          {
            lables:"Expected Fees",
            backgroundColor: config.backgroundColor,
            borderColor: config.borderColor,
            borderWidth: 2,
            borderRadius:10,
            data: config.data,
          }
        ],
      };
    
      const options = {
        plugins: {
          legend: {
              display:false
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
      };

      return (
          <div style={{ width:"100%", height:"80%"}}>
            <Bar data={data} options={options} />
          </div>
      );
}
export default BarChart