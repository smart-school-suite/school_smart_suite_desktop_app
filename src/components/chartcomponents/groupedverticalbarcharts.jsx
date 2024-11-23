import Chart from 'react-apexcharts';

const GroupedGaugeVerticalBarChart = () => {
    const gaugeData = [
        { name: 'Gauge 1', value: 75 },
        { name: 'Gauge 2', value: 60 },
        { name: 'Gauge 3', value: 90 },
    ];

    const barChartOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        xaxis: {
            categories: ['Category 1', 'Category 2', 'Category 3'],
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        fill: {
            colors: ['#FF4560'],
        },
    };

    const barChartSeries = [
        {
            name: 'Series 1',
            data: [40, 70, 30],
        },
        {
            name: 'Series 2',
            data: [30, 50, 80],
        },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px', width: '100%' }}>
                {gaugeData.map((gauge, index) => (
                    <div key={index} style={{ width: '200px', height: '200px' }}>
                        <Chart 
                            options={{
                                chart: {
                                    type: 'radialBar',
                                    height: '100%',
                                    offsetY: 0,
                                },
                                plotOptions: {
                                    radialBar: {
                                        startAngle: -135,
                                        endAngle: 135,
                                        hollow: {
                                            margin: 0,
                                            size: '70%',
                                        },
                                        dataLabels: {
                                            name: {
                                                fontSize: '22px',
                                            },
                                            value: {
                                                fontSize: '16px',
                                                offsetY: 10,
                                            },
                                        },
                                    },
                                },
                                fill: {
                                    colors: ['#FF4560'],
                                },
                            }} 
                            series={[gauge.value]} 
                            type="radialBar" 
                            height="100%" 
                        />
                        <h3>{gauge.name}</h3>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px', width: '100%' }}>
                <Chart 
                    options={barChartOptions} 
                    series={barChartSeries} 
                    type="bar" 
                    height={350} 
                />
            </div>
        </div>
    );
};

export default GroupedGaugeVerticalBarChart;