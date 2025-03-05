export const socialRadarChartOption = () => {
    const chartOptions = {
        series: [
            { name: "Facebook", data: [80, 50, 30, 40, 100, 20] },
            { name: "Twitter", data: [20, 30, 40, 80, 20, 80] },
            { name: "Youtube", data: [44, 76, 78, 13, 43, 10] },
        ],
        chart: {
            height: 376,
            type: "radar",
            toolbar: {
                show: false
            }
        },
        colors: ["#3454D1", "#41B2C4", "#EA4D4D"],
        xaxis: {
            categories: ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri"]
        },
        yaxis: {
            show: false,
            stepSize: 20
        },
        stroke: {
            show: true,
            width: 0.5
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K";
                },
            },
            style: {
                colors: "#64748b",
                fontFamily: "Inter"
            },
        },
        markers: {
            size: 3,
            hover: {
                size: 5
            }
        },
        legend: {
            show: true,
            height: 65,
            offsetY: 0,
            labels: {
                colors: "#64748b",
                fontFamily: "Inter"
            }
        },
    };
    return chartOptions
}