import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  // Reference to the canvas element for the chart
  const chartRef = useRef(null);
  // Reference to the Chart.js instance
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Check if the chartRef has been initialized
    if (chartRef.current) {
      // Check if a chart instance already exists
      if (chartInstanceRef.current) {
        // Update chart data if the instance exists
        chartInstanceRef.current.data.labels = data.map((entry) => entry.year);
        chartInstanceRef.current.data.datasets[0].data = data.map(
          (entry) => entry.totalDeposits
        );
        chartInstanceRef.current.data.datasets[1].data = data.map(
          (entry) => entry.rothIRA
        );
        chartInstanceRef.current.data.datasets[2].data = data.map(
          (entry) => entry.taxableAccount
        );
        chartInstanceRef.current.update(); // Update the chart
      } else {
        // Create new chart instance if it doesn't exist
        const newChartInstance = new Chart(chartRef.current, {
          type: "line",
          data: {
            labels: data.map((entry) => entry.year),
            datasets: [
              {
                label: "Total Deposits",
                data: data.map((entry) => entry.totalDeposits),
                borderColor: "rgba(75, 120, 120, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
              },
              {
                label: "Roth IRA",
                data: data.map((entry) => entry.rothIRA),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
              },
              {
                label: "Taxable Account",
                data: data.map((entry) => entry.taxableAccount),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Year",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Amount ($)",
                },
              },
            },
          },
        });
        chartInstanceRef.current = newChartInstance; // Set the chart instance reference
      }
    }
  }, [data]); // Update the effect when the data prop changes

  // CSS style to set the height of the canvas dynamically
  const canvasStyle = {
    height: "800px", // 80% of the viewport height
  };

  return (
    <div>
      {/* Canvas element for the chart with dynamic height */}
      <canvas ref={chartRef} style={canvasStyle} />
    </div>
  );
};

export default ChartComponent;
