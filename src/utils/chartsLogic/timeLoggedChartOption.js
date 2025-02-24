export const timeLoggedChartOption = () => {
    const chartOptions = {
        chart: {
            height: 350,
            type: "area",
            stacked: !1,
            toolbar: {
                show: !1
            }
        },
        xaxis: {
            categories: ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30"],
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
            min: 0,
            max: 100,
            tickAmount: 5,
            labels: {
                formatter: function (e) {
                    return +e + " Mins"
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
            width: 2,
            curve: "smooth",
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
        colors: ["#3454d1"],
        dataLabels: {
            enabled: !1
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: .4,
                opacityTo: .8,
                stops: [0, 100]
            }
        },
        series: [{
            name: "Time Logged",
            data: [20, 45, 25, 60, 30, 65, 35, 75, 60, 80, 65, 95],
            type: "area"
        }
        ], tooltip: {
            y: {
                formatter: function (e) {
                    return +e + " Mins"
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