import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const GradientAreaChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#667eea"); // blue
    gradient.addColorStop(1, "#764ba2"); // purple

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 60],
            backgroundColor: gradient,
            borderColor: "transparent",
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default GradientAreaChart;
