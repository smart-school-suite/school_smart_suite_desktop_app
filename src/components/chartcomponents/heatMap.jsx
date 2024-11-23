import React from 'react';
import Chart from 'react-apexcharts';

// Function to generate random data
const generateData = (length, { min, max }) => {
    const data = [];
    for (let i = 0; i < length; i++) {
        data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
};

// HeatMap component
const HeatMap = () => {
    // Prepare the data for the chart
    const options = {
        series: [
            { name: 'Metric1', data: generateData(12, { min: 0, max: 90 }) },
            { name: 'Metric2', data: generateData(12, { min: 0, max: 90 }) },
            { name: 'Metric3', data: generateData(12, { min: 0, max: 90 }) },
            { name: 'Metric4', data: generateData(12, { min: 0, max: 90 }) },
            { name: 'Metric5', data: generateData(12, { min: 0, max: 90 }) },
            { name: 'Metric6', data: generateData(12, { min: 0, max: 90 }) },
            { name: 'Metric7', data: generateData(12, { min: 0, max: 90 }) },
            { name: 'Metric8', data: generateData(12, { min: 0, max: 90 }) },
            { name: 'Metric9', data: generateData(12, { min: 0, max: 90 }) },
        ],
        chart: {
            type: 'heatmap',
            fontFamily: 'Poppins, sans-serif',
            toolbar: {
                show: false, 
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#008FFB"],
        xaxis: {
            categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May',
                'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
                'Nov', 'Dec'
            ]
        },
    };

    return (
        <div style={{ height:"85%", width:"100%" }}>
            <Chart options={options} series={options.series} type="heatmap"/>
        </div>
    );
};

export default HeatMap;