export const projectStatisticsChartOption = () => {
    const chartOptions = {
        chart: {
            height: 365,
            type: "area",
            stacked: !1,
            toolbar: {
                show: !1
            }
        },
        xaxis: {
            categories: ["Satarday", "Sunday", "Monday", "Thusday", "Wensday", "Thusday", "Friday"],
            axisBorder: {
                show: !1
            },
            axisTicks: {
                show: !1
            },
            labels: {
                style: {
                    fontSize: "11px",
                    colors: "#64748b"
                }
            }
        },
        yaxis: {
            min: 10,
            labels: {
                formatter: function (e) {
                    return +e + "K"
                },
                offsetX: -15,
                offsetY: 0,
                style: {
                    fontSize: "11px",
                    colors: "#64748b"
                }
            }
        },
        stroke: {
            curve: "smooth",
            width: [1, 1, 1, 1],
            dashArray: [3, 3, 3, 3],
            lineCap: "round"
        },
        grid: {
            padding: {
                left: 10,
                right: 0
            },
            strokeDashArray: 3,
            borderColor: "#ebebf3",
            row: {
                colors: ["#ebebf3", "transparent"],
                opacity: .02
            }
        },
        legend: {
            show: !1
        },
        colors: ["#3454d1", "#25b865", "#e49e3d"],
        dataLabels: {
            enabled: !1
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: .4,
                opacityTo: .3,
                stops: [0, 100]
            }
        },
        series: [
            {
                name: "Tasks Completed",
                data: [20, 45, 25, 60, 30, 65, 35],
                type: "area"
            },
            {
                name: "Project Complated",
                data: [30, 25, 40, 35, 50, 40, 60],
                type: "area"
            },
            {
                name: "Upcomming Project",
                data: [45, 20, 50, 25, 65, 30, 75],
                type: "area"
            }
        ],
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K"
                }
            },
            style: {
                fontSize: "11px",
                fontFamily: "Inter"
            }
        }
    }
    return chartOptions
}

