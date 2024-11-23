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
function BarChart(){
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',],
        datasets: [
          {
            lable:"Expected Fees",
            backgroundColor: '#A0D3E8',
            borderColor: '#A0D3E8',
            borderWidth: 2,
            borderRadius:10,
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            lable:"Paid Fees",
            backgroundColor: '#FFCCB3',
            borderColor: '#FFCCB3',
            borderWidth: 2,
            borderRadius:10,
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      };
    
      const options = {
        plugins: {
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  font: {
                      size: 14,
                      family:"Poppins, sanserif"
                  }
              }
          }
      },
        scales: {
            y: {
                grid: {
                    display: false
                }
            },
           x:{
              grid: {
                 display: false
              }
           }
        },
        maintainAspectRatio: false
      };

      return (
          <div style={{ width:"100%", height:"98%"}}>
            <Bar data={data} options={options} />
          </div>
      );
}
export default BarChart