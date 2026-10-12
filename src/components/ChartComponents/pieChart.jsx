import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
function PieChart({ registrationFee, tuitionFee, additionalFees, resitFees }){
    const data = {
        labels: ['Registration Fee', 'Tuition Fee', 'Additional Fees', 'Resit Fees'],
        datasets: [
          {
            label: '',
            data: [ parseInt(registrationFee), parseInt(tuitionFee), parseInt(additionalFees), parseInt(resitFees)],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };
      const options = {
        responsive: true,

        plugins: {
            legend: {
              display: false, 
            },
            title: {
              display: false, 
            },
          },
      };
    
    return(
        <>
         <Pie data={data} options={options} />
        </>
    )
}
export default PieChart