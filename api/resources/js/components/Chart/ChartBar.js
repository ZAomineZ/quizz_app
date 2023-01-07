export function generateOptions(series, categories) {
  return {
    series,
    chart: {
      type: "bar",
      height: 280
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        endingShape: "rounded"
      }
    },
    legend: {
      position: "top"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories
    },
    colors: ["var(--primary-bg-color)", "rgb(228, 231, 237)"],
    yaxis: {
      title: {
        text: "Count Quizzes"
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " quizzes";
        }
      }
    }
  };
}
