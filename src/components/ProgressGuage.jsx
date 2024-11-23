import Chart from 'react-apexcharts';
function ProgressGuage(){
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
            fontSize: '20px',
            color: undefined,
            offsetY: -10,
          },
          value: {
            fontSize: '16px',
            color: '#333',
            offsetY: 5,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Progress'],
  };   
  const series = [70];
    return(
        <>
        <div>
      <Chart options={chartOptions}
        series={series}
        type="radialBar"
        height={300}
        width={400}
        />
    </div>
        </>
    )
}
export default ProgressGuage;