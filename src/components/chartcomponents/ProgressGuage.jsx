import Chart from 'react-apexcharts';
function ProgressGuage({ progress }){
  const chartOptions = {
    chart: {
      type: 'radialBar',
    },
    colors: ['#7DD4FC'],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 15,
          size: '60%',
          background: 'transparent',
        },
        track: {
          background: '#E0F2FE',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            fontSize: '14px',
            color: undefined,
            offsetY: -10,
          },
          value: {
            fontSize: '16px',
            formatter: function (val) {
              return `${progress}%`; // Display percentage
            },
            color: '#333',
            offsetY: 5,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        gradientToColors: ['#FF4560'],
        stops: [0, 100], 
      },
      opacity: 1,
    },
    stroke: {
      lineCap: 'round',
    },
  };   
  const series = [progress];
    return(
        <>
        <div>
      <Chart options={chartOptions}
        series={series}
        type="radialBar"
        height={250}
        width={400}
        />
    </div>
        </>
    )
}
export default ProgressGuage;